const mongoose = require("mongoose");

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
		colors: [
			{
				name: {
					type: String,
					required: true,
					trim: true,
				},
				images: [
					{
						type: String,
					},
				],
				custom_neckline: [
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
				],
				custom_sleeve_type: [
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
				],
				custom_length: [
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
				],
			},
		],
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
	}
);

module.exports = mongoose.model("Product", productSchema);
