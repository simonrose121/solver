var schema = require('../models/schema');
var problemController = require('./problem-controller.js');

module.exports.add = function(req, res) {
	var solution = {
		name: req.body.solution,
		done: false
	};
	var update = { $push: { solutions: solution }};
	schema.problem.findByIdAndUpdate(req.body.id, update, {upsert: true}, function(err, result) {
		if (err)
			res.send(err);

		problemController.list(req, res);
	});
};

module.exports.update = function(req, res) {
	schema.problem.findById(req.body.problemId, function(err, result) {
		if (err)
			res.send(err);

		var solution = result.solutions.id(req.body.solutionId);
		solution.done = req.body.done;

		result.save(function(err) {
			if (err)
				res.send(err);

			problemController.list(req, res);
		})
	});
}