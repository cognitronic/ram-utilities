/**
 * Created by dschreiber on 12/26/2014.
 */

(function(window, document, undefined) {
	'use strict';



// Source: popover.tpl.js
	angular.module('ram-utilities.ui.popover').run(['$templateCache', function($templateCache) {

		$templateCache.put('ccPopover/ccPopover.tpl.html', '<div class="popover"><div class="arrow"></div><h3 class="popover-title" ng-bind="title" ng-show="title"></h3><div class="popover-content" ng-bind="content"></div></div>');

	}]);



// Source: tooltip.tpl.js
	angular.module('ram-utilities.ui.tooltip').run(['$templateCache', function($templateCache) {

		$templateCache.put('ccTooltip/ccTooltip.tpl.html', '<div class="tooltip in" ng-show="title"><div class="tooltip-arrow"></div><div class="tooltip-inner" ng-bind="title"></div></div>');

	}]);


})(window, document);