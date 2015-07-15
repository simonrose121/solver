var schema = require('../models/schema');
var problemController = require('./problem-controller.js');

module.exports.add = function(req, res) {
	var solution = {
		name: req.body.solution,
		done: false
	}
	var update = { $push: { solutions: solution }};
	schema.problem.findByIdAndUpdate(req.body.id, update, {upsert: true}, function(err, result) {
		if (err)
			res.send(err);

		problemController.list(res, res);
	});
};