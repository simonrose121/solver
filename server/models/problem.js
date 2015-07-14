var mongoose = require('mongoose');

module.exports = mongoose.model('Problem', {
	name: String,
	done: Boolean
});