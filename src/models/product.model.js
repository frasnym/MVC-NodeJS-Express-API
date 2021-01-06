const mongoose = require("mongoose");

const customNecklineSchema = new mongoose.Schema(
	{
		model: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Custom_Neckline",
		},
		image_url: {
			type: String,
			required: true,
		},
	},
	{
		_id: false,
	}
);

const customSleeveSchema = new mongoose.Schema(
	{
		model: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Custom_Sleeve_Type",
		},
		image_url: {
			type: String,
			required: true,
		},
	},
	{
		_id: false,
	}
);

const customLengthSchema = new mongoose.Schema(
	{
		model: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Custom_Length",
		},
		image_url: {
			type: String,
			required: true,
		},
	},
	{
		_id: false,
	}
);

const productSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
		},
		slug: {
			type: String,
			trim: true,
			unique: true,
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
		description: {
			type: String,
			required: true,
			trim: true,
		},
		category: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Category",
			required: true,
		},
		brand: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Brand",
			required: true,
		},
		color: {
			name: {
				type: String,
				required: true,
			},
			base: {
				type: String,
				required: true,
			},
		},
		images: [
			{
				type: String,
			},
		],
		custom_neckline: [customNecklineSchema],
		custom_sleeve_type: [customSleeveSchema],
		custom_length: [customLengthSchema],
		// ocassion: [
		//     {
		//         type: mongoose.Schema.Types.ObjectId,
		//         ref: "Ocassion",
		//         required: true,
		//     }
		// ],
	},
	{
		timestamps: true,
		toJSON: {
			transform: function (doc, ret) {
				ret.id = ret._id;
				delete ret._id;
				delete ret.__v;
			},
		},
	}
);

module.exports = mongoose.model("Product", productSchema);
