const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const User = new mongoose.Schema({
	name: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
});

// Hash the password before saving or updating the user
User.pre("save", function (next) {
	if (!this.isModified("password")) {
		return next();
	}

	bcrypt.genSalt(10, (err, salt) => {
		if (err) {
			return next(err);
		}

		bcrypt.hash(this.password, salt, (err, hash) => {
			if (err) {
				return next(err);
			}

			this.password = hash;
			next();
		});
	});
});

const UserModel = mongoose.model("User", User);

module.exports = UserModel;
