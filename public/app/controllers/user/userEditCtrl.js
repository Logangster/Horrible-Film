angular.module('horribleFilm')
.controller('UserEditCtrl', function($routeParams, User) {
	
	var vm = this;
	
	vm.profile = {aboutMe: 'testestset'};
	
	User.get($routeParams.user_name).then(function(response) {
		vm.profile = response.data.Profile;
	});
	
});