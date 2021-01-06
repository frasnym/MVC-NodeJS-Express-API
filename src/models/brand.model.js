const mongoose = require("mongoose");
const slugify = require("slugify");

const brandSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	slug: {
		type: String,
		trim: true,
		unique: true,
		required: true,
	},
});

brandModel = mongoose.model("Brand", brandSchema);

module.exports = brandModel;
