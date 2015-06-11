/*global $*/
angular.module('nicoco').directive('carousel', ['slides', function (slides) {
	return {
		templateUrl: '/carousel.html',
		restrict: 'E',
		link: function ($scope) {
			$scope.slides = slides;
			$('#carousel').carousel({	interval: 3000 });
		}
	};
}]);
