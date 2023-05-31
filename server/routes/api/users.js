const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const UserModel = require("../../mongodb/models/User");
const { validateSignup } = require("../../utils/validation");

// Signup
router.post("/", validateSignup, async (req, res) => {
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
