angular.module('nicoco', ['ui.router']).config(function ($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.otherwise("/home");

	$stateProvider.state('home', {
		url: '/home',
		template: '<header role="banner">' +
		'<img id="logo-main" src="images/logo.jpg" />' +
		'<carousel></carousel>' +
		'<navigation></navigation>' +
		'</header>'
	});
});
