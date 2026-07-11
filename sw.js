const CACHE = "promarker-studio-personal-1-15-2";
const SHELL = ["./", "./index.html", "./manifest.webmanifest", "./icon-192.png", "./icon-512.png", "./icon-maskable-512.png"];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim())
  );
});
self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;
  // Only ever handle requests to this app itself. Anything cross-origin (the GitHub API,
  // fonts loaded from a CDN, etc.) must go straight to the network, untouched — intercepting
  // it here and letting the catch-all fallback fire on any hiccup would silently swap a real
  // API response for this app's own cached HTML, which is exactly the kind of bug that makes
  // "JSON.parse failed" errors look like someone else's fault.
  if (new URL(e.request.url).origin !== self.location.origin) return;
  const isNav = e.request.mode === "navigate" || e.request.url.endsWith("/index.html") || e.request.url.endsWith("/");
  if (isNav) {
    // Network-first for the app shell itself: always try to get the latest version;
    // only fall back to the cached copy if the network is unavailable.
    e.respondWith(
      fetch(e.request).then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put(e.request, copy)).catch(() => {});
        return res;
      }).catch(() => caches.match(e.request).then((hit) => hit || caches.match("./index.html")))
    );
    return;
  }
  // cache-first for everything else (icons, fonts, etc.)
  e.respondWith(
    caches.match(e.request).then((hit) => {
      if (hit) return hit;
      return fetch(e.request).then((res) => {
        if (res && (res.ok || res.type === "opaque")) {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(e.request, copy)).catch(() => {});
        }
        return res;
      }).catch(() => caches.match("./index.html"));
    })
  );
});
