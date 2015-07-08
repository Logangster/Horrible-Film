angular.module('horribleFilm')

.factory('AuthToken', function($window) {
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
})

.factory('Auth', function ($http, $q, AuthToken) {
	var authFactory = {};
	
	authFactory.login = function(userName, password) {
		return $http.post('/api/authenticate', {
			userName: userName,
			password: password
		})
		.then(function(response) {
			AuthToken.setToken(response.data.token);
			return response.data;
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
	
	return authFactory;	
})

.factory('AuthInterceptor', function ($q, $location, AuthToken) {
	var interceptorFactory = {};
	
	interceptorFactory.request = function(config) {
		var token = AuthToken.getToken();
		
		if (token)
			config.headers['x-access-token'] = token;
			
		return config;
	};
	
	interceptorFactory.responseError = function(response) {
		console.log('Hey it worked');
		if (response.status == 403)
			$location.path('/login');
		
		//Return errors as a promise
		return $q.reject(response);
	};
	
	return interceptorFactory;
	
});