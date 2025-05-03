
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('boots-cache-v1').then(cache => {
      return cache.addAll([
        '/',
        '/index.html',
        '/app.js',
        '/manifest.json',
        '/icons/boots.svg'
      ]);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cached => {
      return cached || fetch(event.request);
    })
  );
});
