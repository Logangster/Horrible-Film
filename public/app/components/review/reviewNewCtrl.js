angular.module('horribleFilm').controller('ReviewNewCtrl', ['Review', 'Flash', '$location',
	
function(Review, Flash, $location) {
	
	var vm = this;
	
	vm.createReview = function() {
		Review.create(vm.newReview).then(function(response) {
			if (response.data.success !== false) {
				Flash.create('success', 'Review has successfully been created!', 'custom-class');
				$location.path('/reviews/' + response.data.id);
			} else {
				Flash.create('danger', 'One or more errors exist.', 'custom-class');
			}
		});
	}
}]);