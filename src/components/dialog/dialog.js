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
