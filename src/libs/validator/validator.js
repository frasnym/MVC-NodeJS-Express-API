const { validationResult } = require("express-validator");

/**
 * Check if request body is breaking the validator rules
 * @param {Request} req : API Request parameter
 * @param {Response} res : API Response parameter
 * @param {Function} next : Next Function
 */
const requestValidator = async (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		const errorsArray = errors.array();
		// const data = `${req.t(errorsArray[0].msg)}: ${req.t(
		// 	errorsArray[0].param
		// )}`; // with translation
		const data = `${errorsArray[0].msg}: ${errorsArray[0].param}`; // without translation

		return res.fail(400, data);
	}
	next();
};

module.exports = {
	requestValidator,
};
