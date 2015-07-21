angular.module('horribleFilm')

.config(function($routeProvider, $locationProvider) {
	$routeProvider
	
		.when('/', {
			templateUrl : 'app/components/page/home.html'
		})
		
		.when('/register', {
			templateUrl: 'app/components/page/register.html',
			controller: 'SessionCtrl',
			controllerAs: 'register'	
		})
		
		.when('/login', {
			templateUrl: 'app/components/page/login.html',
			controller: 'SessionCtrl',
			controllerAs: 'session'
		})
		
		// USER ROUTES
		// ===========================
		
		.when('/users', {
			templateUrl: 'app/components/user/index.html',
			controller: 'UserCtrl',
			controllerAs: 'user'
		})
		
		.when('/users/:user_name', {
			templateUrl: 'app/components/user/show.html',
			controller: 'UserShowCtrl',
			controllerAs: 'userShow'
		})
		
		.when('/users/:user_name/edit', {
			templateUrl: 'app/components/user/edit.html',
			controller: 'UserEditCtrl',
			controllerAs: 'userEdit'
		})
		
		// REVIEW ROUTES
		// =================================
		
		.when('/reviews', {
			templateUrl: 'app/components/review/index.html',
			controller: 'ReviewCtrl',
			controllerAs: 'review'
		})
		
		
	$locationProvider.html5Mode(true);
});