/**
 *
 * Handling offline data
 *
 * enablePersistence() is for copy of the Cloud Firestore data and store the data into indexedDB in browser that your app is actively using,
 * so your app can access the data when the device is offline.
 * You can write, read, listen to, and query the cached data.
 * When the device comes back online,
 * Cloud Firestore synchronizes any local changes made by your app to the Cloud Firestore backend.
 *
 */
db.enablePersistence().catch(err => {
	if (err.code == 'failed-precondition') {
		// probably multiple tabs open at once
		console.log('persistence failed');
	} else if (err.code == 'unimplemented') {
		// lack of browser support
		console.log('persistence is not available');
	}
});


/**
 *
 * Real time listener
 *
 * db.collection('recipes') is for select database 'recipes' from firebase
 * .onSnapshot() is for get the snapshot in the recipe's database
 * .docChanges is for track every changes in the snapshot
 *
 */
db.collection('recipes').onSnapshot((snapshot) => {
	// console.log(snapshot.docChanges());
	snapshot.docChanges().forEach(change => {
		console.log(change, change.doc.data(), change.doc.id)
		if (change.type === 'added') {
			// add the document data to the web page
			renderRecipe(change.doc.data(), change.doc.id); 
		}
		if (change.type === 'removed') {
			// remove the document data from the web page
		}
	})
})


/**
 *
 * Add new recipe
 *
 * event.preventDefault is for prevent the web page to reload the page
 * .add(recipe) is for add data to firebase
 * the types of argument in .add() is must be an object
 *
 */
const form = document.querySelector('form');
form.addEventListener('submit', event => {
	event.preventDefault();

	const recipe = {
		title: form.title.value,
		ingredients: form.ingredients.value
	};

	db.collection('recipes')
	  .add(recipe)
	  .catch(err => console.error(err));

	form.title.value = '';
	form.ingredients.value = '';
})