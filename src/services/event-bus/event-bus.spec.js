/**
 * Created by dschreiber on 12/23/2014.
 */

describe('EventService', function() {
	var eventService;
	var scope;

	// Initialization of the AngularJS application before each test case
	beforeEach(module('ram-utilities.ui.event-bus.service'));

	// Injection of dependencies
	beforeEach(inject(function(_EventService_, _$rootScope_) {
		eventService = _EventService_;
		scope = _$rootScope_;
	}));

	it('should publish a new event, subscribe to it, and execute handler when called', function() {

		// publish event
		var testEvent = function(){
			eventService.pub('testEvent', {message: 'test success!'});
		};

		// subscribe to event
		eventService.sub(scope, 'testEvent', function(data){
			expect(data.message).toBe('test success!');
		});

		testEvent();
	});

});