const slugify = require("slugify");
const CategoryModel = require("../../models/category.model");

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

/**
 * Generate Category Slug: Loop Through Parent
 * @param {Array} slugArray
 * @param {String} name : category name
 * @param {String} parentId : category ObjectId
 */
async function populateSlug(slugArray, name, parentId = null) {
	slugArray.push(name);

	if (parentId) {
		const category = await CategoryModel.findById(parentId);
		await populateSlug(slugArray, category.name, category.parentId);
	}

	return slugArray;
}

const create = async (req, res) => {
	const categoryObj = {
		name: req.body.name,
	};

	let slug = slugify(req.body.name);

	if (req.body.parentId) {
		// check if parentId available
		const exists = await CategoryModel.checkDocsValidity(req.body.parentId);
		if (!exists) {
			return res.fail(404, "parentId not found!");
		}
		categoryObj.parentId = req.body.parentId; // store parentId to Object

		// generate category slug
		const slugResult = await populateSlug(
			[],
			req.body.name,
			req.body.parentId
		);
		slug = slugify(slugResult.join(" "));
	}
	categoryObj.slug = slug; // store slug to Object

	try {
		const category = new CategoryModel(categoryObj);
		await category.save();

		return res.success(201, category);
	} catch (e) {
		return res.error(500, e.message);
	}
};

const read = async (req, res) => {
	try {
		const categories = await CategoryModel.find({});

		return res.success(200, populateCategories(categories));
	} catch (e) {
		return res.fail(404);
	}
};

module.exports = { create, read };
