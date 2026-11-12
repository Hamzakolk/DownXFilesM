const I18N = {
  en: {
    tagline: "Download Manager", ultra: "Ultra Fast", ultra_sub: "Multi-Source Download Manager",
    nav_all: "Downloads", nav_torrent: "Torrent", nav_completed: "Completed", nav_queue: "Queue",
    nav_settings: "Settings", nav_tools: "Tools", nav_about: "About",
    search: "Paste a link or magnet link...", add: "Add", playlist: "Playlist",
    tab_all: "All Downloads", tab_torrent: "Torrent",
    col_name: "File Name", col_progress: "Progress", col_speed: "Speed", col_size: "Size",
    col_time: "Time", col_status: "Status",
    torrent_title: "Torrent Download", torrent_sub: "Download any .torrent file or magnet link",
    open_torrent: "Open .torrent", stat_down: "Download", stat_up: "Upload", stat_seeds: "Seeds", stat_peers: "Peers",
    settings_title: "Settings", folder: "Save to", change: "Change", copy: "Copy",
    max_concurrent: "Simultaneous downloads", default_quality: "Default quality",
    lang_label: "Language", bridge: "Browser extension token",
    bridge_hint: "Paste this token in the browser extension options to connect.",
    settings_note: "Simultaneous downloads apply to new downloads.", save: "Save", close: "Close",
    about_text: "DownX, a download manager.\nVideos use yt-dlp, torrents use libtorrent, and ffmpeg handles merging and MP3.",
    free: "Free Space", speed_limit: "Speed limit", unlimited: "No limit", done_label: "Done",
    st_queued: "Queued", st_downloading: "Downloading", st_processing: "Processing", st_paused: "Paused",
    st_done: "Completed", st_seeding: "Seeding", st_failed: "Failed", st_cancelled: "Cancelled",
    empty: "No downloads here yet.", pause_t: "Pause", resume_t: "Resume", invalid: "Paste a valid link starting with http://, https:// or magnet:",
    no_lt: "Torrent support needs libtorrent (pip install libtorrent).",
    no_ffmpeg: "ffmpeg not found. Merging and MP3 need it.",
    bridge_error: "Browser bridge could not start. The port may be in use.",
    lang_btn: "العربية", q: { best: "Best available", "1080": "1080p", "720": "720p", "480": "480p", audio: "Audio only (MP3)" },
  },
  ar: {
    tagline: "مدير التحميل", ultra: "سرعة فائقة", ultra_sub: "مدير تحميل متعدد المصادر",
    nav_all: "التحميلات", nav_torrent: "تورنت", nav_completed: "المكتملة", nav_queue: "قائمة الانتظار",
    nav_settings: "الإعدادات", nav_tools: "أدوات", nav_about: "حول",
    search: "الصق رابطًا أو ماجنت...", add: "إضافة", playlist: "قائمة تشغيل",
    tab_all: "كل التحميلات", tab_torrent: "تورنت",
    col_name: "اسم الملف", col_progress: "التقدم", col_speed: "السرعة", col_size: "الحجم",
    col_time: "الوقت", col_status: "الحالة",
    torrent_title: "تحميل تورنت", torrent_sub: "حمّل أي ملف .torrent أو رابط ماجنت",
    open_torrent: "فتح ملف .torrent", stat_down: "تحميل", stat_up: "رفع", stat_seeds: "بذور", stat_peers: "أقران",
    settings_title: "الإعدادات", folder: "الحفظ في", change: "تغيير", copy: "نسخ",
    max_concurrent: "عدد التحميلات المتزامنة", default_quality: "الجودة الافتراضية",
    lang_label: "اللغة", bridge: "توكن إضافة المتصفح",
    bridge_hint: "الصق هذا التوكن في إعدادات الإضافة في المتصفح للربط.",
    settings_note: "التحميلات المتزامنة تطبق على التحميلات الجديدة.", save: "حفظ", close: "إغلاق",
    about_text: "DownX، مدير تحميل.\nالفيديوهات بـ yt-dlp، والتورنت بـ libtorrent، وffmpeg للدمج وتحويل MP3.",
    free: "المساحة الفارغة", speed_limit: "حد السرعة", unlimited: "بدون حد", done_label: "تم",
    st_queued: "في الانتظار", st_downloading: "جاري التحميل", st_processing: "جاري المعالجة", st_paused: "متوقف مؤقتًا",
    st_done: "اكتمل", st_seeding: "جاري المشاركة", st_failed: "فشل", st_cancelled: "أُلغي",
    empty: "لا توجد تحميلات هنا بعد.", pause_t: "إيقاف مؤقت", resume_t: "استئناف", invalid: "الصق رابطًا صحيحًا يبدأ بـ http:// أو https:// أو magnet:",
    no_lt: "دعم التورنت يحتاج libtorrent (pip install libtorrent).",
    no_ffmpeg: "ffmpeg غير موجود. الدمج وتحويل MP3 يحتاجانه.",
    bridge_error: "تعذّر تشغيل ربط المتصفح. ربما المنفذ مستخدم.",
    lang_btn: "English", q: { best: "أفضل جودة متاحة", "1080": "1080p", "720": "720p", "480": "480p", audio: "صوت فقط (MP3)" },
  },
};

