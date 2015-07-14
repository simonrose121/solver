var Problem = require('../models/problem');

module.exports.create = function(req, res) {
	Problem.create({name: req.body.name, done: false}, function(err, result) {
		if (err)
			res.send(err);

		// return all problems
		Problem.find({}, function(err, result) {
			if (err) {
				res.send(err);
			}
			res.json(result);
		});
	});
};

module.exports.delete = function(req, res) {
	Problem.remove({_id: req.params.id}, function(err, result) {
		if (err)
			res.send(err);

		// return all problems
		Problem.find({}, function(err, result) {
			if (err) {
				res.send(err);
			}
			res.json(result);
		});
	});
};

module.exports.list = function(req, res) {
	Problem.find({}, function(err, result) {
		if (err) {
			res.send(err);
		}
		res.json(result);
	});
};