angular.module('horribleFilm').controller('ReviewCtrl', ['Review', function(Review) {
	
	var vm = this;
	
	function getReviews() {
		Review.all().then(function(response) {
			vm.reviews = response.data;
		});
	}
	
	getReviews();
	
}]);