const ICONS = {
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3.5 3 14.5 0 18M12 3c-3 3.5-3 14.5 0 18"/>',
  link: '<path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1"/><path d="M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  play: '<path d="M7 5l12 7-12 7z"/>',
  pause: '<path d="M8 5v14M16 5v14"/>',
  stop: '<rect x="6" y="6" width="12" height="12" rx="1.5"/>',
  trash: '<path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/>',
  folder: '<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
  x: '<path d="M6 6l12 12M18 6L6 18"/>',
  down: '<path d="M12 4v13M6 12l6 6 6-6"/>',
  up: '<path d="M12 20V7M6 12l6-6 6 6"/>',
  disk: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 13h18"/>',
  download: '<path d="M12 4v11M7 10l5 5 5-5M5 20h14"/>',
  torrent: '<path d="M4 4v8a8 8 0 0 0 16 0V4h-4v8a4 4 0 0 1-8 0V4z"/>',
  check: '<path d="M5 12l5 5 9-10"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  grid: '<rect x="4" y="4" width="7" height="7" rx="1.5"/><rect x="13" y="4" width="7" height="7" rx="1.5"/><rect x="4" y="13" width="7" height="7" rx="1.5"/><rect x="13" y="13" width="7" height="7" rx="1.5"/>',
  wrench: '<path d="M14 6a4 4 0 0 0 5 5l-8 8a2 2 0 0 1-3-3l8-8a4 4 0 0 0-2-2z"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5v.5"/>',
  gear: '<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1L7 17M17 7l2.1-2.1"/>',
  bolt: '<path d="M13 2L4 14h7l-1 8 9-12h-7z"/>',
  heart: '<path d="M12 21s-7-4.5-9.5-9A5 5 0 0 1 12 6a5 5 0 0 1 9.5 6c-2.5 4.5-9.5 9-9.5 9z"/>',
  music: '<path d="M9 18V5l11-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="17" cy="16" r="3"/>',
  image: '<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="2"/><path d="M21 16l-5-5-8 8"/>',
  archive: '<path d="M4 7l8-4 8 4v10l-8 4-8-4z"/><path d="M12 11v6M10 13h4"/>',
  doc: '<path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6M8 13h8M8 17h6"/>',
  slides: '<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/>',
  code: '<path d="M8 8l-4 4 4 4M16 8l4 4-4 4M14 5l-4 14"/>',
  box: '<path d="M21 8l-9-5-9 5v8l9 5 9-5z"/><path d="M3 8l9 5 9-5M12 13v8"/>',
  file: '<path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/>',
  search: '<circle cx="11" cy="11" r="6"/><path d="M20 20l-4.5-4.5"/>',
};

