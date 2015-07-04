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
		
		// USER ROUTES
		// ===========================
		
		.when('/users', {
			templateUrl: 'views/users/index.html',
			controller: 'UserCtrl',
			controllerAs: 'user'
		})
		
		.when('/users/:user_name', {
			templateUrl: 'views/users/show.html',
			controller: 'UserShowCtrl',
			controllerAs: 'userShow'
		})
		
		.when('/users/:user_name/edit', {
			templateUrl: 'views/users/edit.html',
			controller: 'UserEditCtrl',
			controllerAs: 'userEdit'
		});
		
	$locationProvider.html5Mode(true);
});