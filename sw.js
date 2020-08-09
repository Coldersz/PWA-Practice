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
	console.log('service worker has been activated');
}) 

 