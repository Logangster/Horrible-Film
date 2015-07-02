angular.module('horribleFilm')

.factory('User', function($http) {
	
	var userFactory = {};
	
	//Get all users
	userFactory.all = function() {
		return $http.get('/api/users/');
	};
	
	//Get single user
	userFactory.get = function(userName) {
		return $http.get('/api/users/' + userName);	
	};
	
	return userFactory;
});