/**
 * Created by dschreiber on 12/26/2014.
 */

xdescribe('RestService', function() {
	var restService;
	var $httpBackend;
	var url = 'http://ram-utilities.com/{0}/test/{1}';
	var argList = ['jasmine', 2015];

	// Initialization of the AngularJS application before each test case
	beforeEach(module('ram-utilities.ui.rest.service'));

	// Injection of dependencies
	beforeEach(inject(function(_RestService_, _$httpBackend_) {
		restService = _RestService_;
		$httpBackend = _$httpBackend_;
	}));

	afterEach(function() {
		$httpBackend.verifyNoOutstandingExpectation();
		$httpBackend.verifyNoOutstandingRequest();
	});

	it('should send an HTTP GET request', function(){
		$httpBackend.expectGET('http://ram-utilities.com/jasmine/test/2015')
			.respond(200, {message: 'GET Successful', id: 0});

		restService.getData(url, argList, null, {})
			.then(function(data){
				expect(data).toBeTruthy();
				expect(data.message).toBe('GET Successful');
		});
		$httpBackend.flush();
	});

	it('should send an HTTP POST request', function(){
		$httpBackend.expectPOST('http://ram-utilities.com/jasmine/test/2015', {data: 'Test POST'})
			.respond(200, {message: 'POST Successful', id: 0});


		restService.postData(url, argList, null, {data: 'Test POST'}, {})
			.then(function(response){
				expect(response).toBeTruthy();
				expect(response.success).toBe(true);
			});
		$httpBackend.flush();
	});

	it('should execute the function passed into configureSessionTimeOut', function(){
		$httpBackend.expectGET('http://ram-utilities.com/jasmine/test/2015')
			.respond(401, {message: 'timed out', id: 0});

		// setup the conditions to be tested
		var testResult = '';
		var testFn = function(){
			testResult = 'session did time out';
		};
		restService.configureSessionTimeOut(testFn);

		restService.getData(url, argList, null, null, null, null, null);

		$httpBackend.flush();

		expect(testResult).toBe('session did time out');
	});

});