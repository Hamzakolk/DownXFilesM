import os
import sys
import time
import uuid
import shutil
import threading

import yt_dlp

try:
    import libtorrent as lt
    LT_OK = True
except Exception:
    lt = None
    LT_OK = False

ACTIVE = ("queued", "downloading", "processing")
FINISHED = ("done", "failed", "cancelled")


class Stop(Exception):
    pass


class Pause(Exception):
    pass


def find_ffmpeg_dir(base_dir):
    """None if ffmpeg is on PATH, a folder if bundled, or 'missing'."""
    if shutil.which("ffmpeg"):
        return None
    name = "ffmpeg.exe" if os.name == "nt" else "ffmpeg"
    for d in (base_dir, getattr(sys, "_MEIPASS", ""), os.path.dirname(sys.executable)):
        if d and os.path.isfile(os.path.join(d, name)):
            return d
    return "missing"


class Item:
    def __init__(self, url, folder, kind):
        self.id = uuid.uuid4().hex[:10]
        self.url = url
        self.folder = folder
        self.kind = kind  # "video" or "torrent"
        self.opts = None
        self.handle = None
        self.title = url
        self.status = "queued"
        self.progress = 0.0
        self.speed = 0.0
        self.upload = 0.0
        self.downloaded = 0
        self.total = 0
        self.peers = 0
        self.seeds = 0
        self.cancelled = False
        self.paused = False
        self.running = False
        self.started = None
        self.ydl = None
        self.session = None

    def to_dict(self):
        elapsed = None
        if self.started and self.status in ("downloading", "processing", "paused"):
            elapsed = time.time() - self.started
        return {
            "id": self.id, "url": self.url, "kind": self.kind, "folder": self.folder,
            "title": self.title, "status": self.status, "progress": self.progress,
            "speed": self.speed, "upload": self.upload, "downloaded": self.downloaded,
            "total": self.total, "peers": self.peers, "seeds": self.seeds,
            "paused": self.paused, "elapsed": elapsed,
        }


