var Problem = require('../models/problem');

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
	Problem.find({problem.id = req.id}, function(err, result) {
		res.json(result);
	});
}