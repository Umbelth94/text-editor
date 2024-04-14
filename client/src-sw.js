const { offlineFallback, warmStrategyCache } = require('workbox-recipes');
const { CacheFirst, StaleWhileRevalidate } = require('workbox-strategies');
const { registerRoute } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');

precacheAndRoute(self.__WB_MANIFEST);

// Cache strategy for HTML pages
const pageCache = new CacheFirst({
  cacheName: 'page-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});

// URLs to be pre-cached for faster access
warmStrategyCache({
  urls: ['/index.html', '/'],
  strategy: pageCache,
});

// Cache strategy for assets (Javascript, CSS, images)
const assetCache = new StaleWhileRevalidate({
  cacheName: 'asset-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});

// Register route for navigation request
registerRoute(({ request }) => request.mode === 'navigate', pageCache);

// Register route for assets
registerRoute(
  // Customize this route to match your assets URL pattern
  ({ request }) => request.destination === 'style' || request.destination === 'script' || request.destination === 'image',
  assetCache
);



registerRoute();
