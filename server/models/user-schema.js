var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	bcrypt = require('bcrypt'),
	SALT_WORK_FACTOR = 10;

var userSchema = new Schema({
	username: { type: String, required: true, index: { unique: true } },
	password: { type: String, required: true }
});

// Will not work on update
userSchema.pre('save'{
	var user = this;
	if (!user.isModified('password')) return next();

	// Generate a salt
	bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
		if (err)
			return next(err);

		bcrypt.hash(user.password, salt, function(err, hash) {
			if (err)
				return next(err);

			user.password = hash;
			next();
		})
	});
})

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
	bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
		if (err)
			return cb(err);

		cb(null, isMatch);
	});
});

module.exports = mongoose.model(User, userSchema);