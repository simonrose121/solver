var mongoose = require('mongoose');

var solutionSchema = mongoose.Schema({
	name: String,
	done: Boolean
});

var problemSchema = mongoose.Schema({
	name: String,
	solutions: [solutionSchema]
});

module.exports.solution = mongoose.model('Solution', solutionSchema);
module.exports.problem = mongoose.model('Problem', problemSchema);