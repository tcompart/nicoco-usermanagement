angular.module('nicoco').directive('navigation', [function () {
	return {
		templateUrl: '/navigation.html',
		restrict: 'E',
		link: function ($scope) {
			$scope.navigationPoints = [
				{title: 'Gallerien', link: '#/gallery'},
				{title: 'Über mich', link: '#/aboutme'},
				{title: 'Angebote', link: '#/offer'},
				{title: 'Blog', link: '/wordpress/'}
			];
		}
	};
}]);
