const { validationResult } = require("express-validator");

/**
 * Creating template message for response: JSEND FORMAT
 * @param {Request} req : API Request parameter
 * @param {Response} res : API Response parameter
 * @param {Function} next : Next Function
 */
const jsend = async (_req, res, next) => {
	/**
	 * JSend success: All went well, and (usually) some data was returned. => status, data
	 * @param {Integer} code Response status code
	 * @param {Object} data Any data type
	 */
	res.success = (code, data) => {
		res.status(code);
		return res.send({
			status: "success",
			data,
		});
	};
	/**
	 * JSend fail: There was a problem with the data submitted, or some pre-condition of the API call wasn't satisfied.	=> status, data
	 * @param {Integer} code Response status code
	 * @param {Object} data Any data type
	 */
	res.fail = (code, data) => {
		res.status(code);
		return res.send({
			status: "fail",
			data,
		});
	};
	/**
	 * JSend error: An error occurred in processing the request, i.e. an exception was thrown. => status, message, code, data
	 * @param {Integer} code Response status code
	 * @param {String} message Response message
	 */
	res.error = (code, message) => {
		res.status(code);
		return res.send({
			status: "error",
			message,
		});
	};
	next();
};

module.exports = {
	jsend,
};
