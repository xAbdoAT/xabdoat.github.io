// Service Worker for Abdo AT BioLink - PWA Implementation
// This service worker enables offline functionality and caching

const CACHE_NAME = 'abdoat-biolink-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/assets/css/styles.css',
  '/assets/js/title-animation.js',
  '/assets/js/enter.js',
  '/assets/js/browser.js',
  '/assets/js/cursor-effects.js',
  '/assets/js/discord-loader.js',
  '/assets/js/typewriter.js',
  '/assets/images/AbdoAT.gif',
  '/assets/images/favicon.png',
  '/assets/images/preview.png'
];

// Install event - cache assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event - serve cached content when offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached version or fetch from network
        return response || fetch(event.request);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});