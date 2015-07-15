var schema = require('../models/schema');

var list = function(req, res) {
	schema.problem.find({}, function(err, result) {
		if (err) {
			res.send(err);
		}
		console.log(result)
		res.json(result);
	});
}

module.exports.create = function(req, res) {
	schema.problem.create({name: req.body.name, done: false}, function(err, result) {
		if (err)
			res.send(err);

		list(req, res);
	});
};

module.exports.delete = function(req, res) {
	schema.problem.remove({_id: req.params.id}, function(err, result) {
		if (err)
			res.send(err);

		list(req, res);
	});
};

module.exports.list = list;