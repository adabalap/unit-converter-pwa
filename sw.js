self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open('boots-converter-cache').then((cache) => {
      return cache.addAll([
        '/',
        '/index.html',
        '/manifest.json',
        '/sw.js',
        '/boots.png',
        '/icon-192.png',
        '/icon-512.png'
      ]);
    })
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
