const { product: ProductModel } = require("../../db/sequelize");

const create = async (req, res) => {
	const { title, price, description } = req.body; // Destructure

	try {
		// Create new Product
		const product = await ProductModel.create({
			title,
			price,
			description,
		});

		return res.success(201, product);
	} catch (e) {
		return res.error(500, e.message);
	}
};

const read = async (_req, res) => {
	try {
		// Read all Products
		const products = await ProductModel.findAll();

		return res.success(200, products);
	} catch (e) {
		return res.error(500, e.message);
	}
};

const find = async (req, res) => {
	const id = parseInt(req.params.id);

	try {
		// Find Product
		const product = await ProductModel.findByPk(id);

		if (!product) {
			return res.fail(404);
		}

		return res.success(200, product);
	} catch (e) {
		return res.error(500, e.message);
	}
};

const update = async (req, res) => {
	const id = parseInt(req.params.id);

	// Check if only desired parameter provided
	const updates = Object.keys(req.body);
	const allowedUpdates = ["title", "price", "description"];
	const isValidOperation = updates.every((update) =>
		allowedUpdates.includes(update)
	);

	if (!isValidOperation) {
		res.fail(400, "Invalid operation");
	}

	try {
		// Update Product
		const updated = await ProductModel.update(req.body, {
			where: {
				id,
			},
		});

		// Check updated data
		if (updated <= 0) {
			return res.fail(404);
		}

		return res.success(200);
	} catch (e) {
		return res.error(500, e.message);
	}
};

module.exports = { create, read, find, update };