class Manager:
    def __init__(self, base_dir, max_concurrent):
        self.lock = threading.RLock()
        self.items = []
        self.slots = threading.BoundedSemaphore(max_concurrent)
        self.ffmpeg_dir = find_ffmpeg_dir(base_dir)
        self.speed_kbps = 0

    def set_speed_limit(self, kbps):
        with self.lock:
            self.speed_kbps = kbps
            items = list(self.items)
        for it in items:
            if it.ydl is not None:
                it.ydl.params["ratelimit"] = kbps * 1024 or None
            if it.session is not None and it.handle is not None:
                try:
                    it.session.apply_settings({"download_rate_limit": kbps * 1024})
                except Exception:
                    pass

    def set_concurrency(self, n):
        with self.lock:
            self.slots = threading.BoundedSemaphore(n)

    def get(self, item_id):
        with self.lock:
            return next((i for i in self.items if i.id == item_id), None)

    # ----- adding -----
    def add(self, url, folder, quality, playlist):
        is_magnet = url.startswith("magnet:")
        is_torrent_file = url.lower().endswith(".torrent")
        if is_magnet or is_torrent_file:
            if not LT_OK:
                raise ValueError("no_lt")
            item = Item(url, folder, "torrent")
            item.title = url if is_magnet else os.path.basename(url)
            target = self._run_torrent
        else:
            if not url.startswith(("http://", "https://")):
                raise ValueError("invalid")
            item = Item(url, folder, "video")
            item.opts = self._build_opts(folder, quality, playlist,
                                         lambda d, it=item: self._hook(it, d))
            target = self._run_video
        with self.lock:
            self.items.append(item)
        threading.Thread(target=target, args=(item,), daemon=True).start()
        return item.id

    def _build_opts(self, folder, quality, playlist, hook):
        opts = {
            "outtmpl": os.path.join(folder, "%(title).150B.%(ext)s"),
            "noplaylist": not playlist,
            "progress_hooks": [hook],
            "quiet": True,
            "no_warnings": True,
            "merge_output_format": "mp4",
        }
        if self.ffmpeg_dir not in (None, "missing"):
            opts["ffmpeg_location"] = self.ffmpeg_dir
        if self.speed_kbps:
            opts["ratelimit"] = self.speed_kbps * 1024
        if quality == "audio":
            opts["format"] = "bestaudio/best"
            opts["postprocessors"] = [{"key": "FFmpegExtractAudio",
                                       "preferredcodec": "mp3", "preferredquality": "192"}]
        elif quality in (None, "", "best"):
            opts["format"] = "bv*+ba/b"
        else:
            h = int(quality)
            opts["format"] = f"bv*[height<={h}]+ba/b[height<={h}]"
        return opts

    # ----- workers -----
    def _hook(self, item, d):
        if item.cancelled:
            raise Stop()
        if item.paused:
            raise Pause()
        info = d.get("info_dict") or {}
        if info.get("title"):
            item.title = info["title"]
        if d.get("status") == "downloading":
            item.downloaded = d.get("downloaded_bytes", 0) or 0
            total = d.get("total_bytes") or d.get("total_bytes_estimate") or 0
            if total:
                item.total = total
                item.progress = min(item.downloaded / total, 0.99)
            item.speed = d.get("speed") or 0
            item.status = "downloading"
        elif d.get("status") == "finished":
            item.status = "processing"

    def _run_video(self, item):
        item.running = True
        try:
            with self.lock:
                slots = self.slots
            with slots:
                if item.cancelled:
                    item.status = "cancelled"
                    return
                if item.paused:
                    item.status = "paused"
                    return
                item.status = "downloading"
                if item.started is None:
                    item.started = time.time()
                attempts = 0
                while True:
                    try:
                        with yt_dlp.YoutubeDL(item.opts) as ydl:
                            item.ydl = ydl
                            ydl.download([item.url])
                        if not item.cancelled:
                            item.status = "done"
                            item.progress = 1.0
                        break
                    except Pause:
                        item.status = "paused"
                        break
                    except Stop:
                        break
                    except Exception:
                        if item.cancelled or item.paused:
                            break
                        attempts += 1
                        if attempts > 2:
                            item.status = "failed"
                            break
                        item.status = "downloading"
                        time.sleep(5)
                    finally:
                        item.ydl = None
                if item.cancelled:
                    item.status = "cancelled"
                elif item.paused and item.status != "done":
                    item.status = "paused"
        finally:
            item.running = False

    def _run_torrent(self, item):
        item.running = True
        try:
            with self.lock:
                slots = self.slots
            with slots:
                if item.cancelled:
                    item.status = "cancelled"
                    return
                ses = lt.session()
                item.session = ses
                try:
                    ses.listen_on(6881, 6891)
                except Exception:
                    pass
                if self.speed_kbps:
                    try:
                        ses.apply_settings({"download_rate_limit": self.speed_kbps * 1024})
                    except Exception:
                        pass
                if item.url.startswith("magnet:"):
                    params = lt.parse_magnet_uri(item.url)
                else:
                    params = lt.add_torrent_params()
                    params.ti = lt.torrent_info(item.url)
                params.save_path = item.folder
                item.handle = ses.add_torrent(params)
                item.started = time.time()
                last_paused = False
                while not item.cancelled:
                    if item.paused != last_paused:
                        if item.paused:
                            item.handle.pause()
                        else:
                            item.handle.resume()
                        last_paused = item.paused
                    s = item.handle.status()
                    name = item.handle.name()
                    if name:
                        item.title = name
                    item.progress = s.progress
                    item.speed = s.download_rate
                    item.upload = s.upload_rate
                    item.downloaded = s.total_wanted_done
                    item.total = s.total_wanted
                    item.peers = s.num_peers
                    item.seeds = s.num_seeds
                    if item.paused:
                        item.status = "paused"
                    elif s.is_seeding or s.is_finished:
                        item.status = "done"
                        item.progress = 1.0
                        break
                    else:
                        item.status = "downloading"
                    time.sleep(1)
                if item.cancelled:
                    item.status = "cancelled"
                    ses.remove_torrent(item.handle)
        except Exception:
            if item.cancelled:
                item.status = "cancelled"
            else:
                item.status = "failed"
        finally:
            item.running = False

    # ----- controls -----
    def pause(self, item_id):
        item = self.get(item_id)
        if item and item.status not in FINISHED and not item.paused:
            item.paused = True

    def resume(self, item_id):
        item = self.get(item_id)
        if not item or not item.paused:
            return
        item.paused = False
        if not item.running and item.status not in FINISHED:
            item.status = "queued"
            target = self._run_torrent if item.kind == "torrent" else self._run_video
            threading.Thread(target=target, args=(item,), daemon=True).start()

    def cancel(self, item_id):
        item = self.get(item_id)
        if not item:
            return
        item.cancelled = True
        item.paused = False
        if item.status == "queued":
            item.status = "cancelled"

    def remove(self, item_id):
        item = self.get(item_id)
        if not item:
            return
        if item.status in ACTIVE or item.status == "paused":
            self.cancel(item_id)
            return
        with self.lock:
            if item in self.items:
                self.items.remove(item)

    def pause_all(self):
        with self.lock:
            for it in self.items:
                if it.status not in FINISHED and not it.paused:
                    it.paused = True

    def resume_all(self):
        with self.lock:
            ids = [it.id for it in self.items if it.paused]
        for item_id in ids:
            self.resume(item_id)

    def stop_all(self):
        with self.lock:
            ids = [it.id for it in self.items if it.status in ACTIVE or it.status == "paused"]
        for item_id in ids:
            self.cancel(item_id)

    def clear_finished(self):
        with self.lock:
            self.items = [it for it in self.items if it.status not in FINISHED]

    def snapshot(self):
        with self.lock:
            items = [it.to_dict() for it in self.items]
        down = sum(i["speed"] for i in items if i["status"] == "downloading")
        up = sum(i["upload"] for i in items if i["kind"] == "torrent" and i["status"] not in FINISHED)
        return {
            "items": items,
            "down": down,
            "up": up,
            "ffmpeg_missing": self.ffmpeg_dir == "missing",
            "lt_ok": LT_OK,
        }
