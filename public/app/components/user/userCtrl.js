angular.module('horribleFilm')

.controller('UserCtrl', ['User', '$scope', function(User, $scope) {
	
	var vm = this;
	
	//Retrive all users and set the users property
	function getUsers() {
		User.all().then(function(response) {
			$scope.users = response.data;
		});
	}
	
	getUsers();
}]);