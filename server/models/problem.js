var mongoose = require('mongoose');

var solution = mongoose.Schema({
	name: String,
	completed: Boolean
})

module.exports = mongoose.model('Problem', {
	name: String,
	solutions: [solution]
});