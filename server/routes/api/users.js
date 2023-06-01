const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const UserModel = require("../../mongodb/models/User");
const { validateSignup, validateUserEmail } = require("../../utils/validation");

// Signup
router.post("/", validateSignup, validateUserEmail, async (req, res) => {
	const { email, password, name } = req.body;
	const hashedPassword = bcrypt.hashSync(password);
	const newUser = new UserModel({
		name,
		email,
		password: hashedPassword,
	});
	newUser.save();
	const safeUser = {
		id: newUser._id,
		email: newUser.email,
		name: newUser.name,
	};
	setTokenCookie(res, safeUser);
	return res.json({
		user: safeUser,
	});
});

module.exports = router;
