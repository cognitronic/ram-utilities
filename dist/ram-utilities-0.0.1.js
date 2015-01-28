/**
 * Created by dschreiber on 12/26/2014.
 */

//master module for ram-utilities.ui.  All component modules must be injected here in order to show up via ram-utilities-ui-x.x.x.js
angular.module('ram-utilities.ui',
	[
		'ram-utilities.ui.tpls',
		'ram-utilities.ui.dialog',
		'ram-utilities.ui.tooltip',
		'ram-utilities.ui.popover',
		'ram-utilities.ui.cache.service',
		'ram-utilities.ui.event-bus.service',
		'ram-utilities.ui.rest.service',
		'ram-utilities.ui.browser-support.service',
		'ram-utilities.ui.alert.service',
		'ram-utilities.ui.scrollable-table',
		'ram-utilities.ui.manage-columns'
	]);

//master module for ram-utilities.ui $templateCache.
angular.module('ram-utilities.ui.tpls', ['template/dialog/dialog-confirm.html', 'template/dialog/dialog-notify.html', 'template/dialog/dialog-error.html']);
/**
 * @author Danny Schreiber on 12/22/2014.
 */



angular.module('ram-utilities.ui.dialog', ['ui.bootstrap'])
/**
 * @class DialogsService
 * @classdesc This service allows for the programmatic creation of dialogs and leverages the modal functionality from the Angular Bootstrap library.
 */
	.provider('DialogsService',[function(){
		var b = true; // backdrop
		var k = true; // keyboard
		var w = 'modal-dialog'; // windowClass
		var copy = true; // controls use of angular.copy

		/**
		 * Sets the use of the modal backdrop.  Either to have one or not and
		 * whether or not it responds to mouse clicks ('static' sets the
		 * backdrop to true and does not respond to mouse clicks).
		 *
		 * @param  {mixed} val   (true, false, 'static')
		 * @memberOf DialogsService
		 */
		this.useBackdrop = function(val){
			if(angular.isDefined(val))
				b = val;
		};

		/**
		 * Sets the use of the ESC (escape) key to close modal windows.
		 *
		 * @param  {boolean} val
		 * @memberOf DialogsService
		 */
		this.useEscClose = function(val){ // possible values : true, false
			if(angular.isDefined(val))
				k = (!angular.equals(val,0) && !angular.equals(val,'false') && !angular.equals(val,'no') && !angular.equals(val,null) && !angular.equals(val,false)) ? true : false;
		}; // end useESCClose

		/**
		 * Sets the additional CSS window class of the modal window template.
		 *
		 * @param  {string} val
		 * @memberOf DialogsService
		 */
		this.useClass = function(val){
			if(angular.isDefined(val))
				w = val;
		}; // end useClass

		/**
		 * Determines the use of angular.copy when sending data to the modal controller.
		 *
		 * @param  {boolean} val
		 * @memberOf DialogsService
		 */
		this.useCopy = function(val){
			if(angular.isDefined(val))
				copy = (!angular.equals(val,0) && !angular.equals(val,'false') && !angular.equals(val,'no') && !angular.equals(val,null) && !angular.equals(val,false)) ? true : false;
		};


		this.$get = ['$modal',function ($modal){
			return {
				/**
				 * Error dialog
				 * @param {string} header The text in the title bar
				 * @param {string} msg Error message to display to user
				 * @param {string} cssClass optional css class to apply to the dialog window
				 * @param {mixed} backDrop optional flag that sets the dialog back drop
				 * @param {boolean} escKey optional flag to allow the esc key to close the modal
				 * @returns {*} an instance of $modal
				 * @memberOf DialogsService
				 */
				error : function(header, msg, cssClass, backDrop, escKey){
					if(arguments.length > 3){
						b = backDrop;
					}
					if(arguments.length > 4){
						k = escKey;
					}
					if(cssClass){
						w = cssClass;
					}
					return $modal.open({
						templateUrl : 'template/dialog/dialog-error.html',
						controller : 'ErrorDialogController',
						backdrop: b,
						keyboard: k,
						windowClass: w,
						resolve : {
							header : function() { return angular.copy(header); },
							msg : function() { return angular.copy(msg); }
						}
					});
				},
				/**
				 * Notification dialog
				 *
				 * @param {string} header The text in the title bar
				 * @param {string} msg optional message to display to user
				 * @param {string} cssClass optional css class to apply to the dialog window
				 * @param {mixed} backDrop optional flag that sets the dialog back drop
				 * @param {boolean} escKey optional flag to allow the esc key to close the modal
				 * @param {int} modalWidth optional value to set the modals width
				 * @param {int} modalHeight optional value to set the modals height
				 * @returns {*} an instance of $modal
				 * @memberOf DialogsService
				 */
				notify : function(header, msg, cssClass, backDrop, escKey, modalWidth, modalHeight){
					if(arguments.length > 3){
						b = backDrop;
					}
					if(arguments.length > 4){
						k = escKey;
					}
					if(cssClass){
						w = cssClass;
					}
					return $modal.open({
						templateUrl : 'template/dialog/dialog-notify.html',
						controller : 'NotifyDialogController',
						backdrop: b,
						keyboard: k,
						windowClass: w,
						resolve : {
							header : function() { return angular.copy(header); },
							msg : function() { return angular.copy(msg); },
							modalWidth : function() { return angular.copy(modalWidth); },
							modalHeight : function() { return angular.copy(modalHeight); }
						}
					});
				},

				/**
				 *
				 * Creates a confirm dialog.  Setting the the modalWidth and modalHeight will automatically center the modal in the screen based on the screen resolution and modal dimensions.
				 *
				 * @param {string} header The text in the title bar
				 * @param {string} msg optional message to display to user
				 * @param {string} cssClass optional css class to apply to the dialog window
				 * @param {mixed} backDrop optional flag that sets the dialog back drop
				 * @param {boolean} escKey optional flag to allow the esc key to close the modal
				 * @param {int} modalWidth optional value to set the modals width
				 * @param {int} modalHeight optional value to set the modals height
				 * @returns {*} an instance of $modal
				 * @memberOf DialogsService
				 */
				confirm : function(header, msg, cssClass, backDrop, escKey, modalWidth, modalHeight){
					if(arguments.length > 3){
						b = backDrop;
					}
					if(arguments.length > 4){
						k = escKey;
					}
					if(cssClass){
						w = cssClass;
					}
					return $modal.open({
						templateUrl : 'template/dialog/dialog-confirm.html',
						controller : 'ConfirmDialogController',
						backdrop: b,
						keyboard: k,
						windowClass: w,
						resolve : {
							header : function() { return angular.copy(header); },
							msg : function() { return angular.copy(msg); },
							modalWidth : function() { return angular.copy(modalWidth); },
							modalHeight : function() { return angular.copy(modalHeight); }
						}
					});
				},
				/**
				 * Creates a custom modal.
				 * @param {string} url Path to the modal template
				 * @param {string} ctrlr Controller to be injected into the dialog service
				 * @param {object} data optional data object to be passed into the resolve and accessible from the dialog service and the modal's controller
				 * @param {string} cssClass optional css class to apply to the dialog window
				 * @param {mixed} backDrop optional flag that sets the dialog back drop
				 * @param {boolean} escKey optional flag to allow the esc key to close the modal
				 * @returns {*} an instance of $modal
				 * @memberOf DialogsService
				 */
				create : function(url, ctrlr, data, cssClass, backDrop, escKey){
					if(arguments.length > 4){
						b = backDrop;
					}
					if(arguments.length > 5){
						k = escKey;
					}
					if(cssClass){
						w = cssClass;
					}
					return $modal.open({
						templateUrl : url,
						controller : ctrlr,
						keyboard : k,
						backdrop : b,
						windowClass: w,
						resolve : {
							data : function() {
								if(copy){
									console.log('copy is true');
									return angular.copy(data);
								}
								else
									return data;
							}
						}
					});
				}
			};
		}];
	}])

	.value("defaultStrings",{
		error: "Error",
		errorMessage: "An unknown error has occurred.",
		close: "Close",
		pleaseWait: "Please Wait",
		pleaseWaitEllipsis: "Please Wait...",
		pleaseWaitMessage: "Waiting on operation to complete.",
		percentComplete: "% Complete",
		notification: "Notification",
		notificationMessage: "Unknown application notification.",
		confirmation: "Confirmation",
		confirmationMessage: "Confirmation required.",
		ok: "OK",
		yes: "Yes",
		no: "No",
		cancel: "Cancel",
		saveReturn: "Save and Return"
	})

/**
 * Error Dialog Controller
 * @memberOf DialogsService
 */
	.controller('ErrorDialogController',['$scope','$modalInstance','header','msg','defaultStrings',function($scope,$modalInstance,header,msg,defaultStrings){


		$scope.header = (angular.isDefined(header)) ? header : defaultStrings.error;
		$scope.msg = (angular.isDefined(msg)) ? msg : defaultStrings.errorMessage;
		$scope.defaultStrings = defaultStrings;



		$scope.close = function(){
			$modalInstance.close();
			$scope.$destroy();
		};
	}])

/**
 * Notify Dialog Controller
 * @memberOf DialogsService
 */
	.controller('NotifyDialogController',['$scope','$modalInstance','header','msg','defaultStrings', 'modalWidth', 'modalHeight',function($scope,$modalInstance,header,msg,defaultStrings, modalWidth, modalHeight){


		$scope.header = (angular.isDefined(header)) ? header : defaultStrings.notification;
		$scope.msg = (angular.isDefined(msg)) ? msg : defaultString.notificationMessage;
		$scope.defaultStrings = defaultStrings;
		$scope.modalWidth = modalWidth || 450;
		$scope.modalHeight = modalHeight || 200;



		$scope.close = function(){
			$modalInstance.close();
			$scope.$destroy();
		};
	}])

