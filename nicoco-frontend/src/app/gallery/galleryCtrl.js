angular.module('nicoco').controller('galleryCtrl', ['$scope', 'familyLove', 'portraits', 'loveStories', function ($scope, familyLove, portraits, loveStories) {
	$('a[data-toggle]').on('click', function (e) {
		e.preventDefault();
		var that = $(this);
		var toggleKey = that.attr("data-toggle");

		that.closest('.container').find('div[data-toggle]').collapse('hide');
		that.closest('.container').find('div[data-toggle=' + toggleKey + ']').collapse('toggle');
	});

	$scope.familylove = familyLove;
	$scope.portraits = portraits;
	$scope.lovestories = loveStories;
}]);
