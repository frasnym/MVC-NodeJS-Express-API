const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
});

brandModel = mongoose.model("Brand", brandSchema);

brandModel.find({}, async function (err, docs) {
	const datas = [
		{
			name: "eShakti CLASSIC",
		},
		{
			name: "Wayward Fancies",
		},
	];
	if (docs.length < datas.length) {
		for (const data in datas) {
			if (docs[data]) {
				if (docs[data].name !== datas[data].name) {
					new brandModel(datas[data]).save();
				}
			} else {
				new brandModel(datas[data]).save();
			}
		}
	}
});

module.exports = brandModel;
