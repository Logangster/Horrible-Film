angular.module('horribleFilm').controller('MainCtrl', function(Auth, $rootScope, $location) {
	var vm = this;
	
	//Mock for now until authentication is in place!
	vm.loggedIn = Auth.isLoggedIn();
	
	$rootScope.$on('$routeChangeStart', function() {
		vm.loggedIn = Auth.isLoggedIn();
		
		Auth.getUser().then(function(response) {
			vm.userName = response.data.userName;
		}, function(err) {
			vm.userName = undefined;
		});
	});
	
	vm.logout = function () {
		Auth.logout();
		$location.path('/');
	};
	
});