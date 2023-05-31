const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { setTokenCookie } = require("../../utils/auth");
const UserModel = require("../../mongodb/models/User");
const { validateLogin } = require("../../utils/validation");

// login
router.post("/", validateLogin, async (req, res, next) => {
	const { credential, password } = req.body;

	const user = await UserModel.findOne({ email: credential });
	if (!user || !bcrypt.compareSync(password, user.password)) {
		const err = new Error("Login failed");
		err.status = 401;
		err.title = "Login Failed";
		err.errors = { credential: "The provided credentials were invalid." };
		return next(err);
	}
	const safeUser = {
		id: user._id,
		email: user.email,
		name: user.name,
	};
	await setTokenCookie(res, safeUser);
	return res.json({
		user: safeUser,
	});
});

// logout
router.delete("/", (_req, res) => {
	res.clearCookie("token");
	return res.json({
		message: "success",
	});
});

// Restore session user
router.get("/", (req, res) => {
	const { user } = req;
	if (user) {
		const safeUser = {
			id: user.id,
			email: user.email,
			name: user.name,
		};
		return res.json({
			user: safeUser,
		});
	} else return res.json({ user: null });
});

module.exports = router;
