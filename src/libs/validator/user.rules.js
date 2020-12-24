const { body } = require("express-validator");

const signUpRules = [
	body("full_name").notEmpty().withMessage("ParameterValueRequired"),
	body("email_address").isEmail().withMessage("InvalidEmailAddressFormat"),
	body("password")
		.isLength({ min: 6 })
		.withMessage("ValueMustBeMinimum6Char"),
];

module.exports = {
	signUpRules,
};
