angular.module('horribleFilm')
.controller('SessionCtrl', ['User', 'Auth', '$location', '$http', 'AuthToken', 'Flash', '$window', 'socket',
	function(User, Auth, $location, $http, AuthToken, Flash, $window, socket) {
	
	var vm = this;

	vm.newUser = {};
	
	vm.submitRegistration = function () {
		
		//Create user and then check if it was successful and redirect 
		User.create(vm.newUser)
		.then(function(response) {
			//If user creation was successful, create a flash message and redirect
			if (response.data.success !== false) {
				//Emit new user event so that the user list may update in real time
				socket.emit('user:new', response.data);
				Flash.create('success', 'User has been successfully created! Login and edit your profile now!!!', 'custom-class');
				$location.path('/users/' + vm.newUser.userName + '/edit/');
			} else {
				Flash.create('danger', 'One or more errors exist.', 'custom-class');
			}

		});
	};
	
	vm.login = function() {	
		//Eventually redirect user to the page they were previously trying to access

			Auth.login(vm.userName, vm.password).then(function (response) {
				//If login was successful, log them in and create a flash message for the user to see
				if (response.data.success == true) {
					Flash.create('success', 'You have been successfully logged in!', 'custom-class');
					AuthToken.setToken(response.data.token);
					
					//Temporary solution to redirect upon login to the path they were trying to access before
					var path = $window.localStorage.getItem('redirectPath');
					if (path) {
					  $window.localStorage.removeItem('redirectPath');
						$location.path(path);
					} else {
						$location.path('/');
					}
					
				} else {
					Flash.create('danger', 'Wrong username/password combination.', 'custom-class');
				}
			});	
	};
	
}]);