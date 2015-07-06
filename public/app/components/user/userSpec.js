// INDEX USER CONTROLLER
// =========================
describe('Main Index User Controller', function () {
	
	beforeEach(module('horribleFilm'));
	beforeEach(inject(function (User, _$httpBackend_) {
		service = User;
		$httpBackend = _$httpBackend_;
	}));
		
	it("Retrieves all the users", inject(function ($controller) {
		
		//Mock retrieving all users and create controller
		$httpBackend.expect('GET', '/api/users/').respond([{userName: 'test'}, {userName: 'test2'}]);
		UserController = $controller('UserCtrl', { DataService: service});
		
		//Make sure that all users were returned
		$httpBackend.flush();
		expect(UserController.users).toEqual([{userName: 'test'}, {userName: 'test2'}]);
	}));

});

// USER SHOW CONTROLLER
// ========================
describe("User Show Controller", function() {
	
	beforeEach(module('horribleFilm'));
	beforeEach(inject(function (User, _$httpBackend_) {
		service = User;
		$httpBackend = _$httpBackend_;
	}));
		
	it("Retrieves single user based on username", inject(function($controller) {
		
		//Mock getting users and create controller
		$httpBackend.expect('GET', '/api/users/testing').respond({userName: 'testing'});
		UserShowController = $controller('UserShowCtrl', { DataService: service, 
		$routeParams: {'user_name': 'testing'}});
		
		//Make sure the user has been returned
		$httpBackend.flush();
		expect(UserShowController.user).toEqual({ userName: 'testing' });
	}));
		
});
