angular.module('horribleFilm').controller('MainCtrl', ['Auth', '$rootScope', '$location', '$window',
	function(Auth, $rootScope, $location, $window) {
	
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
	
	vm.logout = function ($event) {
		$event.preventDefault();
		Auth.logout();
		$location.path('/');
	};
}]);