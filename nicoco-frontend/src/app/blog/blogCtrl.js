angular.module('nicoco').controller('blogCtrl', ['$scope', 'blog',function ($scope, blog) {
	$scope.text = blog.getArticle();
}]);
