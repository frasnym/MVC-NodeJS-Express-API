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

customNecklineModel.find({}, async function (err, docs) {
	const datas = [
		{
			name: "Default",
			sample: "Default",
		},
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
	if (docs.length < datas.length) {
		for (const data in datas) {
			if (docs[data]) {
				if (docs[data].name !== datas[data].name) {
					new customNecklineModel(datas[data]).save();
				}
			} else {
				new customNecklineModel(datas[data]).save();
			}
		}
	}
});

module.exports = customNecklineModel;
