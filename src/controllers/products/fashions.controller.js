const ProductModel = require("../../models/product.model");

const create = async (req, res) => {
	const { name, price, description, style } = req.body; // Destructure

	try {
		// Create new Product
		const product = await ProductModel.create({
			name,
			price,
			description,
			style,
		});

		return res.success(201, product);
	} catch (e) {
		return res.error(500, e.message);
	}
};

module.exports = { create };
