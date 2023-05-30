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
			return res
				.status(400)
				.json({ error: "Email address already exists" });
		}
		//Check if user included name or password
		if (!name || !password) {
			return res
				.status(400)
				.json({ error: "Please input your name/password" });
		}
		//Check password length
		if (password.length < 6) {
			return res.status(400).json({
				error: "Password length must be at least 6 characters",
			});
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
