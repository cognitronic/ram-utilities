
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
