angular.module('nicoco').directive('navigation', [function () {
	return {
		templateUrl: '/navigation.html',
		restrict: 'E',
		link: function ($scope) {
			$scope.navigationPoints = [
				{ title: 'Gallerien', link: ''},
				{ title: 'Über mich', link: ''},
				{ title: 'Angebote', link: ''},
				{ title: 'Blog', link: ''}
			];
		}
	}
}]);
