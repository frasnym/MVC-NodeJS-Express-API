const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
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
		parentId: {
			type: String,
		},
	},
	{
		timestamps: true,
	}
);

categorySchema.statics = {
	/**
	 * To check if parentId is valid and exist
	 * @param {String} parentId :
	 */
	checkDocsValidity: async (parentId) => {
		const isValid = mongoose.Types.ObjectId.isValid(parentId);
		if (!isValid) {
			return false;
		}
		const exists = await Category.findOne({ _id: parentId });
		return exists;
	},
};

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
