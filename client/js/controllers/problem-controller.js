app.controller('problemController', ['$scope', '$resource', function($scope, $resource) {
	var ProblemAPI = $resource('api/problems/');
	var SolutionAPI = $resource('api/solutions/');
	var problems = new ProblemAPI();
	var solutions = new SolutionAPI();

	ProblemAPI.query(function (results) {
		$scope.problems = results;
	});

	$scope.problems = [];

	$scope.addProblem = function() {
		problems.name = $scope.problemName;
		problems.$save(function(result) {
			$scope.problems.push(result);
			$scope.problemName = "";
		});
	};

	$scope.deleteProblem = function(problem) {
		problems.$delete(function(result) {
			$scope.problems.splice(result, 1);
		});
	}

	$scope.addSolution = function(problem, solution) {
		console.log(problem)
		problems.$save(function(result) {
			$scope.solutionName = "";
			problem.solutions.push(solution);
		});
	};
}]);