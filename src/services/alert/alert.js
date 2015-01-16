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