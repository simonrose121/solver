app.controller('problemController', ['$scope', '$resource', function($scope, $resource) {
	var Problems = $resource('api/problems/');
	var AddProblem = $resource('api/problems/add');
	var AddSolution = $resource('api/problems/addSolution');

	Problems.query(function (results) {
		console.log(results);
		$scope.problems = results;
	});

	$scope.problems = [];

	$scope.addProblem = function() {
		var problem = new AddProblem();
		problem.name = $scope.problemName;
		problem.$save(function(result) {
			$scope.problems.push(result);
			$scope.problemName = "";
		});
	};

	$scope.addSolution = function(problem, solution) {
		var problem = new AddSolution(problem);
		problem.solutions.push(solution);
		problem.$save(function() {
			$scope.solutionName = "";
		});
	};
}]);