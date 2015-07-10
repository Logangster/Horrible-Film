angular.module('horribleFilm')

.factory('AuthToken', ['$window', function($window) {
	var authTokenFactory = {};
	
	authTokenFactory.getToken = function() {
		return $window.localStorage.getItem('token');
	};
	
	authTokenFactory.setToken = function(token) {
		if (token)
			$window.localStorage.setItem('token', token);
		else
			$window.localStorage.removeItem('token');
	};
	
	return authTokenFactory;
}])

.factory('Auth', ['$http', '$q', 'AuthToken', function ($http, $q, AuthToken) {
	var authFactory = {};
	
	authFactory.login = function(userName, password) {
		
		return $http.post('/api/authenticate', {
			userName: userName,
			password: password
		});
	};
	
	authFactory.logout = function() {
		AuthToken.setToken();
	};
	
	authFactory.isLoggedIn = function() {
		if (AuthToken.getToken())
			return true;
		else 
			return false;
	};
	
	authFactory.getUser = function() {
		if (AuthToken.getToken())
			return $http.get('/api/me');
		else
			return $q.reject({ message: 'Not logged in.'});
	};
	
	return authFactory;	
}])

.factory('AuthInterceptor', ['$q', '$location', 'AuthToken', function ($q, $location, AuthToken) {
	var interceptorFactory = {};
	
	interceptorFactory.request = function(config) {
		var token = AuthToken.getToken();
		
		if (token)
			config.headers['x-access-token'] = token;
			
		return config;
	};
	
	interceptorFactory.responseError = function(response) {

		if (response.status == 403)
			$location.path('/login');
		
		//Return errors as a promise
		return $q.reject(response);
	};
	
	return interceptorFactory;
	
}]);