function icon(name) {
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${ICONS[name] || ""}</svg>`;
}

// File type categories: each extension maps to a category with its own color and glyph.
const CATS = {
  video:   { color: "#1E88FF", glyph: "play",    exts: "mp4 mkv avi mov webm flv wmv m4v mpg mpeg 3gp ts" },
  audio:   { color: "#F5A524", glyph: "music",   exts: "mp3 wav flac aac ogg m4a opus wma aiff" },
  image:   { color: "#2ECC71", glyph: "image",   exts: "jpg jpeg png gif webp svg bmp tiff heic psd" },
  archive: { color: "#F97316", glyph: "archive", exts: "zip rar 7z tar gz bz2 xz iso" },
  doc:     { color: "#38BDF8", glyph: "doc",     exts: "pdf doc docx txt rtf odt epub md" },
  sheet:   { color: "#22C55E", glyph: "grid",    exts: "xls xlsx csv ods tsv" },
  slides:  { color: "#FB923C", glyph: "slides",  exts: "ppt pptx odp key" },
  code:    { color: "#A78BFA", glyph: "code",    exts: "py js ts html css json xml php java cpp c go rs sh" },
  app:     { color: "#64748B", glyph: "box",     exts: "exe msi apk dmg pkg deb appimage bat" },
  torrent: { color: "#8B5CF6", glyph: "torrent", exts: "torrent" },
  other:   { color: "#64748B", glyph: "file",    exts: "" },
};

function fileCategory(ext, kind) {
  if (kind === "torrent") return "torrent";
  for (const [name, cat] of Object.entries(CATS)) {
    if (cat.exts.split(" ").includes(ext)) return name;
  }
  return kind === "video" ? "video" : "other";
}

function fileTile(it) {
  const m = (it.title || "").match(/\.([a-z0-9]{1,5})$/i);
  const ext = m ? m[1].toLowerCase() : (it.kind === "torrent" ? "torrent" : "video");
  const cat = CATS[fileCategory(ext, it.kind)];
  const label = (it.kind === "torrent" ? "TOR" : ext.toUpperCase()).slice(0, 4);
  return `<div class="ftile" style="--c:${cat.color}" title="${esc(ext)}">${icon(cat.glyph)}<span>${esc(label)}</span></div>`;
}

const ACTIVE = ["queued", "downloading", "processing"];
const FINISHED = ["done", "failed", "cancelled"];
const STATUS = {
  queued: ["st_queued", "#4A5270"], downloading: ["st_downloading", "#1E88FF"],
  processing: ["st_processing", "#8B5CF6"], paused: ["st_paused", "#F5A524"],
  done: ["st_done", "#2ECC71"], failed: ["st_failed", "#E5484D"], cancelled: ["st_cancelled", "#4A5270"],
};
const SPEEDS = [0, 512, 1024, 2048, 5120, 10240];
const QUALITIES = ["best", "1080", "720", "480", "audio"];

let lang = "en";
let view = "all";
let settings = { lang: "en", default_quality: "best", speed_kbps: 0, max_concurrent: 3, save_dir: "", bridge_token: "", lt_ok: true };
let snap = { items: [], down: 0, up: 0, free: 0, total_disk: 0, ffmpeg_missing: false, lt_ok: true };
let torrentDown = new Array(60).fill(0);
let torrentUp = new Array(60).fill(0);
let msgUntil = 0;
let busy = false;

const $ = (id) => document.getElementById(id);
const t = (k) => I18N[lang][k] ?? I18N.en[k] ?? k;
const api = () => (window.pywebview ? window.pywebview.api : null);

function esc(s) {
  return String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}
function fmtSpeed(b) {
  if (!b) return "0 KB/s";
  return b >= 1048576 ? (b / 1048576).toFixed(1) + " MB/s" : Math.round(b / 1024) + " KB/s";
}
function fmtSize(n) {
  if (!n) return "0 B";
  const u = ["B", "KB", "MB", "GB", "TB"];
  let i = 0;
  while (n >= 1024 && i < u.length - 1) { n /= 1024; i++; }
  return n.toFixed(i ? 1 : 0) + " " + u[i];
}
function fmtTime(s) {
  if (s == null) return "-";
  s = Math.floor(s);
  const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), sec = s % 60;
  const p = (x) => String(x).padStart(2, "0");
  return h ? `${p(h)}:${p(m)}:${p(sec)}` : `${p(m)}:${p(sec)}`;
}
function speedLabel(kbps) {
  if (!kbps) return t("unlimited");
  return kbps >= 1024 ? `${kbps / 1024} MB/s` : `${kbps} KB/s`;
}

function showMsg(text, color) {
  $("msg").textContent = text || "";
  $("msg").style.color = color || "";
  msgUntil = text ? Date.now() + 5000 : 0;
}

function applyStatic() {
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  document.querySelectorAll("[data-i18n]").forEach((el) => (el.textContent = t(el.dataset.i18n)));
  document.querySelectorAll("[data-i18n-ph]").forEach((el) => (el.placeholder = t(el.dataset.i18nPh)));
  document.querySelectorAll("[data-icon]").forEach((el) => (el.innerHTML = icon(el.dataset.icon)));
  fillSelect($("quality"), QUALITIES.map((k) => [k, t("q")?.[k] ?? I18N[lang].q[k]]), $("quality").value || settings?.default_quality || "best");
  fillSelect($("speed"), SPEEDS.map((v) => [String(v), speedLabel(v)]), String(settings?.speed_kbps ?? 0));
  fillSelect($("set-quality"), QUALITIES.map((k) => [k, I18N[lang].q[k]]), settings?.default_quality || "best");
  $("set-lang").textContent = I18N[lang].lang_btn;
  $("btn-tools").querySelector("span:last-child").textContent = t("nav_tools");
  $("tp-pause").innerHTML = icon("pause");
}

function fillSelect(sel, pairs, current) {
  sel.innerHTML = pairs.map(([v, label]) => `<option value="${esc(v)}">${esc(label)}</option>`).join("");
  sel.value = current;
}

function setView(v) {
  view = v;
  document.querySelectorAll("[data-view]").forEach((el) => el.classList.toggle("active", el.dataset.view === v));
  $("tpanel").classList.toggle("hidden", v !== "torrent");
  renderRows();
}

function visible(it) {
  if (view === "all") return it.kind === "video";
  if (view === "torrent") return it.kind === "torrent";
  if (view === "completed") return it.status === "done";
  if (view === "queue") return it.status === "queued";
  return true;
}

function statusInfo(it) {
  if (it.kind === "torrent" && it.status === "done") return ["st_seeding", "#2ECC71"];
  return STATUS[it.status] || STATUS.queued;
}

function rowHTML(it) {
  const [sKey, color] = statusInfo(it);
  const barColor = it.kind === "torrent" ? "#2ECC71" : it.status === "processing" ? "#8B5CF6" : it.status === "paused" ? "#F5A524" : "#1E88FF";
  const pct = Math.round((it.progress || 0) * 100);
  const finished = FINISHED.includes(it.status);
  const pauseBtn = finished ? "" :
    `<button class="ibtn" data-act="${it.paused ? "resume" : "pause"}" data-id="${it.id}" title="${it.paused ? t("resume_t") : t("pause_t")}">${icon(it.paused ? "play" : "pause")}</button>`;
  const openBtn = it.status === "done"
    ? `<button class="ibtn" data-act="open" data-id="${it.id}">${icon("folder")}</button>`
    : `<button class="ibtn" disabled>${icon("folder")}</button>`;
  const rmBtn = `<button class="ibtn danger" data-act="remove" data-id="${it.id}">${icon("x")}</button>`;
  const size = it.total ? `${fmtSize(it.downloaded)} / ${fmtSize(it.total)}` : "-";
  const speed = it.status === "downloading" ? fmtSpeed(it.speed) : "-";
  const time = it.status === "done" ? t("done_label") : fmtTime(it.elapsed);
  return `<div class="row">
    <div class="c-name">${fileTile(it)}<span class="name" title="${esc(it.url)}">${esc(it.title)}</span></div>
    <div class="c-prog"><div class="bar"><div style="width:${pct}%;background:${barColor}"></div></div><span class="pct">${pct}%</span></div>
    <div class="c-speed">${speed}</div>
    <div class="c-size">${size}</div>
    <div class="c-time">${time}</div>
    <div class="c-status"><span class="pill" style="background:${color}">${t(sKey)}</span></div>
    <div class="c-act">${pauseBtn}${openBtn}${rmBtn}</div>
  </div>`;
}

function renderRows() {
  const list = snap.items.filter(visible);
  $("rows").innerHTML = list.length ? list.map(rowHTML).join("") : `<div class="empty">${t("empty")}</div>`;
}

function updateCounts() {
  const dl = snap.items.filter((i) => i.kind === "video" && (ACTIVE.includes(i.status) || i.status === "paused")).length;
  const tr = snap.items.filter((i) => i.kind === "torrent" && !FINISHED.includes(i.status)).length;
  const cp = snap.items.filter((i) => i.status === "done").length;
  const qu = snap.items.filter((i) => i.status === "queued").length;
  $("cnt-all").textContent = dl;
  $("cnt-torrent").textContent = tr;
  $("cnt-completed").textContent = cp;
  $("cnt-queue").textContent = qu;
  $("tab-cnt-all").textContent = dl;
  $("tab-cnt-torrent").textContent = tr;
}

function drawSpark() {
  const c = $("spark");
  const dpr = window.devicePixelRatio || 1;
  const w = c.clientWidth, h = c.clientHeight;
  if (c.width !== Math.round(w * dpr) || c.height !== Math.round(h * dpr)) {
    c.width = Math.round(w * dpr);
    c.height = Math.round(h * dpr);
  }
  const ctx = c.getContext("2d");
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, w, h);
  const peak = Math.max(1, ...torrentDown, ...torrentUp);
  for (const [arr, color] of [[torrentDown, "#1E88FF"], [torrentUp, "#2ECC71"]]) {
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    arr.forEach((v, i) => {
      const x = i * (w / (arr.length - 1));
      const y = h - 6 - (v / peak) * (h - 12);
      if (i) ctx.lineTo(x, y); else ctx.moveTo(x, y);
    });
    ctx.stroke();
  }
}

function updateTorrentPanel() {
  const first = snap.items.find((i) => i.kind === "torrent");
  torrentDown.push(first ? first.speed : 0); torrentDown.shift();
  torrentUp.push(first ? first.upload : 0); torrentUp.shift();
  $("st-down").textContent = fmtSpeed(first ? first.speed : 0);
  $("st-up").textContent = fmtSpeed(first ? first.upload : 0);
  $("st-seeds").textContent = first ? first.seeds : 0;
  $("st-peers").textContent = first ? first.peers : 0;
  $("tp-pause").innerHTML = icon(first && first.paused ? "play" : "pause");
  $("tp-pause").dataset.id = first ? first.id : "";
  $("tp-stop").dataset.id = first ? first.id : "";
  if (view === "torrent") drawSpark();
}

function updateStatus() {
  $("sb-down").textContent = "↓ " + fmtSpeed(snap.down);
  $("sb-up").textContent = "↑ " + fmtSpeed(snap.up);
  $("sb-free").textContent = `${t("free")}: ${fmtSize(snap.free)} / ${fmtSize(snap.total_disk)}`;
  if (Date.now() > msgUntil) {
    $("msg").textContent = snap.ffmpeg_missing ? t("no_ffmpeg") : "";
  }
}

async function refresh() {
  const a = api();
  if (!a || busy) return;
  busy = true;
  try {
    snap = await a.snapshot();
    renderRows();
    updateCounts();
    updateTorrentPanel();
    updateStatus();
  } catch (e) {
    /* backend not ready yet */
  } finally {
    busy = false;
  }
}

function errText(code) {
  if (code === "invalid") return t("invalid");
  if (code === "no_lt") return t("no_lt");
  return code || "Error";
}

async function addLink() {
  const a = api();
  const url = $("url").value.trim();
  if (!a || !url) return;
  const r = await a.add_link(url, $("playlist").checked, $("quality").value);
  if (r.ok) { $("url").value = ""; showMsg(""); }
  else showMsg(errText(r.error), "#E5484D");
  refresh();
}

async function openTorrent() {
  const a = api();
  if (!a) return;
  const r = await a.open_torrent();
  if (!r.ok && r.error !== "cancelled") showMsg(errText(r.error), "#E5484D");
  refresh();
}

async function onSpeedChange() {
  const a = api();
  if (!a) return;
  settings = await a.set_speed_limit(parseInt($("speed").value, 10));
  showMsg("");
}

function openSettings() {
  $("set-folder").textContent = settings.save_dir;
  $("set-conc").value = String(settings.max_concurrent);
  $("set-quality").value = settings.default_quality;
  $("set-token").value = settings.bridge_token;
  $("set-lang").textContent = I18N[lang].lang_btn;
  $("settings-dialog").showModal();
}

async function saveSettings() {
  const a = api();
  if (!a) return;
  settings = await a.save_settings({
    lang,
    max_concurrent: parseInt($("set-conc").value, 10),
    default_quality: $("set-quality").value,
  });
  $("settings-dialog").close();
  applyStatic();
}

function copyToken() {
  const input = $("set-token");
  const text = input.value;
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).catch(() => fallbackCopy(input));
  } else {
    fallbackCopy(input);
  }
}
function fallbackCopy(input) {
  input.removeAttribute("readonly");
  input.select();
  document.execCommand("copy");
  input.setAttribute("readonly", "");
}

async function toggleLang() {
  lang = lang === "en" ? "ar" : "en";
  const a = api();
  if (a) settings = await a.save_settings({ lang });
  applyStatic();
  renderRows();
  updateCounts();
  updateStatus();
  $("set-lang").textContent = I18N[lang].lang_btn;
}

function wire() {
  document.querySelectorAll("[data-view]").forEach((el) => el.addEventListener("click", () => setView(el.dataset.view)));
  $("add").addEventListener("click", addLink);
  $("url").addEventListener("keydown", (e) => { if (e.key === "Enter") addLink(); });
  $("btn-torrent-file").addEventListener("click", openTorrent);
  $("btn-open-torrent").addEventListener("click", openTorrent);
  $("btn-resume-all").addEventListener("click", () => api()?.resume_all().then(refresh));
  $("btn-pause-all").addEventListener("click", () => api()?.pause_all().then(refresh));
  $("btn-stop-all").addEventListener("click", () => api()?.stop_all().then(refresh));
  $("btn-clear").addEventListener("click", () => api()?.clear_finished().then(refresh));
  $("speed").addEventListener("change", onSpeedChange);
  $("tp-pause").addEventListener("click", () => {
    const id = $("tp-pause").dataset.id;
    if (!id) return;
    const it = snap.items.find((i) => i.id === id);
    api()?.[it && it.paused ? "resume" : "pause"](id).then(refresh);
  });
  $("tp-stop").addEventListener("click", () => {
    const id = $("tp-stop").dataset.id;
    if (id) api()?.remove(id).then(refresh);
  });
  $("rows").addEventListener("click", async (e) => {
    const b = e.target.closest("button[data-act]");
    if (!b) return;
    const a = api();
    const id = b.dataset.id;
    if (b.dataset.act === "pause") await a.pause(id);
    if (b.dataset.act === "resume") await a.resume(id);
    if (b.dataset.act === "remove") await a.remove(id);
    if (b.dataset.act === "open") {
      const it = snap.items.find((i) => i.id === id);
      if (it) await a.open_folder(it.folder);
    }
    refresh();
  });
  $("btn-settings").addEventListener("click", openSettings);
  $("btn-tools").addEventListener("click", () => api()?.open_folder(settings.save_dir));
  $("btn-about").addEventListener("click", () => $("about-dialog").showModal());
  $("set-save").addEventListener("click", (e) => { e.preventDefault(); saveSettings(); });
  $("set-pick").addEventListener("click", async () => {
    const p = await api()?.pick_folder();
    if (p) { settings.save_dir = p; $("set-folder").textContent = p; }
  });
  $("set-copy").addEventListener("click", copyToken);
  $("set-lang").addEventListener("click", toggleLang);
}

function boot() {
  try {
    applyStatic();
  } catch (e) {
    console.error("applyStatic failed:", e);
  }
  wire();
}

window.addEventListener("error", (e) => console.error("JS error:", e.message, e.error));

window.addEventListener("pywebviewready", async () => {
  try {
    settings = await api().get_settings();
  } catch (e) {
    console.error("get_settings failed:", e);
  }
  lang = settings.lang || "en";
  applyStatic();
  $("quality").value = settings.default_quality || "best";
  $("speed").value = String(settings.speed_kbps || 0);
  if (!settings.lt_ok) showMsg(t("no_lt"), "#F5A524");
  setView("all");
  refresh();
  setInterval(refresh, 500);
});

boot();
