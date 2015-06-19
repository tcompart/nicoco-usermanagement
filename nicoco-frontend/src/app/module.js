angular.module('nicoco', ['ui.router']).config(function ($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.otherwise("/home");

	var home = {
		name: 'home',
		url: '/home',
		templateUrl: '/home.html'
	};

	var aboutme = {
		name: 'aboutme',
		url: '/aboutme',
		templateUrl: '/aboutme.html'
	};

	var offer = {
		name: 'offer',
		url: '/offer',
		templateUrl: '/offer.html'
	};

	var blog = {
		name: 'blog',
		url: '/blog',
		templateUrl: '/blog.html'
	};

	var gallery = {
		name: 'gallery',
		url: '/gallery',
		templateUrl: '/gallery.html',
		controller: function ($scope) {

			$('a[data-toggle]').on('click', function (e) {
				e.preventDefault();
				var that = $(this);
				var toggleKey = that.attr("data-toggle");

				that.closest('.container').find('div[data-toggle]').collapse('hide');
				that.closest('.container').find('div[data-toggle=' + toggleKey + ']').collapse('toggle');
			});

			$scope.familylove = [
				{src: 'images/familylove/29.jpg', desc: ''},
				{src: 'images/familylove/30.jpg', desc: ''},
				{src: 'images/familylove/1.jpg', desc: ''},
				{src: 'images/familylove/2.jpg', desc: ''},
				{src: 'images/familylove/3.jpg', desc: ''},
				{src: 'images/familylove/4.jpg', desc: ''},
				{src: 'images/familylove/5.jpg', desc: ''},
				{src: 'images/familylove/6.jpg', desc: ''},
				{src: 'images/familylove/7.jpg', desc: ''},
				{src: 'images/familylove/8.jpg', desc: ''},
				{src: 'images/familylove/9.jpg', desc: ''},
				{src: 'images/familylove/10.jpg', desc: ''},
				{src: 'images/familylove/11.jpg', desc: ''},
				{src: 'images/familylove/12.jpg', desc: ''},
				{src: 'images/familylove/13.jpg', desc: ''},
				{src: 'images/familylove/14.jpg', desc: ''},
				{src: 'images/familylove/15.jpg', desc: ''},
				{src: 'images/familylove/16.jpg', desc: ''},
				{src: 'images/familylove/17.jpg', desc: ''},
				{src: 'images/familylove/18.jpg', desc: ''},
				{src: 'images/familylove/19.jpg', desc: ''},
				{src: 'images/familylove/20.jpg', desc: ''},
				{src: 'images/familylove/21.jpg', desc: ''},
				{src: 'images/familylove/22.jpg', desc: ''},
				{src: 'images/familylove/23.jpg', desc: ''},
				{src: 'images/familylove/24.jpg', desc: ''},
				{src: 'images/familylove/25.jpg', desc: ''},
				{src: 'images/familylove/26.jpg', desc: ''},
				{src: 'images/familylove/27.jpg', desc: ''},
				{src: 'images/familylove/28.jpg', desc: ''}
			];

			$scope.portraits = [
				{src: 'images/portraits/1.jpg', desc: ''},
				{src: 'images/portraits/2.jpg', desc: ''},
				{src: 'images/portraits/3.jpg', desc: ''},
				{src: 'images/portraits/4.jpg', desc: ''},
				{src: 'images/portraits/5.jpg', desc: ''},
				{src: 'images/portraits/6.jpg', desc: ''},
				{src: 'images/portraits/7.jpg', desc: ''},
				{src: 'images/portraits/8.jpg', desc: ''},
				{src: 'images/portraits/9.jpg', desc: ''},
				{src: 'images/portraits/10.jpg', desc: ''},
				{src: 'images/portraits/11.jpg', desc: ''},
				{src: 'images/portraits/12.jpg', desc: ''},
				{src: 'images/portraits/13.jpg', desc: ''},
				{src: 'images/portraits/14.jpg', desc: ''},
				{src: 'images/portraits/15.jpg', desc: ''},
				{src: 'images/portraits/16.jpg', desc: ''},
				{src: 'images/portraits/17.jpg', desc: ''},
				{src: 'images/portraits/18.jpg', desc: ''},
				{src: 'images/portraits/19.jpg', desc: ''},
				{src: 'images/portraits/20.jpg', desc: ''},
				{src: 'images/portraits/21.jpg', desc: ''},
				{src: 'images/portraits/22.jpg', desc: ''},
				{src: 'images/portraits/23.jpg', desc: ''}
			];

			$scope.lovestories = [
				{src: 'images/lovestories/1.jpg', desc: ''},
				{src: 'images/lovestories/2.jpg', desc: ''},
				{src: 'images/lovestories/3.jpg', desc: ''},
				{src: 'images/lovestories/4.jpg', desc: ''},
				{src: 'images/lovestories/5.jpg', desc: ''},
				{src: 'images/lovestories/6.jpg', desc: ''},
				{src: 'images/lovestories/7.jpg', desc: ''},
				{src: 'images/lovestories/8.jpg', desc: ''},
				{src: 'images/lovestories/9.jpg', desc: ''},
				{src: 'images/lovestories/10.jpg', desc: ''},
				{src: 'images/lovestories/11.jpg', desc: ''},
				{src: 'images/lovestories/12.jpg', desc: ''},
				{src: 'images/lovestories/13.jpg', desc: ''},
				{src: 'images/lovestories/14.jpg', desc: ''},
				{src: 'images/lovestories/15.jpg', desc: ''},
				{src: 'images/lovestories/16.jpg', desc: ''},
				{src: 'images/lovestories/17.jpg', desc: ''},
				{src: 'images/lovestories/18.jpg', desc: ''},
				{src: 'images/lovestories/19.jpg', desc: ''},
				{src: 'images/lovestories/20.jpg', desc: ''},
				{src: 'images/lovestories/21.jpg', desc: ''},
				{src: 'images/lovestories/22.jpg', desc: ''},
				{src: 'images/lovestories/23.jpg', desc: ''},
				{src: 'images/lovestories/24.jpg', desc: ''}
			];
		}
	};

	$stateProvider.state(home);
	$stateProvider.state(gallery);
	$stateProvider.state(aboutme);
	$stateProvider.state(offer);
	$stateProvider.state(blog);
});