/**
 * Confirm Dialog Controller
 * @memberOf DialogsService
 */
	.controller('ConfirmDialogController',['$scope','$modalInstance','header','msg','defaultStrings', 'modalWidth', 'modalHeight',function($scope,$modalInstance,header,msg,defaultStrings, modalWidth, modalHeight){


		$scope.header = (angular.isDefined(header)) ? header : defaultStrings.confirmation;
		$scope.msg = (angular.isDefined(msg)) ? msg : defaultStrings.confirmationMessage;
		$scope.defaultStrings = defaultStrings;
		$scope.modalWidth = modalWidth || 450;
		$scope.modalHeight = modalHeight || 200;



		$scope.no = function(){
			$modalInstance.dismiss('no');
		};

		$scope.yes = function(){
			$modalInstance.close('yes');
		};
	}]);

/**
 * Confirm modal template
 * @memberOf DialogsService
 */
angular.module("template/dialog/dialog-confirm.html", []).run(["$templateCache", function($templateCache) {
	$templateCache.put("template/dialog/dialog-confirm.html",
		'<div uid="confirm-modal" class="modal" cc-modal cc-height={{modalHeight}} cc-width={{modalWidth}}>' +
			'<div class="modal-confirm-header">' +
				'<button type="button" class="close" ng-click="no()">&times;</button>' +
				'<h3 class="modal-title">' +
					'<i class="fa fa-check-square-o"></i>{{ header }}' +
				'</h3>' +
			'</div>' +
			'<div class="modal-confirm-body">{{ msg }}</div>' +
			'<div class="modal-footer">' +
				'<button type="button" class="btn" ng-click="yes()">{{ defaultStrings.yes }}</button>' +
				'<button type="button" class="btn btn-inverse" ng-click="no()">{{ defaultStrings.no }}</button>' +
			'</div>' +
		'</div>');
}]);

/**
 * Error modal template
 * @memberOf DialogsService
 */
angular.module("template/dialog/dialog-error.html", []).run(["$templateCache", function($templateCache) {
	$templateCache.put("template/dialog/dialog-error.html",
			'<div class="modal-error-header">' +
				'<button type="button" class="close" ng-click="close()">&times;</button>' +
				'<h3 class="modal-title text-danger">' +
					'<i class="fa fa-warning"></i>' +
					'<span>{{ header }}</span>' +
				'</h3>' +
			'</div>' +
			'<div class="modal-confirm-body">{{ msg }}</div>' +
			'<div class="modal-footer">' +
				'<button type="button" class="btn" ng-click="yes()">{{ defaultStrings.yes }}</button>' +
				'<button type="button" class="btn btn-inverse" ng-click="no()">{{ defaultStrings.no }}</button>' +
			'</div>');
}]);

/**
 * Notify modal template
 * @memberOf DialogsService
 */
angular.module("template/dialog/dialog-notify.html", []).run(["$templateCache", function($templateCache) {
	$templateCache.put("template/dialog/dialog-notify.html",
			'<div uid="confirm-modal" class="modal" cc-modal cc-height={{modalHeight}} cc-width={{modalWidth}}>' +
				'<div class="modal-confirm-header">' +
					'<button type="button" class="close" ng-click="no()">&times;</button>' +
					'<h3 class="modal-title">' +
						'<i class="fa fa-warning"></i>{{ header }}' +
					'</h3>' +
				'</div>' +
				'<div class="modal-confirm-body">{{ msg }}</div>' +
				'<div class="modal-footer">' +
					'<button type="button" class="btn btn-inverse" ng-click="close()">{{ defaultStrings.ok }}</button>' +
				'</div>' +
			'</div>');
}]);


(function(){ 'use strict';

	angular.module('ram-utilities.ui.manage-columns',[])
	.directive('csManageColumns', function() {
		return {
			restrict: 'A, E',
			scope: {
				target: '@',
			},
			priority: -1000,
			template: '<button type="button" ng-click="" popover-title="{{popTitle}}" popover-placement="{{popPlacement}}" popover-template="'+
			'common/manage-columns.html'+
			'" class="btn" style="">'+
			'<i class="icon icon-th-list rotate90"></i> {{buttonText}}'+
			'</button>',
			link: function(scope, element, attr){
				// Let's assign the attributes to some scope variables
				scope.popPlacement = attr.popoverPlacement;
				scope.popTitle = attr.popoverTitle;
				scope.buttonText = attr.buttonText;

				// Grabbing all the header elements we can find.
				// We will only show the ones with a 'manage-columns-id'
				var headers = angular.element.find('th');

				scope.heads = [];

				// Meandering through the headers to populate an array of header objects
				for (var i=0; i < headers.length; i++){
					var thisHead = angular.element(headers[i]);
					scope.heads.push({id:i,title:thisHead.attr('manage-columns-id'),value:true,display:thisHead.css('display')});
				}

				// This is run whenever a checkbox value is changed
				scope.updateColumns = function(uid){

					var thisHeader = angular.element(headers[uid]);

					// If the value is true, we display the table head.
					// If the value is false, HIDE IT
					if (scope.heads[uid].value) thisHeader.css('display',scope.heads[uid].display);
					else thisHeader.css('display','none');

					// Looking for the table body and then gathering up all the rows
					var tbody = angular.element.find('tbody');
					var rows = angular.element(tbody).children('tr');

					// This iterates through the rows and hides/shows them depending on the state of their header.
					for (var i=0; i < rows.length; i++){
						var thisCell = angular.element(rows[i]).children('td').eq(uid);

						var thisCellDisplay = thisCell.css('display');
						if (scope.heads[uid].value) thisCell.css('display','');
						else thisCell.css('display','none');
					}
				};
			}		
		};
	});
})();

/**
 * Created by dschreiber on 12/26/2014.
 */



