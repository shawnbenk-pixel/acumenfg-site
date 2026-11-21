/* Bowl Finder offline cache. Bump V when files change so iPads pick up the new copy. */
importScripts("menu.js");
var V = "bowl-finder-v4";
var photos = self.PLAYA_MENU.bowls.concat(self.PLAYA_MENU.smoothies)
  .map(function (i) { return i.photo; }).filter(Boolean)
  .map(function (p) { return "../img/menu/" + p + ".webp"; });
var CORE = ["./", "index.html", "app.css?v=4", "menu.js?v=4", "finder.js?v=4", "app.js?v=4", "manifest.webmanifest",
  "fonts/fredoka.woff2", "fonts/nunito.woff2", "icon-180.png", "icon-192.png", "icon-512.png",
  "../img/playa-logo-192.png", "../img/playa-logo-320.png", "../img/three-bowls-hero.jpg", "../img/three-bowls-phone.jpg"].concat(photos);

self.addEventListener("install", function (e) {
  e.waitUntil(caches.open(V).then(function (c) {
    return Promise.all(CORE.map(function (u) { return c.add(u).catch(function () {}); }));
  }).then(function () { return self.skipWaiting(); }));
});

self.addEventListener("activate", function (e) {
  e.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.filter(function (k) { return k.indexOf("bowl-finder-") === 0 && k !== V; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});

/* Serve from the cache right away and refresh the cache in the background. */
self.addEventListener("fetch", function (e) {
  var req = e.request;
  if (req.method !== "GET" || new URL(req.url).origin !== location.origin) return;
  e.respondWith(caches.open(V).then(function (c) {
    return c.match(req).then(function (hit) {
      var net = fetch(req).then(function (res) { if (res && res.ok) c.put(req, res.clone()); return res; }).catch(function () { return hit; });
      return hit || net;
    });
  }));
});
