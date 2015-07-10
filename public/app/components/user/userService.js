angular.module('horribleFilm')

.factory('User', ['$http', function($http) {
	
	var userFactory = {};
	
	//Get all users
	userFactory.all = function() {
		return $http.get('/api/users/');
	};
	
	//Get single user
	userFactory.get = function(userName) {
		return $http.get('/api/users/' + userName);	
	};
	
	//Create user
	userFactory.create = function(user) {
		return $http.post('/api/users/', user);
	};
	
	userFactory.updateProfile = function(userName, profile) {
		return $http.put('/api/users/' + userName, profile);
	}
	
	return userFactory;
}]);