const slugify = require("slugify");
const ProductModel = require("../../models/product.model");

const create = async (req, res) => {
	const { name, price, description, colors, brand } = req.body; // Destructure

	// Create new Product
	const product = new ProductModel({
		name,
		slug: slugify(name),
		price,
		description,
		colors,
		brand,
	});

	try {
		await product.save();

		return res.success(201, product);
	} catch (e) {
		return res.error(500, e.message);
	}
};

const read = async (_req, res) => {
	try {
		// Read all Products
		const products = await ProductModel.find()
			.populate({
				path: "brand",
			})
			.populate({
				path: "colors",
				populate: {
					path: "custom_neckline",
					populate: { path: "model" },
				},
			});

		return res.success(200, products);
	} catch (e) {
		return res.error(500, e.message);
	}
};

module.exports = { create, read };
