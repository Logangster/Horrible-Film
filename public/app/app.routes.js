angular.module('horribleFilm', ['ngRoute'])

.config(function($routeProvider, $locationProvider) {
	$routeProvider
	
		.when('/', {
			templateUrl : 'views/pages/home.html'
		})
		
		.when('/register', {
			templateUrl: 'views/pages/register.html',
			controller: 'RegistrationCtrl',
			controllerAs: 'register'	
		})
		
		.when('/users', {
			templateUrl: 'views/users/index.html',
			controller: 'UserCtrl',
			controllerAs: 'user'
		})
		
		.when('/users/:user_name', {
			templateUrl: 'views/users/show.html',
			controller: 'UserShowCtrl',
			controllerAs: 'userShow'
		});
		
	$locationProvider.html5Mode(true);
});