const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { setTokenCookie, restoreUser } = require("../../utils/auth");
const UserModel = require("../../mongodb/models/User");

router.post("/", async (req, res, next) => {
	const { credential, password } = req.body;

	console.log(credential, password);
	const user = await UserModel.findOne({ email: credential });
	console.log(user, "this is the user");
	// if (!user || !bcrypt.compareSync(password, user.password.toString())) {
	// 	const err = new Error("Login failed");
	// 	err.status = 401;
	// 	err.title = "Login Failed";
	// }
	// for testing purposes we will just check password bc we do not have a password to compare in the mongodb
	if (!user || password !== user.password) {
		const err = new Error("Login failed");
		err.status = 401;
		err.title = "Login Failed";
		err.errors = { credential: "The provided credential were invalid" };
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

module.exports = router;
