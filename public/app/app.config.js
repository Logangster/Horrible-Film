/*
 * Configures the app, NOTE: Must be included after all other files
 */
angular.module('horribleFilm')

.config(['$httpProvider', function($httpProvider) {
	
	$httpProvider.interceptors.push('AuthInterceptor');
	
}]);