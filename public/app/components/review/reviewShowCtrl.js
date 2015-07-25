angular.module('horribleFilm').controller('ReviewShowCtrl', ['Review', '$routeParams', function(Review, $routeParams) {
	
	var vm = this;
	
	Review.get($routeParams.id).then(function(response) {
		console.log(response.data);
		vm.review = response.data;
	})
	
}]);