(function(window, document, undefined) {
	'use strict';

// Source: date-parser.js
	angular.module('ram-utilities.ui.helpers.dateParser', [])

		.provider('$dateParser', ["$localeProvider", function($localeProvider) {

			var proto = Date.prototype;

			function noop() {
			}

			function isNumeric(n) {
				return !isNaN(parseFloat(n)) && isFinite(n);
			}

			var defaults = this.defaults = {
				format: 'shortDate',
				strict: false
			};

			this.$get = ["$locale", "dateFilter", function($locale, dateFilter) {

				var DateParserFactory = function(config) {

					var options = angular.extend({}, defaults, config);

					var $dateParser = {};

					var regExpMap = {
						'sss'   : '[0-9]{3}',
						'ss'    : '[0-5][0-9]',
						's'     : options.strict ? '[1-5]?[0-9]' : '[0-9]|[0-5][0-9]',
						'mm'    : '[0-5][0-9]',
						'm'     : options.strict ? '[1-5]?[0-9]' : '[0-9]|[0-5][0-9]',
						'HH'    : '[01][0-9]|2[0-3]',
						'H'     : options.strict ? '1?[0-9]|2[0-3]' : '[01]?[0-9]|2[0-3]',
						'hh'    : '[0][1-9]|[1][012]',
						'h'     : options.strict ? '[1-9]|1[012]' : '0?[1-9]|1[012]',
						'a'     : 'AM|PM',
						'EEEE'  : $locale.DATETIME_FORMATS.DAY.join('|'),
						'EEE'   : $locale.DATETIME_FORMATS.SHORTDAY.join('|'),
						'dd'    : '0[1-9]|[12][0-9]|3[01]',
						'd'     : options.strict ? '[1-9]|[1-2][0-9]|3[01]' : '0?[1-9]|[1-2][0-9]|3[01]',
						'MMMM'  : $locale.DATETIME_FORMATS.MONTH.join('|'),
						'MMM'   : $locale.DATETIME_FORMATS.SHORTMONTH.join('|'),
						'MM'    : '0[1-9]|1[012]',
						'M'     : options.strict ? '[1-9]|1[012]' : '0?[1-9]|1[012]',
						'yyyy'  : '[1]{1}[0-9]{3}|[2]{1}[0-9]{3}',
						'yy'    : '[0-9]{2}',
						'y'     : options.strict ? '-?(0|[1-9][0-9]{0,3})' : '-?0*[0-9]{1,4}',
					};

					var setFnMap = {
						'sss'   : proto.setMilliseconds,
						'ss'    : proto.setSeconds,
						's'     : proto.setSeconds,
						'mm'    : proto.setMinutes,
						'm'     : proto.setMinutes,
						'HH'    : proto.setHours,
						'H'     : proto.setHours,
						'hh'    : proto.setHours,
						'h'     : proto.setHours,
						'EEEE'  : noop,
						'EEE'   : noop,
						'dd'    : proto.setDate,
						'd'     : proto.setDate,
						'a'     : function(value) { var hours = this.getHours(); return this.setHours(value.match(/pm/i) ? hours + 12 : hours); },
						'MMMM'  : function(value) { return this.setMonth($locale.DATETIME_FORMATS.MONTH.indexOf(value)); },
						'MMM'   : function(value) { return this.setMonth($locale.DATETIME_FORMATS.SHORTMONTH.indexOf(value)); },
						'MM'    : function(value) { return this.setMonth(1 * value - 1); },
						'M'     : function(value) { return this.setMonth(1 * value - 1); },
						'yyyy'  : proto.setFullYear,
						'yy'    : function(value) { return this.setFullYear(2000 + 1 * value); },
						'y'     : proto.setFullYear
					};

					var regex, setMap;

					$dateParser.init = function() {
						$dateParser.$format = $locale.DATETIME_FORMATS[options.format] || options.format;
						regex = regExpForFormat($dateParser.$format);
						setMap = setMapForFormat($dateParser.$format);
					};

					$dateParser.isValid = function(date) {
						if(angular.isDate(date)) return !isNaN(date.getTime());
						return regex.test(date);
					};

					$dateParser.parse = function(value, baseDate, format) {
						if(angular.isDate(value)) value = dateFilter(value, format || $dateParser.$format);
						var formatRegex = format ? regExpForFormat(format) : regex;
						var formatSetMap = format ? setMapForFormat(format) : setMap;
						var matches = formatRegex.exec(value);
						if(!matches) return false;
						var date = baseDate || new Date(0, 0, 1);
						for(var i = 0; i < matches.length - 1; i++) {
							formatSetMap[i] && formatSetMap[i].call(date, matches[i+1]);
						}
						return date;
					};

					// Private functions

					function setMapForFormat(format) {
						var keys = Object.keys(setFnMap), i;
						var map = [], sortedMap = [];
						// Map to setFn
						var clonedFormat = format;
						for(i = 0; i < keys.length; i++) {
							if(format.split(keys[i]).length > 1) {
								var index = clonedFormat.search(keys[i]);
								format = format.split(keys[i]).join('');
								if(setFnMap[keys[i]]) {
									map[index] = setFnMap[keys[i]];
								}
							}
						}
						// Sort result map
						angular.forEach(map, function(v) {
							// conditional required since angular.forEach broke around v1.2.21
							// related pr: https://github.com/angular/angular.js/pull/8525
							if(v) sortedMap.push(v);
						});
						return sortedMap;
					}

					function escapeReservedSymbols(text) {
						return text.replace(/\//g, '[\\/]').replace('/-/g', '[-]').replace(/\./g, '[.]').replace(/\\s/g, '[\\s]');
					}

					function regExpForFormat(format) {
						var keys = Object.keys(regExpMap), i;

						var re = format;
						// Abstract replaces to avoid collisions
						for(i = 0; i < keys.length; i++) {
							re = re.split(keys[i]).join('${' + i + '}');
						}
						// Replace abstracted values
						for(i = 0; i < keys.length; i++) {
							re = re.split('${' + i + '}').join('(' + regExpMap[keys[i]] + ')');
						}
						format = escapeReservedSymbols(format);

						return new RegExp('^' + re + '$', ['i']);
					}

					$dateParser.init();
					return $dateParser;

				};

				return DateParserFactory;

			}];

		}]);

// Source: debounce.js
	angular.module('ram-utilities.ui.helpers.debounce', [])


		.constant('debounce', function(func, wait, immediate) {
			var timeout, args, context, timestamp, result;
			return function() {
				context = this;
				args = arguments;
				timestamp = new Date();
				var later = function() {
					var last = (new Date()) - timestamp;
					if (last < wait) {
						timeout = setTimeout(later, wait - last);
					} else {
						timeout = null;
						if (!immediate) result = func.apply(context, args);
					}
				};
				var callNow = immediate && !timeout;
				if (!timeout) {
					timeout = setTimeout(later, wait);
				}
				if (callNow) result = func.apply(context, args);
				return result;
			};
		})



		.constant('throttle', function(func, wait, options) {
			var context, args, result;
			var timeout = null;
			var previous = 0;
			options || (options = {});
			var later = function() {
				previous = options.leading === false ? 0 : new Date();
				timeout = null;
				result = func.apply(context, args);
			};
			return function() {
				var now = new Date();
				if (!previous && options.leading === false) previous = now;
				var remaining = wait - (now - previous);
				context = this;
				args = arguments;
				if (remaining <= 0) {
					clearTimeout(timeout);
					timeout = null;
					previous = now;
					result = func.apply(context, args);
				} else if (!timeout && options.trailing !== false) {
					timeout = setTimeout(later, remaining);
				}
				return result;
			};
		});

// Source: dimensions.js
	angular.module('ram-utilities.ui.helpers.dimensions', [])

		.factory('dimensions', ["$document", "$window", function($document, $window) {

			var jqLite = angular.element;
			var fn = {};

			/**
			 * Test the element nodeName
			 * @param element
			 * @param name
			 */
			var nodeName = fn.nodeName = function(element, name) {
				return element.nodeName && element.nodeName.toLowerCase() === name.toLowerCase();
			};

			/**
			 * Returns the element computed style
			 * @param element
			 * @param prop
			 * @param extra
			 */
			fn.css = function(element, prop, extra) {
				var value;
				if (element.currentStyle) { //IE
					value = element.currentStyle[prop];
				} else if (window.getComputedStyle) {
					value = window.getComputedStyle(element)[prop];
				} else {
					value = element.style[prop];
				}
				return extra === true ? parseFloat(value) || 0 : value;
			};

			/**
			 * Provides read-only equivalent of jQuery's offset function:
			 * @required-by bootstrap-tooltip, bootstrap-affix
			 * @url http://api.jquery.com/offset/
			 * @param element
			 */
			fn.offset = function(element) {
				var boxRect = element.getBoundingClientRect();
				var docElement = element.ownerDocument;
				return {
					width: boxRect.width || element.offsetWidth,
					height: boxRect.height || element.offsetHeight,
					top: boxRect.top + (window.pageYOffset || docElement.documentElement.scrollTop) - (docElement.documentElement.clientTop || 0),
					left: boxRect.left + (window.pageXOffset || docElement.documentElement.scrollLeft) - (docElement.documentElement.clientLeft || 0)
				};
			};

			/**
			 * Provides read-only equivalent of jQuery's position function
			 * @required-by bootstrap-tooltip, bootstrap-affix
			 * @url http://api.jquery.com/offset/
			 * @param element
			 */
			fn.position = function(element) {

				var offsetParentRect = {top: 0, left: 0},
					offsetParentElement,
					offset;

				// Fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is it's only offset parent
				if (fn.css(element, 'position') === 'fixed') {

					// We assume that getBoundingClientRect is available when computed position is fixed
					offset = element.getBoundingClientRect();

				} else {

					// Get *real* offsetParentElement
					offsetParentElement = offsetParent(element);
					offset = fn.offset(element);

					// Get correct offsets
					offset = fn.offset(element);
					if (!nodeName(offsetParentElement, 'html')) {
						offsetParentRect = fn.offset(offsetParentElement);
					}

					// Add offsetParent borders
					offsetParentRect.top += fn.css(offsetParentElement, 'borderTopWidth', true);
					offsetParentRect.left += fn.css(offsetParentElement, 'borderLeftWidth', true);
				}

				// Subtract parent offsets and element margins
				return {
					width: element.offsetWidth,
					height: element.offsetHeight,
					top: offset.top - offsetParentRect.top - fn.css(element, 'marginTop', true),
					left: offset.left - offsetParentRect.left - fn.css(element, 'marginLeft', true)
				};

			};

			/**
			 * Returns the closest, non-statically positioned offsetParent of a given element
			 * @required-by fn.position
			 * @param element
			 */
			var offsetParent = function offsetParentElement(element) {
				var docElement = element.ownerDocument;
				var offsetParent = element.offsetParent || docElement;
				if(nodeName(offsetParent, '#document')) return docElement.documentElement;
				while(offsetParent && !nodeName(offsetParent, 'html') && fn.css(offsetParent, 'position') === 'static') {
					offsetParent = offsetParent.offsetParent;
				}
				return offsetParent || docElement.documentElement;
			};

			/**
			 * Provides equivalent of jQuery's height function
			 * @required-by bootstrap-affix
			 * @url http://api.jquery.com/height/
			 * @param element
			 * @param outer
			 */
			fn.height = function(element, outer) {
				var value = element.offsetHeight;
				if(outer) {
					value += fn.css(element, 'marginTop', true) + fn.css(element, 'marginBottom', true);
				} else {
					value -= fn.css(element, 'paddingTop', true) + fn.css(element, 'paddingBottom', true) + fn.css(element, 'borderTopWidth', true) + fn.css(element, 'borderBottomWidth', true);
				}
				return value;
			};

			/**
			 * Provides equivalent of jQuery's width function
			 * @required-by bootstrap-affix
			 * @url http://api.jquery.com/width/
			 * @param element
			 * @param outer
			 */
			fn.width = function(element, outer) {
				var value = element.offsetWidth;
				if(outer) {
					value += fn.css(element, 'marginLeft', true) + fn.css(element, 'marginRight', true);
				} else {
					value -= fn.css(element, 'paddingLeft', true) + fn.css(element, 'paddingRight', true) + fn.css(element, 'borderLeftWidth', true) + fn.css(element, 'borderRightWidth', true);
				}
				return value;
			};

			return fn;

		}]);

// Source: parse-options.js
	angular.module('ram-utilities.ui.helpers.parseOptions', [])

		.provider('$parseOptions', function() {

			var defaults = this.defaults = {
				regexp: /^\s*(.*?)(?:\s+as\s+(.*?))?(?:\s+group\s+by\s+(.*))?\s+for\s+(?:([\$\w][\$\w]*)|(?:\(\s*([\$\w][\$\w]*)\s*,\s*([\$\w][\$\w]*)\s*\)))\s+in\s+(.*?)(?:\s+track\s+by\s+(.*?))?$/
			};

			this.$get = ["$parse", "$q", function($parse, $q) {

				function ParseOptionsFactory(attr, config) {

					var $parseOptions = {};

					// Common vars
					var options = angular.extend({}, defaults, config);
					$parseOptions.$values = [];

					// Private vars
					var match, displayFn, valueName, keyName, groupByFn, valueFn, valuesFn;

					$parseOptions.init = function() {
						$parseOptions.$match = match = attr.match(options.regexp);
						displayFn = $parse(match[2] || match[1]),
							valueName = match[4] || match[6],
							keyName = match[5],
							groupByFn = $parse(match[3] || ''),
							valueFn = $parse(match[2] ? match[1] : valueName),
							valuesFn = $parse(match[7]);
					};

					$parseOptions.valuesFn = function(scope, controller) {
						return $q.when(valuesFn(scope, controller))
							.then(function(values) {
								$parseOptions.$values = values ? parseValues(values, scope) : {};
								return $parseOptions.$values;
							});
					};

					// Private functions

					function parseValues(values, scope) {
						return values.map(function(match, index) {
							var locals = {}, label, value;
							locals[valueName] = match;
							label = displayFn(scope, locals);
							value = valueFn(scope, locals) || index;
							return {label: label, value: value};
						});
					}

					$parseOptions.init();
					return $parseOptions;

				}

				return ParseOptionsFactory;

			}];

		});

// Source: raf.js
	(angular.version.minor < 3 && angular.version.dot < 14) && angular.module('ng')

		.factory('$$rAF', ["$window", "$timeout", function($window, $timeout) {

			var requestAnimationFrame = $window.requestAnimationFrame ||
				$window.webkitRequestAnimationFrame ||
				$window.mozRequestAnimationFrame;

			var cancelAnimationFrame = $window.cancelAnimationFrame ||
				$window.webkitCancelAnimationFrame ||
				$window.mozCancelAnimationFrame ||
				$window.webkitCancelRequestAnimationFrame;

			var rafSupported = !!requestAnimationFrame;
			var raf = rafSupported ?
				function(fn) {
					var id = requestAnimationFrame(fn);
					return function() {
						cancelAnimationFrame(id);
					};
				} :
				function(fn) {
					var timer = $timeout(fn, 16.66, false); // 1000 / 60 = 16.666
					return function() {
						$timeout.cancel(timer);
					};
				};

			raf.supported = rafSupported;

			return raf;

		}]);

// .factory('$$animateReflow', function($$rAF, $document) {

//   var bodyEl = $document[0].body;

//   return function(fn) {
//     //the returned function acts as the cancellation function
//     return $$rAF(function() {
//       //the line below will force the browser to perform a repaint
//       //so that all the animated elements within the animation frame
//       //will be properly updated and drawn on screen. This is
//       //required to perform multi-class CSS based animations with
//       //Firefox. DO NOT REMOVE THIS LINE.
//       var a = bodyEl.offsetWidth + 1;
//       fn();
//     });
//   };

// });


// Source: popover.js
	angular.module('ram-utilities.ui.popover', ['ram-utilities.ui.tooltip'])

		.provider('$ccPopover', function() {

			var defaults = this.defaults = {
				animation: 'am-fade',
				customClass: '',
				container: false,
				target: false,
				placement: 'right',
				template: 'ccPopover/ccPopover.tpl.html',
				contentTemplate: false,
				trigger: 'click',
				keyboard: true,
				html: false,
				title: '',
				content: '',
				delay: 0
			};

			this.$get = ["$ccTooltip", function($ccTooltip) {

				function PopoverFactory(element, config) {

					// Common vars
					var options = angular.extend({}, defaults, config);

					var $ccPopover = $ccTooltip(element, options);

					// Support scope as string options [/*title, */content]
					if(options.content) {
						$ccPopover.$scope.content = options.content;
					}

					return $ccPopover;

				}

				return PopoverFactory;

			}];

		})

		.directive('ccPopover', ["$window", "$sce", "$ccPopover", function($window, $sce, $ccPopover) {

			var requestAnimationFrame = $window.requestAnimationFrame || $window.setTimeout;

			return {
				restrict: 'EAC',
				scope: true,
				link: function postLink(scope, element, attr) {

					// Directive options
					var options = {scope: scope};
					angular.forEach(['template', 'contentTemplate', 'placement', 'container', 'target', 'delay', 'trigger', 'keyboard', 'html', 'animation', 'customClass'], function(key) {
						if(angular.isDefined(attr[key])) options[key] = attr[key];
					});

					// Support scope as data-attrs
					angular.forEach(['title', 'content'], function(key) {
						attr[key] && attr.$observe(key, function(newValue, oldValue) {
							scope[key] = $sce.trustAsHtml(newValue);
							angular.isDefined(oldValue) && requestAnimationFrame(function() {
								ccPopover && ccPopover.$applyPlacement();
							});
						});
					});

					// Support scope as an object
					attr.ccPopover && scope.$watch(attr.ccPopover, function(newValue, oldValue) {
						if(angular.isObject(newValue)) {
							angular.extend(scope, newValue);
						} else {
							scope.content = newValue;
						}
						angular.isDefined(oldValue) && requestAnimationFrame(function() {
							ccPopover && ccPopover.$applyPlacement();
						});
					}, true);

					// Visibility binding support
					attr.ccShow && scope.$watch(attr.ccShow, function(newValue, oldValue) {
						if(!ccPopover || !angular.isDefined(newValue)) return;
						if(angular.isString(newValue)) newValue = !!newValue.match(',?(ccPopover),?');
						newValue === true ? ccPopover.show() : ccPopover.hide();
					});

					// Initialize popover
					var ccPopover = $ccPopover(element, options);

					// Garbage collection
					scope.$on('$destroy', function() {
						if (ccPopover) ccPopover.destroy();
						options = null;
						ccPopover = null;
					});

				}
			};

		}]);



// Source: tooltip.js
	angular.module('ram-utilities.ui.tooltip', ['ram-utilities.ui.helpers.dimensions'])

		.provider('$ccTooltip', function() {

			var defaults = this.defaults = {
				animation: 'am-fade',
				customClass: '',
				prefixClass: 'ccTooltip',
				prefixEvent: 'ccTooltip',
				container: false,
				target: false,
				placement: 'top',
				template: 'ccTooltip/ccTooltip.tpl.html',
				contentTemplate: false,
				trigger: 'hover focus',
				keyboard: false,
				html: false,
				show: false,
				title: '',
				type: '',
				delay: 0
			};

			this.$get = ["$window", "$rootScope", "$compile", "$q", "$templateCache", "$http", "$animate", "dimensions", "$$rAF", function($window, $rootScope, $compile, $q, $templateCache, $http, $animate, dimensions, $$rAF) {

				var trim = String.prototype.trim;
				var isTouch = 'createTouch' in $window.document;
				var htmlReplaceRegExp = /ng-bind="/ig;

				function TooltipFactory(element, config) {

					var $ccTooltip = {};

					// Common vars
					var nodeName = element[0].nodeName.toLowerCase();
					var options = $ccTooltip.$options = angular.extend({}, defaults, config);
					$ccTooltip.$promise = fetchTemplate(options.template);
					var scope = $ccTooltip.$scope = options.scope && options.scope.$new() || $rootScope.$new();
					if(options.delay && angular.isString(options.delay)) {
						options.delay = parseFloat(options.delay);
					}

					// Support scope as string options
					if(options.title) {
						$ccTooltip.$scope.title = options.title;
					}

					// Provide scope helpers
					scope.$hide = function() {
						scope.$$postDigest(function() {
							$ccTooltip.hide();
						});
					};
					scope.$show = function() {
						scope.$$postDigest(function() {
							$ccTooltip.show();
						});
					};
					scope.$toggle = function() {
						scope.$$postDigest(function() {
							$ccTooltip.toggle();
						});
					};
					$ccTooltip.$isShown = scope.$isShown = false;

					// Private vars
					var timeout, hoverState;

					// Support contentTemplate option
					if(options.contentTemplate) {
						$ccTooltip.$promise = $ccTooltip.$promise.then(function(template) {
							var templateEl = angular.element(template);
							return fetchTemplate(options.contentTemplate)
								.then(function(contentTemplate) {
									var contentEl = findElement('[ng-bind="content"]', templateEl[0]);
									if(!contentEl.length) contentEl = findElement('[ng-bind="title"]', templateEl[0]);
									contentEl.removeAttr('ng-bind').html(contentTemplate);
									return templateEl[0].outerHTML;
								});
						});
					}

					// Fetch, compile then initialize tooltip
					var tipLinker, tipElement, tipTemplate, tipContainer;
					$ccTooltip.$promise.then(function(template) {
						if(angular.isObject(template)) template = template.data;
						if(options.html) template = template.replace(htmlReplaceRegExp, 'ng-bind-html="');
						template = trim.apply(template);
						tipTemplate = template;
						tipLinker = $compile(template);
						$ccTooltip.init();
					});

					$ccTooltip.init = function() {

						// Options: delay
						if (options.delay && angular.isNumber(options.delay)) {
							options.delay = {
								show: options.delay,
								hide: options.delay
							};
						}

						// Replace trigger on touch devices ?
						// if(isTouch && options.trigger === defaults.trigger) {
						//   options.trigger.replace(/hover/g, 'click');
						// }

						// Options : container
						if(options.container === 'self') {
							tipContainer = element;
						} else if(angular.isElement(options.container)) {
							tipContainer = options.container;
						} else if(options.container) {
							tipContainer = findElement(options.container);
						}

						// Options: trigger
						var triggers = options.trigger.split(' ');
						angular.forEach(triggers, function(trigger) {
							if(trigger === 'click') {
								element.on('click', $ccTooltip.toggle);
							} else if(trigger !== 'manual') {
								element.on(trigger === 'hover' ? 'mouseenter' : 'focus', $ccTooltip.enter);
								element.on(trigger === 'hover' ? 'mouseleave' : 'blur', $ccTooltip.leave);
								nodeName === 'button' && trigger !== 'hover' && element.on(isTouch ? 'touchstart' : 'mousedown', $ccTooltip.$onFocusElementMouseDown);
							}
						});

						// Options: target
						if(options.target) {
							options.target = angular.isElement(options.target) ? options.target : findElement(options.target);
						}

						// Options: show
						if(options.show) {
							scope.$$postDigest(function() {
								options.trigger === 'focus' ? element[0].focus() : $ccTooltip.show();
							});
						}

					};

					$ccTooltip.destroy = function() {

						// Unbind events
						var triggers = options.trigger.split(' ');
						for (var i = triggers.length; i--;) {
							var trigger = triggers[i];
							if(trigger === 'click') {
								element.off('click', $ccTooltip.toggle);
							} else if(trigger !== 'manual') {
								element.off(trigger === 'hover' ? 'mouseenter' : 'focus', $ccTooltip.enter);
								element.off(trigger === 'hover' ? 'mouseleave' : 'blur', $ccTooltip.leave);
								nodeName === 'button' && trigger !== 'hover' && element.off(isTouch ? 'touchstart' : 'mousedown', $ccTooltip.$onFocusElementMouseDown);
							}
						}

						// Remove element
						if(tipElement) {
							tipElement.remove();
							tipElement = null;
						}

						// Cancel pending callbacks
						clearTimeout(timeout);

						// Destroy scope
						scope.$destroy();

					};

					$ccTooltip.enter = function() {

						clearTimeout(timeout);
						hoverState = 'in';
						if (!options.delay || !options.delay.show) {
							return $ccTooltip.show();
						}

						timeout = setTimeout(function() {
							if (hoverState ==='in') $ccTooltip.show();
						}, options.delay.show);

					};

					$ccTooltip.show = function() {

						scope.$emit(options.prefixEvent + '.show.before', $ccTooltip);
						var parent = options.container ? tipContainer : null;
						var after = options.container ? null : element;

						// Hide any existing tipElement
						if(tipElement) tipElement.remove();
						// Fetch a cloned element linked from template
						tipElement = $ccTooltip.$element = tipLinker(scope, function(clonedElement, scope) {});

						// Set the initial positioning.  Make the tooltip invisible
						// so IE doesn't try to focus on it off screen.
						tipElement.css({top: '-9999px', left: '-9999px', display: 'block', visibility: 'hidden'}).addClass(options.placement);

						// Options: animation
						if(options.animation) tipElement.addClass(options.animation);
						// Options: type
						if(options.type) tipElement.addClass(options.prefixClass + '-' + options.type);
						// Options: custom classes
						if(options.customClass) tipElement.addClass(options.customClass);

						$animate.enter(tipElement, parent, after, function() {
							scope.$emit(options.prefixEvent + '.show', $ccTooltip);
						});
						$ccTooltip.$isShown = scope.$isShown = true;
						scope.$$phase || (scope.$root && scope.$root.$$phase) || scope.$digest();
						$$rAF(function () {
							$ccTooltip.$applyPlacement();

							// Once placed, make the tooltip visible
							tipElement.css({visibility: 'visible'});
						}); // var a = bodyEl.offsetWidth + 1; ?

						// Bind events
						if(options.keyboard) {
							if(options.trigger !== 'focus') {
								$ccTooltip.focus();
								tipElement.on('keyup', $ccTooltip.$onKeyUp);
							} else {
								element.on('keyup', $ccTooltip.$onFocusKeyUp);
							}
						}

					};

					$ccTooltip.leave = function() {

						clearTimeout(timeout);
						hoverState = 'out';
						if (!options.delay || !options.delay.hide) {
							return $ccTooltip.hide();
						}
						timeout = setTimeout(function () {
							if (hoverState === 'out') {
								$ccTooltip.hide();
							}
						}, options.delay.hide);

					};

					$ccTooltip.hide = function(blur) {

						if(!$ccTooltip.$isShown) return;
						scope.$emit(options.prefixEvent + '.hide.before', $ccTooltip);

						$animate.leave(tipElement, function() {
							scope.$emit(options.prefixEvent + '.hide', $ccTooltip);

							// Allow to blur the input when hidden, like when pressing enter key
							if(blur && options.trigger === 'focus') {
								return element[0].blur();
							}
						});

						$ccTooltip.$isShown = scope.$isShown = false;
						scope.$$phase || (scope.$root && scope.$root.$$phase) || scope.$digest();

						// Unbind events
						if(options.keyboard && tipElement !== null) {
							tipElement.off('keyup', $ccTooltip.$onKeyUp);
						}

					};

					$ccTooltip.toggle = function() {
						$ccTooltip.$isShown ? $ccTooltip.leave() : $ccTooltip.enter();
					};

					$ccTooltip.focus = function() {
						tipElement[0].focus();
					};

					// Protected methods

					$ccTooltip.$applyPlacement = function() {
						if(!tipElement) return;

						// Get the position of the tooltip element.
						var elementPosition = getPosition();

						// Get the height and width of the tooltip so we can center it.
						var tipWidth = tipElement.prop('offsetWidth'),
							tipHeight = tipElement.prop('offsetHeight');

						// Get the tooltip's top and left coordinates to center it with this directive.
						var tipPosition = getCalculatedOffset(options.placement, elementPosition, tipWidth, tipHeight);

						// Now set the calculated positioning.
						tipPosition.top += 'px';
						tipPosition.left += 'px';
						tipElement.css(tipPosition);

					};

					$ccTooltip.$onKeyUp = function(evt) {
						if (evt.which === 27 && $ccTooltip.$isShown) {
							$ccTooltip.hide();
							evt.stopPropagation();
						}
					};

					$ccTooltip.$onFocusKeyUp = function(evt) {
						if (evt.which === 27) {
							element[0].blur();
							evt.stopPropagation();
						}
					};

					$ccTooltip.$onFocusElementMouseDown = function(evt) {
						evt.preventDefault();
						evt.stopPropagation();
						// Some browsers do not auto-focus buttons (eg. Safari)
						$ccTooltip.$isShown ? element[0].blur() : element[0].focus();
					};

					// Private methods

					function getPosition() {
						if(options.container === 'body') {
							return dimensions.offset(options.target[0] || element[0]);
						} else {
							return dimensions.position(options.target[0] || element[0]);
						}
					}

					function getCalculatedOffset(placement, position, actualWidth, actualHeight) {
						var offset;
						var split = placement.split('-');

						switch (split[0]) {
							case 'right':
								offset = {
									top: position.top + position.height / 2 - actualHeight / 2,
									left: position.left + position.width
								};
								break;
							case 'bottom':
								offset = {
									top: position.top + position.height,
									left: position.left + position.width / 2 - actualWidth / 2
								};
								break;
							case 'left':
								offset = {
									top: position.top + position.height / 2 - actualHeight / 2,
									left: position.left - actualWidth
								};
								break;
							default:
								offset = {
									top: position.top - actualHeight,
									left: position.left + position.width / 2 - actualWidth / 2
								};
								break;
						}

						if(!split[1]) {
							return offset;
						}

						// Add support for corners @todo css
						if(split[0] === 'top' || split[0] === 'bottom') {
							switch (split[1]) {
								case 'left':
									offset.left = position.left;
									break;
								case 'right':
									offset.left =  position.left + position.width - actualWidth;
							}
						} else if(split[0] === 'left' || split[0] === 'right') {
							switch (split[1]) {
								case 'top':
									offset.top = position.top - actualHeight;
									break;
								case 'bottom':
									offset.top = position.top + position.height;
							}
						}

						return offset;
					}

					return $ccTooltip;

				}

				// Helper functions

				function findElement(query, element) {
					return angular.element((element || document).querySelectorAll(query));
				}

				function fetchTemplate(template) {
					return $q.when($templateCache.get(template) || $http.get(template))
						.then(function(res) {
							if(angular.isObject(res)) {
								$templateCache.put(template, res.data);
								return res.data;
							}
							return res;
						});
				}

				return TooltipFactory;

			}];

		})

		.directive('ccTooltip', ["$window", "$location", "$sce", "$ccTooltip", "$$rAF", function($window, $location, $sce, $ccTooltip, $$rAF) {

			return {
				restrict: 'EAC',
				scope: true,
				link: function postLink(scope, element, attr, transclusion) {

					// Directive options
					var options = {scope: scope};
					angular.forEach(['template', 'contentTemplate', 'placement', 'container', 'target', 'delay', 'trigger', 'keyboard', 'html', 'animation', 'type', 'customClass'], function(key) {
						if(angular.isDefined(attr[key])) options[key] = attr[key];
					});

					// Observe scope attributes for change
					angular.forEach(['title'], function(key) {
						attr.$observe(key, function(newValue, oldValue) {
							scope[key] = $sce.trustAsHtml(newValue);
							angular.isDefined(oldValue) && $$rAF(function() {
								tooltip && tooltip.$applyPlacement();
							});
						});
					});

					// Support scope as an object
					attr.ccTooltip && scope.$watch(attr.ccTooltip, function(newValue, oldValue) {
						if(angular.isObject(newValue)) {
							angular.extend(scope, newValue);
						} else {
							scope.title = newValue;
						}
						angular.isDefined(oldValue) && $$rAF(function() {
							tooltip && tooltip.$applyPlacement();
						});
					}, true);

					// Visibility binding support
					attr.ccShow && scope.$watch(attr.ccShow, function(newValue, oldValue) {
						if(!tooltip || !angular.isDefined(newValue)) return;
						if(angular.isString(newValue)) newValue = !!newValue.match(',?(tooltip),?');
						newValue === true ? tooltip.show() : tooltip.hide();
					});

					// Initialize popover
					var tooltip = $tooltip(element, options);

					// Garbage collection
					scope.$on('$destroy', function() {
						if(tooltip) tooltip.destroy();
						options = null;
						tooltip = null;
					});

				}
			};

		}]);



})(window, document);
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
/**
 * Created by dschreiber on 12/22/2014.
 */

(function(){ 'use strict';
//	angular.module('curaspan.ui.constants',[])
//		.constant('')

})();
/**
 * Created by dschreiber on 12/26/2014.
 */

(function(){
	'use strict';
	/**
	 *
	 * @classdesc The alert service allows for programmatic control of alert boxes.  This service works in conjunction with the
	 * Angular UI Bootstrap alert directive.
	 *
	 * @returns {{timeout: number, alerts: Array, autoCloseAlert: _autoCloseAlert, closeAlert: _closeAlert}}
	 * @constructor AlertService
	 */
	var AlertService = function($timeout){

		var _timeout = 10000;
		var _alerts = [];

		/**
		 * Auto-closes an alert by removing it from the list
		 * @param {index} int The alert message's index.
		 * @memberOf AlertService
		 * @function autoCloseAlert
		 */
		var _autoCloseAlert = function(index) {
			_alerts.splice(index, 1);
		};

		/**
		 * Function to be used by outside world to remove alert via the x button on the UI
		 * @param {index} int The alert message's index.
		 * @memberOf AlertService
		 * @function closeAlert
		 */
		var _closeAlert = function(index) {
			_alerts.splice(index, 1);
		};

		/**
		 * Displays a message to the user. Message color will be based on type specified - red for 'error', blue for 'info',
		 * yellow-orange for 'warn', green for 'success'. If persist is true, message will not auto-close
		 * @param {msg} string Alert message
		 * @param {msgType} string Valid options are error, info, warn, success
		 * @param {persist} boolean If true message will not auto-close
		 * @memberOf AlertService
		 * @function addAlert
		 */
		var _addAlert = function(msg, msgType, persist) {
			var alert = {msg: msg, type: msgType};
			_alerts.push(alert);

			if (!persist) {
				$timeout(function() {
					_autoCloseAlert(_alerts.indexOf(alert));
				}, _timeout);
			}
		};

		/**
		 * Displays an error message to the user
		 * @param {msg} string Message to display to user
		 * @param {persist} boolean If true, message will not auto-close
		 * @memberOf AlertService
		 * @function addErrorMessage
		 */
		var _addErrorMessage = function(msg, persist) {

			if (msg) {
				_addAlert(msg, 'error', persist);
			}
		};

		/**
		 * Displays a warning message to the user
		 * @param {msg} string Message to display to user
		 * @param {persist} boolean If true, message will not auto-close
		 * @memberOf AlertService
		 * @function addWarningMessage
		 */
		var _addWarningMessage = function(msg, persist) {
			if (msg) {
				_addAlert(msg, 'warn', persist);
			}
		};

		/**
		 * Displays a success message to the user
		 * @param {msg} string Message to display to user
		 * @param {persist} boolean If true, message will not auto-close
		 * @memberOf AlertService
		 * @function addSuccessMessage
		 */
		var _addSuccessMessage = function(msg, persist) {
			if (msg) {
				_addAlert(msg, 'success', persist);
			}
		};

		/**
		 * Returns the list of alert messages
		 * @returns {Array} List of alert messages
		 * @memberOf AlertService
		 * @function getAlerts
		 */
		var _getAlerts = function(){
			return _alerts;
		};

		return {
			timeout: _timeout,
			alerts: _alerts,
			autoCloseAlert: _autoCloseAlert,
			closeAlert: _closeAlert,
			addErrorMessage: _addErrorMessage,
			addWarningMessage: _addWarningMessage,
			addSuccessMessage: _addSuccessMessage,
			getAlerts: _getAlerts
		};
	};


	angular.module('ram-utilities.ui.alert.service', []).factory('AlertService', ['$timeout', AlertService]);
})();
/**
 * Created by dschreiber on 12/26/2014.
 */

(function(){
	'use strict';

	var BrowserSupportService = function($q, RestHelper, DialogsService){

		var _getBrowserStatus = function(name, version){
			var browserInfo = {
				name: name,
				version: version
			};
			var deferred = $q.defer();
			var successCb = function(data){
				DialogsService.notify('Browser Support', 'Browser name: ' + browserInfo.name + '    Browser version: ' + browserInfo.version);
				console.log(navigator.userAgent);
				deferred.resolve(data);
			};
			successCb('hello');
			return deferred.promise;
		};

		var _isIE8 = function(){
			if(this.browserInfo().name == 'Internet Explorer' && this.browserInfo().version == '8.0') {
				return true;
			}
			return false;

		};

		var _browserInfo = function(){
			var t = true;

			function detect(ua) {

				function getFirstMatch(regex) {
					var match = ua.match(regex);
					return (match && match.length > 1 && match[1]) || '';
				}

				var iosdevice = getFirstMatch(/(ipod|iphone|ipad)/i).toLowerCase(),
					likeAndroid = /like android/i.test(ua),
					android = !likeAndroid && /android/i.test(ua),
					versionIdentifier = getFirstMatch(/version\/(\d+(\.\d+)?)/i),
					tablet = /tablet/i.test(ua),
					mobile = !tablet && /[^-]mobi/i.test(ua),
					result;

				if (/opera|opr/i.test(ua)) {
					result = {
						name: 'Opera',
						opera: t,
						version: versionIdentifier || getFirstMatch(/(?:opera|opr)[\s\/](\d+(\.\d+)?)/i)
					};
				}
				else if (/windows phone/i.test(ua)) {
					result = {
						name: 'Windows Phone',
						windowsphone: t,
						msie: t,
						version: getFirstMatch(/iemobile\/(\d+(\.\d+)?)/i)
					};
				}
				else if (/msie|trident/i.test(ua)) {
					result = {
						name: 'Internet Explorer',
						msie: t,
						version: getFirstMatch(/(?:msie |rv:)(\d+(\.\d+)?)/i)
					};
				}
				else if (/chrome|crios|crmo/i.test(ua)) {
					result = {
						name: 'Chrome',
						chrome: t,
						version: getFirstMatch(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i)
					};
				}
				else if (iosdevice) {
					result = {
						name : iosdevice == 'iphone' ? 'iPhone' : iosdevice == 'ipad' ? 'iPad' : 'iPod'
					};
					// WTF: version is not part of user agent in web apps
					if (versionIdentifier) {
						result.version = versionIdentifier;
					}
				}
				else if (/sailfish/i.test(ua)) {
					result = {
						name: 'Sailfish',
						sailfish: t,
						version: getFirstMatch(/sailfish\s?browser\/(\d+(\.\d+)?)/i)
					};
				}
				else if (/seamonkey\//i.test(ua)) {
					result = {
						name: 'SeaMonkey',
						seamonkey: t,
						version: getFirstMatch(/seamonkey\/(\d+(\.\d+)?)/i)
					};
				}
				else if (/firefox|iceweasel/i.test(ua)) {
					result = {
						name: 'Firefox',
						firefox: t,
						version: getFirstMatch(/(?:firefox|iceweasel)[ \/](\d+(\.\d+)?)/i)
					};
					if (/\((mobile|tablet);[^\)]*rv:[\d\.]+\)/i.test(ua)) {
						result.firefoxos = t;
					}
				}
				else if (/silk/i.test(ua)) {
					result =  {
						name: 'Amazon Silk',
						silk: t,
						version : getFirstMatch(/silk\/(\d+(\.\d+)?)/i)
					};
				}
				else if (android) {
					result = {
						name: 'Android',
						version: versionIdentifier
					};
				}
				else if (/phantom/i.test(ua)) {
					result = {
						name: 'PhantomJS',
						phantom: t,
						version: getFirstMatch(/phantomjs\/(\d+(\.\d+)?)/i)
					};
				}
				else if (/blackberry|\bbb\d+/i.test(ua) || /rim\stablet/i.test(ua)) {
					result = {
						name: 'BlackBerry',
						blackberry: t,
						version: versionIdentifier || getFirstMatch(/blackberry[\d]+\/(\d+(\.\d+)?)/i)
					};
				}
				else if (/(web|hpw)os/i.test(ua)) {
					result = {
						name: 'WebOS',
						webos: t,
						version: versionIdentifier || getFirstMatch(/w(?:eb)?osbrowser\/(\d+(\.\d+)?)/i)
					};
					///touchpad\//i.test(ua) && (result.touchpad = t)
				}
				else if (/bada/i.test(ua)) {
					result = {
						name: 'Bada',
						bada: t,
						version: getFirstMatch(/dolfin\/(\d+(\.\d+)?)/i)
					};
				}
				else if (/tizen/i.test(ua)) {
					result = {
						name: 'Tizen',
						tizen: t,
						version: getFirstMatch(/(?:tizen\s?)?browser\/(\d+(\.\d+)?)/i) || versionIdentifier
					};
				}
				else if (/safari/i.test(ua)) {
					result = {
						name: 'Safari',
						safari: t,
						version: versionIdentifier
					};
				}
				else result = {};

				// set webkit or gecko flag for browsers based on these engines
				if (/(apple)?webkit/i.test(ua)) {
					result.name = result.name || "Webkit";
					result.webkit = t;
					if (!result.version && versionIdentifier) {
						result.version = versionIdentifier;
					}
				} else if (!result.opera && /gecko\//i.test(ua)) {
					result.name = result.name || "Gecko";
					result.gecko = t;
					result.version = result.version || getFirstMatch(/gecko\/(\d+(\.\d+)?)/i);
				}

				// set OS flags for platforms that have multiple browsers
				if (android || result.silk) {
					result.android = t;
				} else if (iosdevice) {
					result[iosdevice] = t;
					result.ios = t;
				}

				// OS version extraction
				var osVersion = '';
				if (iosdevice) {
					osVersion = getFirstMatch(/os (\d+([_\s]\d+)*) like mac os x/i);
					osVersion = osVersion.replace(/[_\s]/g, '.');
				} else if (android) {
					osVersion = getFirstMatch(/android[ \/-](\d+(\.\d+)*)/i);
				} else if (result.windowsphone) {
					osVersion = getFirstMatch(/windows phone (?:os)?\s?(\d+(\.\d+)*)/i);
				} else if (result.webos) {
					osVersion = getFirstMatch(/(?:web|hpw)os\/(\d+(\.\d+)*)/i);
				} else if (result.blackberry) {
					osVersion = getFirstMatch(/rim\stablet\sos\s(\d+(\.\d+)*)/i);
				} else if (result.bada) {
					osVersion = getFirstMatch(/bada\/(\d+(\.\d+)*)/i);
				} else if (result.tizen) {
					osVersion = getFirstMatch(/tizen[\/\s](\d+(\.\d+)*)/i);
				}
				if (osVersion) {
					result.osversion = osVersion;
				}

				// device type extraction
				var osMajorVersion = osVersion.split('.')[0];
				if (tablet || iosdevice == 'ipad' || (android && (osMajorVersion == 3 || (osMajorVersion == 4 && !mobile))) || result.silk) {
					result.tablet = t;
				} else if (mobile || iosdevice == 'iphone' || iosdevice == 'ipod' || android || result.blackberry || result.webos || result.bada) {
					result.mobile = t;
				}

				// Graded Browser Support
				// http://developer.yahoo.com/yui/articles/gbs
				if ((result.msie && result.version >= 10) ||
					(result.chrome && result.version >= 20) ||
					(result.firefox && result.version >= 20.0) ||
					(result.safari && result.version >= 6) ||
					(result.opera && result.version >= 10.0) ||
					(result.ios && result.osversion && result.osversion.split(".")[0] >= 6)
					) {
					result.a = t;
				}
				else if ((result.msie && result.version < 10) ||
					(result.chrome && result.version < 20) ||
					(result.firefox && result.version < 20.0) ||
					(result.safari && result.version < 6) ||
					(result.opera && result.version < 10.0) ||
					(result.ios && result.osversion && result.osversion.split(".")[0] < 6)
					) {
					result.c = t;
				} else result.x = t;

				return result;
			}

			var ccBrowserInfo = detect(typeof navigator !== 'undefined' ? navigator.userAgent : '');



			ccBrowserInfo._detect = detect;

			return ccBrowserInfo;
		};

		return {
			getBrowserStatus: _getBrowserStatus,
			isIE8: _isIE8,
			browserInfo: _browserInfo
		};
	};

	angular.module('ram-utilities.ui.browser-support.service', []).factory('BrowserSupportService', ['$q', 'RestHelper', 'DialogsService', BrowserSupportService]);
})();



