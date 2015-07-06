angular.module('horribleFilm')

.controller('UserCtrl', ['User', function(User) {
	
	var vm = this;
	
	//Retrive all users and set the users property
	function getUsers() {
		User.all().then(function(response) {
			vm.users = response.data;
		});
	}
	
	getUsers();
}]);