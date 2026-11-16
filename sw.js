const CACHE = "tankyou-v18";
const SHELL = ["./", "index.html", "supabase.js", "manifest.webmanifest", "icons/icon-192.png", "icons/icon-512.png", "icons/apple-touch-icon.png", "icons/mark.svg", "icons/favicon.svg"];
self.addEventListener("install", e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting())); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener("fetch", e => {
  const req = e.request; const url = new URL(req.url);
  if (req.method !== "GET" || url.origin !== location.origin) return; // Supabase e fontes vão direto à rede
  const isPage = req.mode === "navigate" || url.pathname.endsWith("/") || url.pathname.endsWith("index.html");
  if (isPage) {
    e.respondWith(fetch(req, { cache: "no-cache" }).then(r => { const cp = r.clone(); caches.open(CACHE).then(c => c.put("index.html", cp)); return r; }).catch(() => caches.match("index.html")));
  } else {
    e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(r => { const cp = r.clone(); caches.open(CACHE).then(c => c.put(req, cp)); return r; })));
  }
});
