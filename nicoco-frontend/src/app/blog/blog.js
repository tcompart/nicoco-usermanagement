angular.module('nicoco').factory('blog', ['$http', 'wordpress', '$log', function ($http, wordpress, $log) {
	function get(successCallback, errorCallback) {
		errorCallback = errorCallback || function (data, status, headers, config) {
				// called asynchronously if an error occurs
				// or server returns response with an error status.
      };
		successCallback = successCallback || function (data, status, headers, config) {

			};
		return $http.get(wordpress + '/?json=get_recent_posts').
			success(successCallback).
			error(errorCallback);
	}	
	function getAll() {
		
	}
	return {
		getArticle: get,
		getArticles: getAll
	};
}]);
