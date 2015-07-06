angular.module('horribleFilm')
.controller('RegistrationCtrl', ['User', '$location', '$http', 
	function(User, $location, $http) {
	
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
}]);