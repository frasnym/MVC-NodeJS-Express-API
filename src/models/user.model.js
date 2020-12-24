const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
	{
		full_name: {
			type: String,
			required: true,
			trim: true,
			min: 3,
		},
		account_status: {
			type: String,
			required: true,
			uppercase: true,
			enum: ["ACTIVE", "INACTIVE"],
			default: "ACTIVE",
		},
		email_address: {
			type: String,
			unique: true,
			required: true,
			trim: true,
			lowercase: true,
			validate(value) {
				if (!validator.isEmail(value)) {
					throw new Error("InvalidEmailAddressFormat");
				}
			},
		},
		email_address_verify_status: {
			type: String,
			required: true,
			uppercase: true,
			enum: ["UNVERIFIED", "VERIFIED"],
			default: "UNVERIFIED",
		},
		password: {
			type: String,
			required: true,
			minlength: 7,
			trim: true,
		},
		role: {
			type: String,
			required: true,
			uppercase: true,
			enum: ["CUSTOMER", "ADMIN"],
		},
		profile_picture: {
			type: String,
		},
		tokens: [
			{
				token: {
					type: String,
					required: true,
				},
				user_agent: {
					type: String,
					required: true,
				},
				ip_address: {
					type: String,
					required: true,
					validate(value) {
						if (!validator.isIP(value)) {
							throw new Error("InvalidIPAddressFormat");
						}
					},
				},
			},
		],
	},
	{
		timestamps: true,
	}
);

userSchema.pre("save", async function (next) {
	const user = this;

	if (user.isModified("password")) {
		user.password = await bcrypt.hash(user.password, 8);
	}

	next(); // Done with the function
});

const User = mongoose.model("User", userSchema);
module.exports = User;