/**
 * @author Danny Schreiber on 8/12/2014.
 */



(function(){ 'use strict';
	/**
	 * @constructor CacheService
	 * @classdesc The cache service is a wrapper for the sessionStorage object and allows for client side state management.
	 *
	 * @returns {{setItem: _setItem, getItem: _getItem, removeItem: _removeItem, Items: {UserInfo: {orgId: string, selectedOrg: string, userOrgs: string, userData: string, userId: string, browserSupportChecked: string}, Referrals: {selectedReferral: string, selectedStatus: string}, Profile: {loadedProfile: string, allClnServices: string, allNclnServices: string}, Reports: {selectedReport: string}, Codelists: {locList: string, allLists: string, declineReasons: string}, Documents: {showAddNewReferral: string}}, clearCache: _clearCache}}
	 *
	 */
	var CacheService = function(){

		/**
		 * Constants representing the available items in the cache.  This allows for using dot notation.
		 *
		 * @namespace
		 * @property {object} UserInfo - global user info
		 * @property {object} UserInfo.orgId - currently logged in users's org id
		 * @memberOf CacheService
		 */
		var _cacheItems = {
			UserInfo: {
				orgId: 'orgId',
				selectedOrg: 'selectedOrg',
				userOrgs: 'userOrgs',
				userData: 'userData',
				userId: 'userId',
				browserSupportChecked: 'browserSupportChecked'
			},
			Referrals: {
				selectedReferral: 'selectedReferral',
				selectedStatus: 'selectedStatus'
			},
			Profile: {
				loadedProfile: 'loadedProfile',
				allClnServices: 'clnServices',
				allNclnServices: 'nclnServices'
			},
			Reports: {
				selectedReport: 'selectedReport'
			},
			Codelists:{
				locList: 'locList',
				allLists: 'allLists',
				declineReasons: 'declineReasons'
			},
			Documents:{
				showAddNewReferral: 'showAddNewReferral'
			},
			TreeInfo: {
				selectedCustomerID: "selectedCustomerID",
				selectedFacilityID: "selectedFacilityID"
			},
			Internal: {
				userData: "internalUserData"
			},
			User: {
				userData: "userData"
			},
			Customer: {
				customerData: "customerData"
			}
		};

		/**
		 * Inserts an item into session storage object
		 * @param {key} string name
		 * @param {val} object value that will be stringified and stored
		 * @function setItem
		 * @memberOf CacheService
		 */
		var _setItem = function(key, val) {
			sessionStorage.setItem(key, JSON.stringify(val));
		};

		/**
		 * Retrieves an item from the cache
		 * @param {item} string name of the key
		 * @function getItem
		 * @memberOf CacheService
		 */
		var _getItem = function(item) {
			if(angular.fromJson){
				return angular.fromJson(sessionStorage.getItem(item));
			}
		};

		/**
		 * Removes an item from the cache
		 *
		 * @param {item} string name of the key
		 * @function removeItem
		 * @memberOf CacheService
		 */
		var _removeItem = function(item) {
			sessionStorage.removeItem(item);
		};

		/**
		 *Clears all data from the local sessionStorage object
		 *
		 * @function clearCache
		 * @memberOf CacheService
		 */
        var _clearCache = function(){
            sessionStorage.clear();
        };



		return {
			setItem: _setItem,
			getItem: _getItem,
			removeItem: _removeItem,
			Items: _cacheItems,
            clearCache: _clearCache
		};
	};

	angular.module('ram-utilities.ui.cache.service', []).factory('CacheService', [CacheService]);
})();
/**
 * Created by dschreiber on 12/23/2014.
 */

