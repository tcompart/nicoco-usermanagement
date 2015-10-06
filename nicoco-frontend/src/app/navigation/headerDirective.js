angular.module('nicoco').directive('headerDirective', [function () {
	return {
		restrict: 'E',
		scope: {
			showCarousel: '=?'
		},
		templateUrl: '/header.html',
		bindToController: true,
		controllerAs: 'header',
		controller: function () {
			this.showCarousel = angular.isDefined(this.showCarousel) ? this.showCarousel : false;
		}
	};
}]);
