const slugify = require("slugify");

const categoryModel = require("../../models/category.model");

/**
 * Populate Categories Children
 * @param {Object} categories : category object from db
 * @param {String} parentId : ObjectId, if available
 */
function populateCategories(categories, parentId = null) {
	const categoryList = [];
	let category;

	if (parentId == null) {
		category = categories.filter((cat) => cat.parentId == undefined);
	} else {
		category = categories.filter((cat) => cat.parentId == parentId);
	}

	for (let cate of category) {
		categoryList.push({
			_id: cate._id,
			name: cate.name,
			slug: cate.slug,
			parentId: cate.parentId,
			children: populateCategories(categories, cate._id),
		});
	}

	return categoryList;
}

const create = async (req, res) => {
	const categoryObj = {
		name: req.body.name,
		slug: slugify(req.body.name), // slugify some string
	};

	if (req.body.parentId) {
		// check if parentId available
		const exists = await categoryModel.checkDocsValidity(req.body.parentId);
		if (!exists) {
			return res.error(404, "parentId not found!");
		}
		categoryObj.parentId = req.body.parentId;
	}

	const category = new categoryModel(categoryObj);

	try {
		await category.save();

		return res.success(201, category);
	} catch (e) {
		return res.error(500, e.message);
	}
};

const read = async (req, res) => {
	try {
		const categories = await categoryModel.find({});

		return res.success(200, populateCategories(categories));
	} catch (e) {
		return res.error(404);
	}
};

module.exports = { create, read };
