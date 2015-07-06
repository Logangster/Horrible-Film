describe('RegistrationController', function () {
	
	beforeEach(module('horribleFilm'));
	beforeEach(inject(function(_$httpBackend_, User, _$location_, $controller) {
		$httpBackend = _$httpBackend_;
		$location = _$location_;
		RegistrationController = $controller('RegistrationCtrl', 
			{ DataService: User, $location: $location });
	}));
	
	it("Should create user and redirect", function () {
		//Mock http and setup controller
		$httpBackend.expect('POST', '/api/users/').respond({success: true});
		RegistrationController.newUser = {userName: 'testing'};
		
		//Spy on the location and make sure they are redirected
		spyOn($location, 'path');	
		RegistrationController.submitRegistration();
		$httpBackend.flush();
		expect($location.path).toHaveBeenCalledWith('/users/testing/edit/');
	}); 
	
	it("Should not create user and redirect when success is false", function () {
		//Mock http and setup controller
		$httpBackend.expect('POST', '/api/users/').respond({success: false});
		RegistrationController.newUser = {userName: 'testing'};
		
		//Spy on the location and make sure they are not redirected
		spyOn($location, 'path');	
		RegistrationController.submitRegistration();
		$httpBackend.flush();
		expect($location.path).not.toHaveBeenCalledWith('/api/users/');
		
	}); 
});