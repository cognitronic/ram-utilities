/**
 * Created by dschreiber on 1/4/2015.
 */

(function(){ 'use strict';

	angular.module('ram-utilities.ui.scrollable-table',[])
		.directive('ramScrollableTable', ['$timeout', '$q', '$parse', function($timeout, $q, $parse) {
			return {
				transclude: true,
				restrict: 'A',
				scope: {
					rows: '=watch'
				},
				template: '<div class="scrollableContainer">' +
					'<div class="headerSpacer"></div>' +
					'<div class="scrollArea" ng-transclude></div>' +
					'</div>',
				controller: ['$scope', '$element', '$attrs', function($scope, $element, $attrs) {



//			// Set fixed widths for the table headers in case the text overflows.
//			// There's no callback for when rendering is complete, so check the visibility of the table
//			// periodically
					function waitForRender() {
						var deferredRender = $q.defer();
						function wait() {
							if($element.find("table:visible").length === 0) {
								$timeout(wait, 100);
							} else {
								deferredRender.resolve();
							}
						}
						$timeout(wait);
						return deferredRender.promise;
					}


					var headersAreFixed = $q.defer();
					function fixHeaderWidths() {
						if(!$element.find("thead th .th-inner").length){
							$element.find("thead th").wrapInner('<div class="th-inner"></div>');
						}

						if($($element).attr('cs-scrollable-table') !== undefined){
							$($element).css('height', '100%');
						}


						$element.find("table th .th-inner").each(function(index, el) {
							el = $(el);
							var padding = el.outerWidth() - el.width();
							var width = el.parent().width() - padding;
							// if it's the last header, add space for the scrollbar equivalent unless it's centered
							var lastCol = $element.find("table th:visible:last");
							if(lastCol.css("text-align") !== "center") {
								var hasScrollbar = $element.find(".scrollArea").height() < $element.find("table").height();
								if(lastCol[0] == el.parent()[0] && hasScrollbar) {
									width += $element.find(".scrollArea").width() - $element.find("tbody tr").width();
								}
							}

							el.css("width", width);
							var title = el.parent().attr("title");
							if(!title) {
								title = el.children().length ? el.find(".title .ng-scope").html() : el.html();
							}
							el.attr("title", title.trim());
						});
						headersAreFixed.resolve();
					}


					$(window).resize(fixHeaderWidths);


					// when the data model changes, fix the header widths.
					$scope.$watch('rows', function(newValue, oldValue) {
						if(newValue) {
							waitForRender().then(fixHeaderWidths);
						}
					});

					$element.find(".scrollArea").scroll(function(event)
					{
						$element.find("thead th .th-inner").css('margin-left', 0 - event.target.scrollLeft);
					});
				}]
			};
		}]);

})();