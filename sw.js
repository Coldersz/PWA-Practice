/**
 *
 * Install service worker
 *
 * Only triggered once when install service worker
 * If there's nothing changes in this file, so it won't be triggered
 *
 */
self.addEventListener('install', event => {
	console.log('service worker has been installed');
})