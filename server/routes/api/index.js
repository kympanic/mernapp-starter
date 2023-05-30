const router = require("express").Router();
const sessionRouter = require("./session.js");
const usersRouter = require("./users.js");
const { restoreUser } = require("../../utils/auth.js");

// Connect restoreUser middleware to the API router
// If current user session is valid, set req.user to the user in the database
// If current user session is not valid, set req.user to null
router.use(restoreUser);
router.use("/session", sessionRouter);
router.use("/users", usersRouter);

//test routes
// router.post("/test", function (req, res) {
// 	res.json({ requestBody: req.body });
// });
// router.get("/restore-user", (req, res) => {
// 	return res.json(req.user);
// });
// router.get("/set-token-cookie", async (_req, res) => {
// 	const user = await UserModel.findOne({ email: "Giovanny_Jerde@yahoo.com" });
// 	setTokenCookie(res, user);
// 	return res.json({ user: user });
// });

// const { requireAuth } = require("../../utils/auth.js");
// router.get("/require-auth", requireAuth, (req, res) => {
// 	return res.json(req.user);
// });

module.exports = router;
