 /**
 *
 * Check for browser support
 *
 * navigator is an object in javacsript that represents the browser and informations about it
 *
*/
if ("serviceWorker" in navigator) {
	navigator.serviceWorker.register('/sw.js')
	.then((reg) => console.log('service worker registered', reg))
	.catch((err) => console.log('service worker not registered', err))
}

