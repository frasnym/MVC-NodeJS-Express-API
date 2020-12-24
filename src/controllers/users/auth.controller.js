const UserModel = require("../../models/user.model");

const signUp = async (req, res) => {
	const { full_name, email_address, password } = req.body; // Destructure

	try {
		// Check if email already registered
		const user = await UserModel.findOne({ email_address });
		if (user) {
			return res.fail(409, "DataAlreadyExist");
		}

		// Create new user
		const newUser = new UserModel({
			full_name,
			email_address,
			password,
			role: "CUSTOMER",
		});
		await newUser.save();

		return res.success(201);
	} catch (e) {
		return res.error(500, e.message);
	}
};

module.exports = { signUp };
