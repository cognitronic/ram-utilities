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