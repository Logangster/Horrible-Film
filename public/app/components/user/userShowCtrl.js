angular.module('horribleFilm')

.controller('UserShowCtrl', ['$routeParams', 'User', function($routeParams, User) {
	
	var vm = this;
	
	User.get($routeParams.user_name).then(function(response) {
		vm.user = response.data;
	});
}]);