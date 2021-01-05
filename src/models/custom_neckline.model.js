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

customNecklineModel.countDocuments({}, async function (err, count) {
	const datas = [
		{
			name: "Wide V",
			sample: "https://www.eshakti.com/styling%20images/Wide%20V.jpg",
		},
		{
			name: "Wide Scoop",
			sample: "https://www.eshakti.com/styling%20images/Wide%20Scoop.jpg",
		},
		{
			name: "Wide Deep Scoop",
			sample:
				"https://www.eshakti.com/styling%20images/Wide%20Deep%20Scoop.jpg",
		},
	];
	if (count < datas.length) {
		await customNecklineModel.deleteMany();
		for (const data in datas) {
			new customNecklineModel(datas[data]).save();
		}
	}
});

module.exports = customNecklineModel;
