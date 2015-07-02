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
		});
		
	$locationProvider.html5Mode(true);
});