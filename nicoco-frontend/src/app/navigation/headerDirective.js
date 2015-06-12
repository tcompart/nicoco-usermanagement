angular.module('nicoco').directive('headerDirective', [function () {
	return {
		restrict: 'E',
		scope: {
			showCarousel: '=?'
		},
		templateUrl: '/header.html',
		controller: ['$scope', function ($scope) {
			$scope.showCarousel = angular.isDefined($scope.showCarousel) ? $scope.showCarousel : false;
		}]
	};
}]);
