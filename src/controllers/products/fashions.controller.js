const slugify = require("slugify");

const ProductModel = require("../../models/product.model");
const CategoryModel = require("../../models/category.model");
const queryHelper = require("../../helpers/query");

const create = async (req, res) => {
	// check if category available
	const exists = await CategoryModel.checkDocsValidity(req.body.category);
	if (!exists) {
		return res.fail(404, "Category not found!");
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

const read = async (req, res) => {
	const categoryMatch = {};
	if (req.query.category) {
		categoryMatch.slug = new RegExp(req.query.category); // convert string to regex
	}
	const brandMatch = {};
	if (req.query.brand) {
		brandMatch.slug = new RegExp(req.query.brand); // convert string to regex
	}

	// TODO Sort & Pagination

	try {
		// Read all Products
		const products = await ProductModel.find()
			.populate({
				path: "brand",
				match: brandMatch, // match uses regexch
				select: queryHelper.generateUnSelect("customer", "brand"),
			})
			.populate({
				path: "category",
				match: categoryMatch, // match uses regex
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

		return res.success(
			200,
			products.filter(
				(product) => product.brand !== null && product.category !== null
			) // TODO need optimization: didn't need filter
		);
	} catch (e) {
		return res.error(500, e.message);
	}
};

const find = async (req, res) => {
	const slug = req.params.slug;

	try {
		// find one product by slug
		let product = await ProductModel.findOne({ slug }).select(
			queryHelper.generateUnSelect("customer", "product")
		);

		// fail if not found
		if (!product) {
			return res.fail(404);
		}

		product = product.toJSON(); // combine object preparation

		// find other product with same name
		const variations = await ProductModel.find({
			name: product.name,
			slug: { $ne: slug },
		}).select("color.name images slug -_id");
		product.variations = variations;

		return res.success(200, product);
	} catch (e) {
		return res.error(500, e.message);
	}
};

module.exports = { create, read, find };
