const mongoose = require("mongoose");
const UserModel = require("../../src/models/user.model");

const userOneId = new mongoose.Types.ObjectId();
const userOne = {
	_id: userOneId,
	full_name: "Micao",
	email_address: "micao@example.com",
	password: "56what!!@200",
	role: "CUSTOMER",
};

const setupDatabase = async () => {
	await UserModel.deleteMany();
	await new UserModel(userOne).save();
};

module.exports = {
	setupDatabase,
};
