import os
import sys
import json
import shutil
import secrets
import threading
import subprocess
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer

import webview

from downloader import Manager, LT_OK

APP_NAME = "DownX"
BRIDGE_PORT = 47823
FROZEN = getattr(sys, "frozen", False)
APP_DIR = os.path.dirname(sys.executable) if FROZEN else os.path.dirname(os.path.abspath(__file__))
RES_DIR = getattr(sys, "_MEIPASS", APP_DIR)
UI_DIR = os.path.join(RES_DIR, "ui")

SETTINGS_DIR = os.path.join(os.path.expanduser("~"), ".downx")
SETTINGS_FILE = os.path.join(SETTINGS_DIR, "settings.json")
DEFAULTS = {
    "lang": "en",
    "save_dir": os.path.join(os.path.expanduser("~"), "Downloads"),
    "max_concurrent": 3,
    "default_quality": "best",
    "bridge_token": "",
    "speed_kbps": 0,
}


def save_settings(s):
    os.makedirs(SETTINGS_DIR, exist_ok=True)
    with open(SETTINGS_FILE, "w", encoding="utf-8") as f:
        json.dump(s, f, ensure_ascii=False, indent=2)


def load_settings():
    s = dict(DEFAULTS)
    try:
        with open(SETTINGS_FILE, "r", encoding="utf-8") as f:
            s.update(json.load(f))
    except (OSError, ValueError):
        pass
    if not os.path.isdir(s["save_dir"]):
        s["save_dir"] = DEFAULTS["save_dir"]
    os.makedirs(s["save_dir"], exist_ok=True)
    s["max_concurrent"] = min(max(int(s["max_concurrent"]), 1), 5)
    if not s["bridge_token"]:
        s["bridge_token"] = secrets.token_urlsafe(24)
    save_settings(s)
    return s


def dialog_type(kind):
    fd = getattr(webview, "FileDialog", None)
    if fd is not None:
        return fd.OPEN if kind == "open" else fd.FOLDER
    return webview.OPEN_DIALOG if kind == "open" else webview.FOLDER_DIALOG


# ----- browser bridge (used by the browser extension) -----
class BridgeHandler(BaseHTTPRequestHandler):
    def _cors(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Headers", "Content-Type, X-DownX-Token")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")

    def _reply(self, code, payload):
        body = json.dumps(payload).encode("utf-8")
        self.send_response(code)
        self._cors()
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def do_OPTIONS(self):
        self.send_response(204)
        self._cors()
        self.end_headers()

    def do_GET(self):
        if self.path == "/ping":
            self._reply(200, {"app": APP_NAME})
        else:
            self._reply(404, {"error": "not found"})

    def do_POST(self):
        if self.path != "/add":
            self._reply(404, {"error": "not found"})
            return
        if self.headers.get("X-DownX-Token", "") != self.server.token:
            self._reply(403, {"error": "bad token"})
            return
        try:
            length = int(self.headers.get("Content-Length", "0"))
            data = json.loads(self.rfile.read(length) or b"{}")
        except (ValueError, json.JSONDecodeError):
            self._reply(400, {"error": "bad json"})
            return
        url = str(data.get("url", "")).strip()
        if not url.startswith(("http://", "https://")):
            self._reply(400, {"error": "invalid url"})
            return
        ok = self.server.on_url(url)
        self._reply(200 if ok else 400, {"ok": ok})

    def log_message(self, format, *args):
        pass


def start_bridge(token, port, on_url):
    try:
        server = ThreadingHTTPServer(("127.0.0.1", port), BridgeHandler)
    except OSError:
        return None
    server.token = token
    server.on_url = on_url
    threading.Thread(target=server.serve_forever, daemon=True).start()
    return server


# ----- API exposed to the UI (window.pywebview.api) -----
class Api:
    def __init__(self):
        self.window = None
        self.bridge = None
        self.settings = load_settings()
        self.manager = Manager(APP_DIR, self.settings["max_concurrent"])
        self.manager.speed_kbps = self.settings.get("speed_kbps", 0)

    def get_settings(self):
        return dict(self.settings, bridge_port=BRIDGE_PORT, lt_ok=LT_OK)

    def save_settings(self, data):
        for key in ("lang", "default_quality"):
            if key in data:
                self.settings[key] = data[key]
        if "max_concurrent" in data:
            self.settings["max_concurrent"] = min(max(int(data["max_concurrent"]), 1), 5)
            self.manager.set_concurrency(self.settings["max_concurrent"])
        save_settings(self.settings)
        return self.get_settings()

    def set_speed_limit(self, kbps):
        self.settings["speed_kbps"] = max(0, int(kbps))
        self.manager.set_speed_limit(self.settings["speed_kbps"])
        save_settings(self.settings)
        return self.get_settings()

    def pick_folder(self):
        if self.window is None:
            return None
        paths = self.window.create_file_dialog(dialog_type("folder"), directory=self.settings["save_dir"])
        if not paths:
            return None
        self.settings["save_dir"] = paths[0]
        save_settings(self.settings)
        return paths[0]

    def open_torrent(self):
        if self.window is None:
            return {"ok": False, "error": "cancelled"}
        paths = self.window.create_file_dialog(dialog_type("open"),
                                               file_types=("Torrent files (*.torrent)",))
        if not paths:
            return {"ok": False, "error": "cancelled"}
        return self._add(paths[0], False, None)

    def add_link(self, url, playlist, quality):
        url = (url or "").strip()
        if not url.startswith(("http://", "https://", "magnet:")):
            return {"ok": False, "error": "invalid"}
        return self._add(url, bool(playlist), quality)

    def _add(self, url, playlist, quality):
        try:
            self.manager.add(url, self.settings["save_dir"],
                             quality or self.settings["default_quality"], playlist)
            return {"ok": True}
        except ValueError as e:
            return {"ok": False, "error": str(e)}

    def bridge_add(self, url):
        return self._add(url, False, None)["ok"]

    def snapshot(self):
        data = self.manager.snapshot()
        try:
            usage = shutil.disk_usage(self.settings["save_dir"])
            data["free"], data["total_disk"] = usage.free, usage.total
        except OSError:
            data["free"] = data["total_disk"] = 0
        data["bridge_ok"] = self.bridge is not None
        return data

    def pause(self, item_id):
        self.manager.pause(item_id)

    def resume(self, item_id):
        self.manager.resume(item_id)

    def remove(self, item_id):
        self.manager.remove(item_id)

    def pause_all(self):
        self.manager.pause_all()

    def resume_all(self):
        self.manager.resume_all()

    def stop_all(self):
        self.manager.stop_all()

    def clear_finished(self):
        self.manager.clear_finished()

    def open_folder(self, path):
        if not path or not os.path.isdir(path):
            return
        if sys.platform.startswith("win"):
            os.startfile(path)
        elif sys.platform == "darwin":
            subprocess.Popen(["open", path])
        else:
            subprocess.Popen(["xdg-open", path])


def main():
    api = Api()
    api.bridge = start_bridge(api.settings["bridge_token"], BRIDGE_PORT, api.bridge_add)
    window = webview.create_window(
        APP_NAME,
        url=os.path.join(UI_DIR, "index.html"),
        js_api=api,
        width=1280,
        height=800,
        min_size=(1040, 680),
        background_color="#12173A",
    )
    api.window = window
    webview.start(debug=True)  # shows the inspector; set to False once it works


if __name__ == "__main__":
    main()
