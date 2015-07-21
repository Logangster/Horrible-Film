angular.module('horribleFilm').factory('Review', ['$http', function($http) {
	
	var reviewFactory = {};
	
	reviewFactory.all = function() {
		return $http.get('/api/reviews');
	};
	
	reviewFactory.create = function(reviewBody) {
		return $http.post('/api/reviews', reviewBody);
	}
	
	return reviewFactory;
	
}]);