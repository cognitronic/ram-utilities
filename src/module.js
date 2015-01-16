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