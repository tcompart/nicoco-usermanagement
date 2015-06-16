/*globals Masonry, imagesLoaded */
angular.module('nicoco')
	.directive('masonry', ['$log', function ($log) {
		'use strict';
		return {
			restrict: 'E',
			scope: {
				input: '='
			},
			template: '<section id="photos"><div class="grid-item" ng-repeat="entry in input">' +
			'<gallery-item image-src="{{ entry.src }}" image-description="{{entry.desc}}"></gallery-item></div></section>'
		};
	}]).directive('galleryItem', ['$log',function ($log) {
		'use strict';
		return {
			restrict: 'E',
			scope: {
				imageSrc: '@',
				imageDescription: '@'
			},
			template: '<div data-toggle="lightbox"' +
			' data-title="{{imageDescription}}"><img ng-src="{{imageSrc}}" class="img-responsive thumbnail"></div>',
			link: function ($scope, element) {
				element.bind('click', function (event) {
					event.preventDefault();
					return element.ekkoLightbox({
						always_show_close: true,
						remote: $scope.imageSrc,
						type: 'image',
						gallery: 'multiimages'
					});
				});
				$log.info('image: ', $scope.imageSrc);
				$scope.openLightbox = function ($event) {
					$event.stopPropagation();
				};
			}
		};
	}]);
