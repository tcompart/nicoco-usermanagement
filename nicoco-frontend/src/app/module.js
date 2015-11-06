angular.module('nicoco', ['ui.router'])
	.constant('wordpress', 'http://www.nicoco.de/wordpress')
	.run(['$rootScope', '$location', '$window', function ($rootScope, $location, $window) {
		$rootScope.$on('$stateChangeSuccess', function (event) {
			if ($window.ga) {
				$window.ga('send', 'pageview', {page: $location.path()});
			}
		});
	}])
	.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {
		$locationProvider.html5Mode({
			enabled: true,
			requireBase: false
		});
		$locationProvider.hashPrefix('!');

		$urlRouterProvider.otherwise("/home");

		var home = {
			name: 'home',
			url: '/home',
			template: ' '
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

		var impressum = {
			name: 'impressum',
			url: '/impressum',
			templateUrl: '/impressum.html'
		};

		var gallery = {
			name: 'gallery',
			url: '/gallery',
			templateUrl: '/gallery.html',
			controller: 'galleryCtrl as gallery'
		};

		$stateProvider.state(home);
		$stateProvider.state(gallery);
		$stateProvider.state(aboutme);
		$stateProvider.state(offer);
		$stateProvider.state(impressum);
	}]);
