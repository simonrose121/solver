var schema = require('../models/user-schema');

module.exports.getUser = function(_id, res) {
	schema.findById(_id, function(err, result) {
		if (err)
			throw err;
		res(null, result);
	});
};

module.exports.addUser = function(req, res) {
	var user = new schema({ username: req.username, password: req.password });
	user.save(function(err) {
		if (err)
			throw err;
	});
};

// find
module.exports.authenticate = function(req, res) {
	schema.findOne({ username: req.username }, function(err, user) {
		if (err)
			throw err;
		if (user) {
			user.comparePassword(req.password, function(err, isMatch) {
				if (err)
					throw err;

				if (isMatch)
					res(null, user);
				else
					res(null, null);
			});
		} else {
			res(null);
		}
	});
};