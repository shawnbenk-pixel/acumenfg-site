/* Bowl Finder offline cache.
   The page, scripts and styles come from the network first, so an update shows on the very next open;
   the saved copy is used only when the network is down or slow. Photos and fonts come from the saved copy.
   Bump V and the ?v= numbers in index.html when files change. */
importScripts("menu.js");
var V = "bowl-finder-v9";
var NET_WAIT_MS = 3000;
var photos = self.PLAYA_MENU.bowls.concat(self.PLAYA_MENU.smoothies)
  .map(function (i) { return i.photo; }).filter(Boolean)
  .map(function (p) { return "../img/menu/" + p + ".webp"; });
var CORE = ["./", "index.html", "app.css?v=9", "menu.js?v=9", "finder.js?v=9", "app.js?v=9", "manifest.webmanifest",
  "fonts/fredoka.woff2", "fonts/nunito.woff2", "app-icon-152.png", "app-icon-167.png", "app-icon-180.png", "app-icon-192.png", "app-icon-512.png",
  "../img/playa-logo-320.png"].concat(photos);

self.addEventListener("install", function (e) {
  e.waitUntil(caches.open(V).then(function (c) {
    return Promise.all(CORE.map(function (u) {
      return fetch(new Request(u, { cache: "reload" })).then(function (res) { if (res.ok) return c.put(u, res); }).catch(function () {});
    }));
  }).then(function () { return self.skipWaiting(); }));
});

self.addEventListener("activate", function (e) {
  e.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.filter(function (k) { return k.indexOf("bowl-finder-") === 0 && k !== V; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});

function isCode(req, url) {
  return req.mode === "navigate" || /\.(html|js|css|webmanifest)$/.test(url.pathname) || /\/$/.test(url.pathname);
}

self.addEventListener("fetch", function (e) {
  var req = e.request, url = new URL(req.url);
  if (req.method !== "GET" || url.origin !== location.origin) return;
  e.respondWith(caches.open(V).then(function (c) {
    if (!isCode(req, url)) {
      /* photos and fonts: saved copy first */
      return c.match(req).then(function (hit) {
        return hit || fetch(req).then(function (res) { if (res && res.ok) c.put(req, res.clone()); return res; });
      });
    }
    /* page and code: network first, saved copy if the network fails or takes too long */
    var saved = c.match(req, { ignoreSearch: req.mode === "navigate" });
    var net = fetch(req.url, { cache: "no-cache" }).then(function (res) { if (res && res.ok) c.put(req, res.clone()); return res; });
    var slow = new Promise(function (resolve) { setTimeout(resolve, NET_WAIT_MS); }).then(function () { return saved; });
    return Promise.race([net.catch(function () { return saved; }), slow]).then(function (res) {
      return res || net.catch(function () { return saved; });
    });
  }));
});
