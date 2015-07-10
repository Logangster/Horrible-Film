describe('SessionController', function () {
	
	beforeEach(module('horribleFilm'));
	beforeEach(inject(function(_$httpBackend_, User, _$location_, $controller, Auth) {
		$httpBackend = _$httpBackend_;
		$location = _$location_;
		SessionController = $controller('SessionCtrl', 
			{ $location: $location });
	}));
	
	it("Should create user and redirect", function () {
		//Mock http and setup controller
		$httpBackend.expect('POST', '/api/users/').respond({success: true});
		SessionController.newUser = {userName: 'testing'};
		
		//Spy on the location and make sure they are redirected
		spyOn($location, 'path');	
		SessionController.submitRegistration();
		$httpBackend.flush();
		expect($location.path).toHaveBeenCalledWith('/users/testing/edit/');
	}); 
	
	it("Should not create user and redirect when success is false", function () {
		//Mock http and setup controller
		$httpBackend.expect('POST', '/api/users/').respond({success: false});
		SessionController.newUser = {userName: 'testing'};
		
		//Spy on the location and make sure they are not redirected
		spyOn($location, 'path');	
		SessionController.submitRegistration();
		$httpBackend.flush();
		expect($location.path).not.toHaveBeenCalledWith('/api/users/');
		
	}); 
	
	it("Should log in with proper credentials", function () {
		$httpBackend.expect('POST', '/api/authenticate').respond({success: true});
		
		SessionController.userName = "testing";
		SessionController.password = "thisout";
		
		spyOn($location, 'path');
		SessionController.login();
		$httpBackend.flush();
		expect($location.path).toHaveBeenCalledWith('/users');
	});
});