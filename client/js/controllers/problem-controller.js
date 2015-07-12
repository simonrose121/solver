app.controller('problemController', ['$scope', '$resource', function($scope, $resource) {
	var Problems = $resource('api/problems');

	Problems.query(function (results) {
		$scope.problems = results;
	});

	$scope.problems = [];

	$scope.addProblem = function() {
		var problem = new Problems();
		problem.name = $scope.problemName;
		problem.$save(function(result) {
			$scope.problems.push(result);
			$scope.problemName = "";
		});
	};

	$scope.addSolution = function(problem, solution) {
		problem.$save(function(solution) {
			problem.solutions.push(solution);
			$scope.problems.solutionName = "";
		});
	};
}]);