var Problem = require('../models/problem');
var Solution = require('../models/solution');

module.exports.create = function(req, res) {
	var problem = new Problem(req.body);
	problem.save(function(err, result) {
		res.json(result);
		console.log(result);
	});
}

module.exports.list = function(req, res) {
	Problem.find({}, function(err, result) {
		res.json(result);
	});
}

module.exports.addSolution = function(req, res) {
	var solution = new Solution();
	solution.name = req.body.solutions[0];
	console.log(solution);
	var update = { $push: { solutions: solution } };
	console.log(req.body._id);
	Problem.findByIdAndUpdate(req.body._id, update, {upsert: true}, function(err, result) {
		console.log(err);
		res.json(result);
		console.log(result);
	});
}