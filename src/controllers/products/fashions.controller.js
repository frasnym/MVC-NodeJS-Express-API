const slugify = require("slugify");

const ProductModel = require("../../models/product.model");
const CategoryModel = require("../../models/category.model");
const queryHelper = require("../../helpers/query");

const create = async (req, res) => {
	// check if category available
	const exists = await CategoryModel.checkDocsValidity(req.body.category);
	if (!exists) {
		return res.error(404, "Category not found!");
	}
	// TODO check if brand available

	const productObj = {
		name: req.body.name,
		slug: slugify(`${req.body.name}-${req.body.color.name}`),
		price: req.body.price,
		description: req.body.description,
		color: req.body.color,
		images: req.body.images,
		category: req.body.category,
		brand: req.body.brand,
		custom_neckline: req.body.custom_neckline,
	};

	try {
		// create new product
		const product = new ProductModel(productObj);
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
				select: queryHelper.generateUnSelect("customer", "brand"),
			})
			.populate({
				path: "category",
				select: queryHelper.generateUnSelect("customer", "category"),
			})
			.populate({
				path: "custom_neckline",
				populate: {
					path: "model",
					select: queryHelper.generateUnSelect("customer", "model"),
				},
			})
			.select(queryHelper.generateUnSelect("customer", "product"));

		return res.success(200, products);
	} catch (e) {
		return res.error(500, e.message);
	}
};

module.exports = { create, read };
