// Define a unique name for the cache
const CACHE_NAME = 'unit-converter-boots-v2'; // Increment version if you change cached files

// List of essential files (app shell) to cache immediately upon installation
const urlsToCache = [
  '/',                // Cache the root URL (often serves index.html)
  '/index.html',      // Explicitly cache the main HTML file
  '/manifest.json',   // Cache the PWA manifest
  // External resources (CDNs) - caching these can improve offline performance
  'https://cdn.tailwindcss.com',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
  // '/style.css',    // Add your own CSS file if you create one
  // '/script.js',    // Add your own JS file if you create one
  // IMPORTANT: Add paths to your actual icon files here after creating them!
  // e.g., '/icons/icon-192x192.png',
  //       '/icons/icon-512x512.png'
];

// --- Service Worker Installation ---
self.addEventListener('install', event => {
  console.log('Service Worker: Installing...');
  // Perform install steps: open cache and add app shell files
  event.waitUntil( // Ensures installation doesn't complete until caching is done
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Service Worker: Caching app shell files...');
        // Add all specified URLs to the cache.
        // `addAll` is atomic: if one file fails, the whole operation fails.
        return cache.addAll(urlsToCache).catch(error => {
            // Log detailed error if caching fails
            console.error('Service Worker: Failed to cache app shell files during install.', error);
            // Optional: Attempt to cache individually if addAll fails (less reliable)
            // urlsToCache.forEach(url => {
            //     cache.add(url).catch(err => console.warn(`Failed to cache ${url}:`, err));
            // });
            // Re-throw the error to ensure the install fails if critical assets aren't cached
            throw error;
        });
      })
      .then(() => {
        console.log('Service Worker: Install complete. Activating immediately.');
        // Force the waiting service worker to become the active service worker.
        // This ensures the latest SW takes control without waiting for page navigations.
        return self.skipWaiting();
      })
  );
});

// --- Service Worker Activation ---
self.addEventListener('activate', event => {
  console.log('Service Worker: Activating...');
  // Define a whitelist of cache names to keep (only the current one)
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil( // Ensures activation doesn't complete until old caches are removed
    caches.keys().then(cacheNames => {
      // Map over all cache names found
      return Promise.all(
        cacheNames.map(cacheName => {
          // If a cache name is not in the whitelist, delete it
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            console.log('Service Worker: Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
        console.log('Service Worker: Activation complete. Claiming clients.');
        // Take control of currently open pages/clients immediately.
        // This ensures pages loaded before activation are controlled by the new SW.
        return self.clients.claim();
    })
  );
});

// --- Service Worker Fetch Event ---
// Intercepts network requests made by the page
self.addEventListener('fetch', event => {
  // console.log('Service Worker: Fetching - ', event.request.url); // Uncomment for debugging fetches

  // Use a "Cache falling back to Network" strategy:
  // 1. Try to find the response in the cache.
  // 2. If found, return the cached response.
  // 3. If not found, fetch from the network.
  // 4. (Optional) Cache the fetched response for future offline use.
  event.respondWith(
    caches.match(event.request) // Check if the request exists in the cache
      .then(cachedResponse => {
        // Cache hit - return the cached response
        if (cachedResponse) {
          // console.log('Service Worker: Serving from cache -', event.request.url); // Debug log
          return cachedResponse;
        }

        // Cache miss - fetch from the network
        // console.log('Service Worker: Fetching from network -', event.request.url); // Debug log
        return fetch(event.request).then(
          networkResponse => {
            // Check if we received a valid response from the network
            // Note: Basic responses are same-origin. Opaque are cross-origin (like CDN)
            if (!networkResponse || networkResponse.status !== 200 || networkResponse.type === 'error') {
              // Don't cache invalid responses
              return networkResponse;
            }

            // OPTIONAL: Cache dynamically fetched resources
            // Be cautious about caching everything, especially large files or API responses
            // that change frequently. Only cache if it makes sense for offline use.
            /*
            // Clone the response because it's a stream and can only be consumed once.
            // One stream goes to the browser, the other to the cache.
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME)
              .then(cache => {
                // console.log('Service Worker: Caching new resource -', event.request.url); // Debug log
                cache.put(event.request, responseToCache);
              });
            */

            // Return the network response to the browser
            return networkResponse;
          }
        ).catch(error => {
            // Handle fetch errors (e.g., network offline)
            console.error('Service Worker: Fetch failed; returning offline fallback or error -', error);
            // Optional: Return a custom offline fallback page if the request fails
            // For example: return caches.match('/offline.html');
            // Or just let the browser handle the error
        });
      })
  );
});
