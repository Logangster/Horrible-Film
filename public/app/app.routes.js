angular.module('horribleFilm', ['ngRoute'])

.config(function($routeProvider, $locationProvider) {
	$routeProvider
	
		.when('/', {
			templateUrl : 'views/pages/home.html',
			controller: 'MainCtrl',
			controllerAs: 'main'
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