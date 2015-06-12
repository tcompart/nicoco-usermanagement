angular.module('nicoco', ['ui.router']).config(function ($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.otherwise("/home");

	var home = {
		name: 'home',
		url: '/home',
		templateUrl: '/home.html'
	};

	var gallery = {
		name: 'gallery',
		url: '/gallery',
		templateUrl: '/gallery.html'
	};

	$stateProvider.state(home);
	$stateProvider.state(gallery);
});
