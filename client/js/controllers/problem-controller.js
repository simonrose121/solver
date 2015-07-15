app.controller('problemController', ['$scope', '$http', function($scope, $http) {
	$scope.formData = {};
	$scope.solutionForm = {};

	$http.get('/api/problems').success(function(data) {
		$scope.problems = data;
        console.log(data);
	}).error(function(data) {
		console.log('Error: ' + data);
	});

	$scope.addProblem = function() {
		$http.post('/api/problems', $scope.formData).success(function(data) {
			$scope.formData = {};
			$scope.problems = data;
		}).error(function(data) {
			console.log('Error: ' + data);
		});
	};

	$scope.deleteProblem = function(id) {
		$http.delete('api/problems/' + id).success(function(data) {
			$scope.problems = data;
		}).error(function(data) {
			console.log('Error: ' + data);
		});
	}

	$scope.addSolution = function(id) {
		console.log(id);
		var submit = {
			"id": id,
			"solution": $scope.solutionForm.name
		};
		$http.post('api/solutions', submit).success(function(data) {
			$scope.solutionForm = {};
			$scope.problems = data;
		}).error(function(data) {
			console.log('Error: ' + data);
		});
	}
}]);