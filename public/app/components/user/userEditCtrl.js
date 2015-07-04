angular.module('horribleFilm')
.controller('UserEditCtrl', function($routeParams, User) {
	
	var vm = this;

	User.get($routeParams.user_name).then(function(response) {
		vm.profile = response.data.Profile;
	});
	
});