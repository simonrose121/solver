var mongoose = require('mongoose');

module.exports = mongoose.model('Solution', {
	name: String,
	completed: Boolean
});