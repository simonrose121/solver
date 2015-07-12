var Problem = require('../models/problem');
var Solution = require('../models/solution');

module.exports.create = function(req, res) {
	var problem = new Problem(req.body);
	problem.save(function(err, result) {
		res.json(result);
	});
}

module.exports.list = function(req, res) {
	Problem.find({}, function(err, result) {
		res.json(result);
	});
}

module.exports.addSolution = function(req, res) {
	var solution = new Solution();
	solution.name = req.body;
	var update = { $push: { solutions : req.solution } };
	Problem.findByIdAndUpdate(req.id, update, {upsert: true}, function(err) {
		res.json(result);
	});
}