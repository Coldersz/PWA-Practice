document.addEventListener('DOMContentLoaded', function() {
	// nav menu
	const menus = document.querySelectorAll('.side-menu');
	M.Sidenav.init(menus, {edge: 'right'});

	// M.Sidenav = from materialize.min.js

	// add recipe menu
	const forms = document.querySelectorAll('.side-form');
	M.Sidenav.init(forms, {edge: 'left'});
});