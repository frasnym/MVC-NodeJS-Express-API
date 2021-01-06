const mongoose = require("mongoose");

const customNecklineSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	sample: {
		type: String,
		required: true,
	},
});

customNecklineModel = mongoose.model("Custom_Neckline", customNecklineSchema);

module.exports = customNecklineModel;
