var staticCacheVersion = "version-1";

/* KR - Callback install*/

self.addEventListener('install', function(event) {
  console.log("ServiceWorker installed");
  event.waitUntil(
    caches.open(staticCacheVersion)
      .then(function(cache) {
        console.log('ServiceWorker caching files');
        return cache.addAll([
          '/',
          '/restaurant.html',
          '/index.html',
          '/css/styles.css',
          '/data/restaurants.json',
          '/js/dbhelper.js',
          '/js/main.js',
          '/js/restaurant_info.js',
          '/img/1.jpg',
          '/img/2.jpg',
          '/img/3.jpg',
          '/img/4.jpg',
          '/img/5.jpg',
          '/img/6.jpg',
          '/img/7.jpg',
          '/img/8.jpg',
          '/img/9.jpg',
          '/img/10.jpg'
        ]);
      }).catch(function(err) {
          console.log(err);
        })
  );
});

/* KR - create an activate callback and delete old caches*/
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return cacheName.startsWith('version-') &&
            cacheName != staticCacheVersion;
        }).map(function(cacheName) {
          console.log("Deleting cached files");
          return caches.delete(cacheVersion);
        })
      );
    })
  );
});

/* KR - Return cached response*/
self.addEventListener('fetch', function(event) {
  console.log("ServiceWorker fetching data from", event.request.url);
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        /*KR - firstly used code below*/
        /*if (response) {
          return response;
        }
        return fetch(event.request);*/
        /*KR - code replaced according to the hint on
        * https://codelabs.developers.google.com/codelabs/offline/#7
        Child pages store the cache now; there was previously no cache saved.
        */
        return response || fetch(event.request);
      })
  			.catch(function(err) {
  				console.log("Data caching error: ", err);
  			})
  	)
});
