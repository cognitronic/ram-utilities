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