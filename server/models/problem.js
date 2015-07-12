var mongoose = require('mongoose');
var Solution = require('./solution');

module.exports = mongoose.model('Problem', {
	name: String,
	solutions: [Solution]
});