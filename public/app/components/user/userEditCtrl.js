angular.module('horribleFilm')
.controller('UserEditCtrl', ['$routeParams', 'User', '$location', function($routeParams, User, $location) {
	
	var vm = this;

	User.get($routeParams.user_name).then(function(response) {
		vm.profile = response.data.Profile;
	});
	
	vm.updateProfile = function() {
		User.updateProfile($routeParams.user_name, vm.profile).then(function(response) {
			$location.path('/users/' + $routeParams.user_name);
		});
	};
	
}]);