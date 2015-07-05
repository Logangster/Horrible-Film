angular.module('horribleFilm')
.controller('UserEditCtrl', ['$routeParams', 'User', function($routeParams, User) {
	
	var vm = this;

	User.get($routeParams.user_name).then(function(response) {
		vm.profile = response.data.Profile;
	});
	
}]);