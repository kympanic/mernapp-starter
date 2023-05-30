const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const UserModel = require("../../mongodb/models/User");
// const connectDB = require("../../mongodb/connect.js");

// Signup
router.post("/", async (req, res) => {
	const { email, password, name } = req.body;
	const hashedPassword = bcrypt.hashSync(password);
	try {
		// Check if the email already exists
		const existingUser = await UserModel.findOne({ email });
		if (existingUser) {
			// Email address already exists
			const err = new Error("Email failed");
			err.status = 400;
			err.title = "Email already exists";
			err.errors = {
				credential: "Email already exists",
			};
			res.json(err);
		}
		//Check if user included name or password
		if (!name || !password) {
			const err = new Error("No name or password");
			err.status = 400;
			err.title = "Input needed for name or password";
			err.errors = {
				credential: "Input needed for name or password",
			};
			res.json(err);
		}
		//Check password length
		if (password.length < 6) {
			const err = new Error("Fix password length");
			err.status = 400;
			err.title = "Password length must be greater than 6 characters";
			err.errors = {
				credential: "Password length must be greater than 6 characters",
			};
			res.json(err);
		}
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
		await setTokenCookie(res, safeUser);
		return res.json({
			user: safeUser,
		});
	} catch (error) {
		// Handle other error cases, if any
		return res.status(500).json({ error: "Internal Server Error" });
	}
});

module.exports = router;
