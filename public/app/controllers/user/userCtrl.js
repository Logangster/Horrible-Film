angular.module('horribleFilm')

.controller('UserCtrl', function(User) {
	
	var vm = this;
	
	//Retrive all users and set the users property
	User.all().then(function(response) {
		vm.users = response.data;
	});
	
});