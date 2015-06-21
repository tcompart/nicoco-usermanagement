angular.module('nicoco', ['ui.router'])
	.constant('wordpress', 'http://nicoco.de/wordpress')
	.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.otherwise("/home");

	var home = {
		name: 'home',
		url: '/home',
		templateUrl: '/home.html'
	};

	var aboutme = {
		name: 'aboutme',
		url: '/aboutme',
		templateUrl: '/aboutme.html'
	};

	var offer = {
		name: 'offer',
		url: '/offer',
		templateUrl: '/offer.html'
	};

	var blog = {
		name: 'blog',
		url: '/blog',
		templateUrl: '/blog.html',
		controller: 'blogCtrl'
	};
		
	var impressum = {
		name: 'impressum',
		url: '/impressum',
		templateUrl: '/impressum.html'
	};

	var gallery = {
		name: 'gallery',
		url: '/gallery',
		templateUrl: '/gallery.html',
		controller: 'galleryCtrl'
	};

	$stateProvider.state(home);
	$stateProvider.state(gallery);
	$stateProvider.state(aboutme);
	$stateProvider.state(offer);
	$stateProvider.state(impressum);
}]);
