angular.module('horribleFilm')

.controller('UserCtrl', ['User', 'socket', function(User, socket) {
	
	var vm = this;
	
	//Retrive all users and set the users property
	function getUsers() {
		User.all().then(function(response) {
			vm.users = response.data;
		});
	}
	
	getUsers();
	
	//If a new user event comes across, make sure to update the user list
	socket.on('user:new', function(user) {
		getUsers();
	});
	
}]);