(function(){
	'use strict';
	var EventService = function($rootScope){
		var _destroyScope = function(scope, unsubscribe){
			scope.$on('$destroy', unsubscribe);
		};

		var _pub = function(name, message){
			$rootScope.$emit(name, message);
		};

		var _sub = function(scope, name, handler){
			var unsubscribe = $rootScope.$on(name, function(event, message){
				handler(message);
			});
			_destroyScope(scope, unsubscribe);
		};

		return {
			pub: _pub,
			sub: _sub
		};
	};


	angular.module('ram-utilities.ui.event-bus.service', []).factory('EventService', ['$rootScope', EventService]);
})();
/**
 * Created by dschreiber on 12/26/2014.
 */

(function(){
	'use strict';

	/**
	 * @classdesc Rest service is a collection of utility functions that wrap the Angular $http service and make REST calls easier to work with.
	 * @constructor RestService
	 */
	var RestService = function($http, $q, AlertService, $window, $location, $rootScope, EventService){

		var _sessionTimedOutFunction;

		/**
		 * Allows a function to be executed when a service call is returned with a 401 status
		 *
		 * @param {function} timedOutFn Function that gets executed when a 401 status is returned from an $http call
		 * @function configureSessionTimeOut
		 */
		var _configureSessionTimeOut = function(timedOutFn){
			_sessionTimedOutFunction = timedOutFn;
		};

		var _showSessionTimedOut = function() {
			if(_sessionTimedOutFunction && typeof _sessionTimedOutFunction === 'function'){
				_sessionTimedOutFunction();
			}
		};

		/**
		 * Utility function for constructing urls
		 * @param {string} url The url with parameter placeholders
		 * @param {array} argList List of url parameters
		 * @returns {*} string Url with parameters in place
		 * @memberOf RestService
		 * @function buildUrl
		 */
		var _buildUrl = function(url, argList) {

			var finalURL = url;
			if (argList || argList == []) {
				var replaceStr = "";
				for (var i = 0; i < argList.length; i++) {
					replaceStr = "{" + i + "}";
					finalURL = finalURL.replace(replaceStr, argList[i]);
				}
			}
			return finalURL;
		};

		/**
		 * Executes a http request with the given method, URL, and parameters. If successful, it will execute the successFunction. Otherwise it will display the errorMsg and execute the errorFunction (if defined)
		 *
		 * @param {string} method Service action type
		 * @param {string} url The URL with parameter placeholders
		 * @param {array} urlReplaceList List of URL parameters
		 * @param {array} params Map of strings or objects that will be turned into querystring parameters
		 * @param {function} successFunction Success callback
		 * @param {string} errorMsg Error message passed into error callback
		 * @param {function} errorFunction Error callback
		 * @param {object} config Optional configuration options
		 * @param {boolean} config.showLoader Allows a user to toggle a loading spinner if available.
		 * @memberOf RestService
		 * @private
		 */
		var _executeHttpRequest = function(method, url, urlReplaceList, params, successFunction,  errorMsg, errorFunction, config) {

			if(config && config.hasOwnProperty('showLoader')){
				$rootScope.showLoader = config.showLoader;
			}
			if (urlReplaceList) {
				url = _buildUrl(url, urlReplaceList);
			}

			$http({
				method: method,
				url: url,
				params: params,
				cache: false
			})
				.success(function(data, status, headers, config) {
					$rootScope.showLoader = false;
					if (successFunction === undefined) {
						_defaultSuccessFunction(data, status, headers, config);
					}
					else {
						successFunction(data, status, headers, config);
					}
				})
				.error(function (data, status, headers, config) {
					$rootScope.showLoader = false;
					if(status === 401){
						_showSessionTimedOut();
					}else if (status !== 0){
						_processError(data, status, headers, config, errorMsg, errorFunction);
					}
				});
		};

		var _defaultSuccessFunction = function(data, status, headers, config) {
			console.log("Successfully received data, no functionality defined to proccess it. ", data);
		};

		var _processError = function(data, status, headers, config, errorMsg, errorFunction) {

			if (errorMsg) {
				AlertService.addErrorMessage(errorMsg, true);
			}

			// TODO: log error here?

			if (errorFunction)
				errorFunction(data,status,headers,config);
		};

		/**
		 *HTTP.GET
		 *
		 * @param {string} url The URL with parameter placeholders
		 * @param {array} urlReplaceList List of URL parameters
		 * @param {array} params Map of strings or objects that will be turned into querystring parameters
		 * @param {function} successFunction Success callback
		 * @param {string} errorMsg Error message passed into error callback
		 * @param {function} errorFunction Error callback
		 * @param {object} config Optional configuration options
		 * @param {boolean} config.showLoader Allows a user to toggle a loading spinner if available.
		 * @memberOf RestService
		 * @function getData
		 */
		var _getData = function(url, urlReplaceList, params, successFunction, errorMsg, errorFunction, config) {

			_executeHttpRequest('GET', url, urlReplaceList, params, successFunction, errorMsg, errorFunction, config);
		};

		/**
		 *HTTP.PUT
		 *
		 * @param {string} url The URL with parameter placeholders
		 * @param {array} urlReplaceList List of URL parameters
		 * @param {array} params Map of strings or objects that will be turned into querystring parameters
		 * @param {function} successFunction Success callback
		 * @param {string} errorMsg Error message passed into error callback
		 * @param {function} errorFunction Error callback
		 * @param {object} config Optional configuration options
		 * @param {boolean} config.showLoader Allows a user to toggle a loading spinner if available.
		 * @memberOf RestService
		 * @function putData
		 */
		var _putData = function(url, urlReplaceList, params, successFunction, errorMsg, errorFunction, config) {

			_executeHttpRequest('PUT', url, urlReplaceList, params, successFunction, errorMsg, errorFunction, config);
		};

		/**
		 *HTTP.DELETE
		 *
		 * @param {string} url The URL with parameter placeholders
		 * @param {array} urlReplaceList List of URL parameters
		 * @param {array} params Map of strings or objects that will be turned into querystring parameters
		 * @param {function} successFunction Success callback
		 * @param {string} errorMsg Error message passed into error callback
		 * @param {function} errorFunction Error callback
		 * @param {object} config Optional configuration options
		 * @param {boolean} config.showLoader Allows a user to toggle a loading spinner if available.
		 * @memberOf RestService
		 * @function deleteData
		 */
		var _deleteData = function(url, urlReplaceList, params, successFunction,  errorMsg, errorFunction, config) {

			_executeHttpRequest('DELETE', url, urlReplaceList, params, successFunction,  errorMsg, errorFunction, config);
		};

		/**
		 *HTTP.PUT
		 *
		 * @param {string} url The URL with parameter placeholders
		 * @param {array} urlReplaceList List of URL parameters
		 * @param {array} params Map of strings or objects that will be turned into querystring parameters
		 * @param {object} data Data to be sent as the request message data
		 * @param {function} successFunction Success callback
		 * @param {string} errorMsg Error message passed into error callback
		 * @param {function} errorFunction Error callback
		 * @param {object} config Optional configuration options
		 * @param {boolean} config.showLoader Allows a user to toggle a loading spinner if available.
		 * @memberOf RestService
		 * @function putPostData
		 */
		var _putPostData = function(url, urlReplaceList, params, data, successFunction,  errorMsg, errorFunction, config) {
			if(config && config.hasOwnProperty('showLoader')){
				$rootScope.showLoader = config.showLoader;
			}

			if (urlReplaceList) {
				url = _buildUrl(url, urlReplaceList);
			}

			$http({
				method: 'PUT',
				url: url,
				params: params,
				data: data,
				cache: false
			})
				.success(function(postData, status, headers, config) {
					$rootScope.showLoader = false;
					if (successFunction === undefined) {
						_defaultSuccessFunction(data, status, headers, config);
					}
					else {
						successFunction({
							success: true,
							data: postData
						}, status, headers, config);
					}
				})
				.error(function (data, status, headers, config) {
					$rootScope.showLoader = false;
					if(status === 401){
						_showSessionTimedOut();
					}else if (status !== 0){
						_processError(data, status, headers, config, errorMsg, errorFunction);
					}
				});
		};

		/**
		 *HTTP.POST
		 *
		 * @param {string} url The URL with parameter placeholders
		 * @param {array} urlReplaceList List of URL parameters
		 * @param {array} params Map of strings or objects that will be turned into querystring parameters
		 * @param {object} data Data to be sent as the request message data
		 * @param {function} successFunction Success callback
		 * @param {string} errorMsg Error message passed into error callback
		 * @param {function} errorFunction Error callback
		 * @param {object} config Optional configuration options
		 * @param {boolean} config.showLoader Allows a user to toggle a loading spinner if available.
		 * @memberOf RestService
		 * @function postData
		 */
		var _postData = function(url, urlReplaceList, params, data, errorMsg, errorFunction, config) {

			var deferred = $q.defer();
			if(config && config.hasOwnProperty('showLoader')){
				$rootScope.showLoader = config.showLoader;
			}

			if (urlReplaceList) {
				url = _buildUrl(url, urlReplaceList);
			}

			$http({
				method: 'POST',
				url: url,
				params: params,
				data: data,
				cache: false
			})
				.success(function(postData, status, headers, config) {
					$rootScope.showLoader = false;
					deferred.resolve(postData);
				})
				.error(function (postData, status, headers, config) {
					$rootScope.showLoader = false;
					deferred.reject(postData);
				});
			return deferred.promise;
		};

		/**
		 *HTTP.POST
		 *
		 * @param {string} url The URL with parameter placeholders
		 * @param {array} urlReplaceList List of URL parameters
		 * @param {object} data Data to be sent as the request message data
		 * @param {object} headers Map of strings or functions which return strings representing HTTP headers to send to the server. If the return value of a function is null, the header will not be sent
		 * @param {function} transformRequest The transform function takes the http request body and headers and returns its transformed (typically serialized) version
		 * @param {function} successFunction Success callback
		 * @param {string} errorMsg Error message passed into error callback
		 * @param {function} errorFunction Error callback
		 * @param {object} config Optional configuration options
		 * @param {boolean} config.showLoader Allows a user to toggle a loading spinner if available.
		 * @memberOf RestService
		 * @function postData
		 */
		var _postDataWithHeaders = function(url, urlReplaceList, data, headers, transformRequest, successFunction,  errorMsg, errorFunction, config) {

			if(config && config.hasOwnProperty('showLoader')){
				$rootScope.showLoader = config.showLoader;
			}

			if (urlReplaceList) {
				url = _buildUrl(url, urlReplaceList);
			}

			$http({
				method: 'POST',
				url: url,
				data: data,
				headers: headers,
				transformRequest: transformRequest
			})
				.success(function(data, status, headers, config) {
					$rootScope.showLoader = false;
					if (successFunction === undefined) {
						_defaultSuccessFunction(data, status, headers, config);
					}
					else {
						successFunction(data, status, headers, config);
					}
				})
				.error(function (data, status, headers, config) {
					$rootScope.showLoader = false;
					if(status === 401){
						_showSessionTimedOut();
					}else if (status !== 0){
						_processError(data, status, headers, config, errorMsg, errorFunction);
					}
				});
		};

		return {
			getData: _getData,
			postData: _postData,
			putData: _putData,
			deleteData: _deleteData,
			putPostData: _putPostData,
			postDataWithHeaders: _postDataWithHeaders,
			configureSessionTimeOut: _configureSessionTimeOut
		};
	};


	angular.module('ram-utilities.ui.rest.service', ['ram-utilities.ui.alert.service', 'ram-utilities.ui.event-bus.service']).factory('RestService', ['$http', '$q', 'AlertService','$window','$location', '$rootScope', 'EventService', RestService]);
})();