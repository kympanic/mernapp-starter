const { validationResult, check } = require("express-validator");

// middleware for formatting errors from express-validator middleware
// (to customize, see express-validator's documentation)
const handleValidationErrors = (req, _res, next) => {
	const validationErrors = validationResult(req);

	if (!validationErrors.isEmpty()) {
		const errors = {};
		console.log(validationErrors, "this is the vaidation errors");
		validationErrors.array().forEach((error) => {
			if (!errors[error.param]) {
				errors[error.param] = error.msg;
			}
		});
		const err = Error("Bad request.");
		err.errors = errors;
		err.status = 400;
		err.title = "Bad request.";
		next(err);
	}
	next();
};

// middleware that checks login for the following keys and validates them
const validateLogin = [
	check("credential")
		.exists({ checkFalsy: true })
		.withMessage("Please provide a valid email."),
	check("password")
		.exists({ checkFalsy: true })
		.withMessage("Please provide a password."),
	handleValidationErrors,
];

// middleware that checks signup for the following keys and validates them
const validateSignup = [
	check("email")
		.exists({ checkFalsy: true })
		.isEmail()
		.withMessage("Please provide a valid email."),
	check("name")
		.exists({ checkFalsy: true })
		.isLength({ min: 4 })
		.withMessage("Please provide a name with at least 4 characters."),
	check("name").not().isEmail().withMessage("Please provide your full name"),
	check("password")
		.exists({ checkFalsy: true })
		.isLength({ min: 6 })
		.withMessage("Password must be 6 characters or more."),
	handleValidationErrors,
];

module.exports = {
	handleValidationErrors,
	validateLogin,
	validateSignup,
};
