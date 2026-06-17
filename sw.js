const CACHE_NAME = "encanto-marino-v2";
const FILES = [
  "./",
  "./index.html",
  "./menu.html",
  "./qr-imprimir.html",
  "./styles.css",
  "./script.js",
  "./data/menu-data.js",
  "./assets/logo.svg",
  "./assets/favicon.svg",
  "./assets/qr-carta.png"
];

self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(FILES)));
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(resp => resp || fetch(event.request))
  );
});
