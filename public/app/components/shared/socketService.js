angular.module('horribleFilm')

//Using https://github.com/btford/angular-socket-io socket service
.service('socket', ['socketFactory', function(socketFactory) {
	return socketFactory();
}]);