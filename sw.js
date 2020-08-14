const staticCacheName = 'site-static-v1.1';
const dynamicCache = 'site-dynamic-v1';
const assets = [
	'/',
	'/index.html',
	'/js/app.js',
	'/js/ui.js',
	'/js/materialize.min.js',
	'/css/style.css',
	'/css/materialize.min.css',
	'/img/dish.png',
	'https://fonts.googleapis.com/icon?family=Material+Icons',
	'https://fonts.gstatic.com/s/materialicons/v54/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2'
];


/**
 *
 * Install service worker
 *
 * Only triggered once when install service worker
 * Only triggered when there's some changes in this file 
 *
 */
self.addEventListener('install', event => {
	console.log('service worker has been installed');
	event.waitUntil(
		caches.open(staticCacheName).then(cache => {
			cache.addAll(assets);
			console.log('caching shell assets');
		})
	);
})


/**
 *
 * Activate service worker
 *
 * If it doesn't triggered that's because we already have a service worker the previous version before we made the changes to it activating already in the browser.
 *
 * The browser doesn't automatically activate our new service worker version and replace the old ones with it
 *
 */
self.addEventListener('activate', event => {
	// alert('service worker has been activated')
	// self.skipWaiting();
	event.waitUntil(
		caches.keys().then(keys => {
			console.log(keys);
			return Promise.all(
				keys
				.filter(key => key !== staticCacheName)
				.map(key => caches.delete(key))
			)
		})
		.catch(err => {
			console.log(err)
		})
	)
}) 


self.addEventListener('fetch', event => {
	console.log('Fetching', event);

	/**
	 *
	 * If there's something match in the caches, then intercept it for fetching the resources
	 *
	 * The benefit is we could run the program when we're offline
	 *
	 */
	event.respondWith(
		caches.match(event.request)
		.then(cacheRes => {
			return cacheRes || fetch(event.request).then(fetchRes => {
				return caches.open(dynamicCache).then(cache => {

					// cache.put(key, value)
					cache.put(event.request.url, fetchRes.clone());
					return fetchRes
				})
			});
		})
	)
});
