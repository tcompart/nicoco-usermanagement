angular.module('nicoco').controller('galleryCtrl', ['familyLove', 'portraits', 'loveStories', 
	function (familyLove, portraits, loveStories) {
	$('a[data-toggle]').on('click', function (e) {
		e.preventDefault();
		var that = $(this);
		var toggleKey = that.attr("data-toggle");

		that.closest('.container').find('div[data-toggle]').collapse('hide');
		that.closest('.container').find('div[data-toggle=' + toggleKey + ']').collapse('toggle');
	});

	this.familylove = familyLove;
	this.portraits = portraits;
	this.lovestories = loveStories;
}]);
