angular.module('horribleFilm')
.controller('SessionCtrl', ['User', 'Auth', '$location', '$http', 'AuthToken',
	function(User, Auth, $location, $http, AuthToken) {
	
	var vm = this;

	vm.newUser = {};
	
	vm.submitRegistration = function () {
		
		//Create user and then check if it was successful and redirect 
		User.create(vm.newUser)
		.then(function(response) {
			if (response.data.success !== false) {
				$location.path('/users/' + vm.newUser.userName + '/edit/');
			}

		});
	};
	
	vm.login = function() {	
		//Eventually redirect user to the page they were previously trying to access

			Auth.login(vm.userName, vm.password).then(function (response) {
				if (response.data.success == true) {
					AuthToken.setToken(response.data.token);
					$location.path('/users');
				}
			});	
	};
	
}]);