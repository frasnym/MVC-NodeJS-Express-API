const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
		},
		// slug: {
		// 	type: String,
		// 	required: true,
		// 	trim: true,
		// 	unique: true,
		// },
		price: {
			type: Number,
			required: true,
		},
		description: {
			type: String,
			required: true,
			trim: true,
		},
		style: [
			{
				color: {
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
							unique: true,
						},
						image_url: {
							type: String,
							required: true,
						},
					},
				],
				// custom_sleeve_type: [
				// 	{
				// 		model: {
				// 			type: mongoose.Schema.Types.ObjectId,
				// 			ref: "Custom_Sleeve_Type",
				// 		},
				// 		image_url: {
				// 			type: String,
				// 			required: true,
				// 		},
				// 	},
				// ],
				// custom_length: [
				// 	{
				// 		model: {
				// 			type: mongoose.Schema.Types.ObjectId,
				// 			ref: "Custom_Length",
				// 		},
				// 		image_url: {
				// 			type: String,
				// 			required: true,
				// 		},
				// 	},
				// ],
			},
		],

		// category: {
		// 	type: mongoose.Schema.Types.ObjectId,
		// 	ref: "Category",
		// 	required: true,
		// },
		// brand: {
		// 	type: mongoose.Schema.Types.ObjectId,
		// 	ref: "Brand",
		// 	required: true,
		// },
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
