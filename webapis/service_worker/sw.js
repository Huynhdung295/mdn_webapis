// sw.js - Service Worker Cache & Offline Proxy
const CACHE_NAME = 'mdn-sw-cache-v1';
const ASSETS_TO_CACHE = [
  './index.html',
  './script.js',
  '../shared/styles.css',
  '../shared/ui-core.js',
  '../shared/api-data.js'
];

self.addEventListener('install', (e) => {
  console.log('[SW] install event');
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[SW] Caching core assets...');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

self.addEventListener('activate', (e) => {
  console.log('[SW] activate event');
  e.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((cached) => {
      if (cached) {
        console.log('[SW] Phục vụ từ Cache:', e.request.url);
        return cached;
      }
      return fetch(e.request);
    })
  );
});
