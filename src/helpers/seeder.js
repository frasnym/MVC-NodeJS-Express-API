const mongoose = require("mongoose");
const slugify = require("slugify");

const BrandModel = require("../models/brand.model");
const CustomNecklineModel = require("../models/custom_neckline.model");
const CategoryModel = require("../models/category.model");
const ProductModel = require("../models/product.model");

const brandOneId = new mongoose.Types.ObjectId();
const brandOne = {
	_id: brandOneId,
	name: "eShakti CLASSIC",
	slug: slugify("eShakti CLASSIC"),
};
const brandTwoId = new mongoose.Types.ObjectId();
const brandTwo = {
	_id: brandTwoId,
	name: "Wayward Fancies",
	slug: slugify("eShakti CLASSIC"),
};
const brandEshaktiId = new mongoose.Types.ObjectId();
const brandEshakti = {
	_id: brandEshaktiId,
	name: "eShakti",
	slug: slugify("eShakti"),
};

const customNecklineDefaultId = new mongoose.Types.ObjectId();
const customNecklineDefault = {
	_id: customNecklineDefaultId,
	name: "Default",
	sample: "Default",
};
const customNecklineWideVId = new mongoose.Types.ObjectId();
const customNecklineWideV = {
	_id: customNecklineWideVId,
	name: "Wide V",
	sample: "https://www.eshakti.com/styling%20images/Wide%20V.jpg",
};
const customNecklineWideScoopId = new mongoose.Types.ObjectId();
const customNecklineWideScoop = {
	_id: customNecklineWideScoopId,
	name: "Wide Scoop",
	sample: "https://www.eshakti.com/styling%20images/Wide%20Scoop.jpg",
};
const customNecklineWideDeepScoopId = new mongoose.Types.ObjectId();
const customNecklineWideDeepScoop = {
	_id: customNecklineWideDeepScoopId,
	name: "Wide Deep Scoop",
	sample: "https://www.eshakti.com/styling%20images/Wide%20Deep%20Scoop.jpg",
};

const categoryDresserId = new mongoose.Types.ObjectId();
const categoryDresser = {
	_id: categoryDresserId,
	name: "Dresser",
	slug: "Dresser",
};

const categoryWovenDresserId = new mongoose.Types.ObjectId();
const categoryWovenDresser = {
	_id: categoryWovenDresserId,
	name: "Woven",
	slug: "Woven-Dresser",
	parentId: categoryDresserId,
};

const categoryEmbroideryWovenDresserId = new mongoose.Types.ObjectId();
const categoryEmbroideryWovenDresser = {
	_id: categoryEmbroideryWovenDresserId,
	name: "Embroidery",
	slug: "Embroidery-Woven-Dresser",
	parentId: categoryWovenDresserId,
};

const categoryKnitsDresserId = new mongoose.Types.ObjectId();
const categoryKnitsDresser = {
	_id: categoryKnitsDresserId,
	name: "Knits",
	slug: "Knits-Dresser",
	parentId: categoryDresserId,
};

const categoryTopsId = new mongoose.Types.ObjectId();
const categoryTops = {
	_id: categoryTopsId,
	name: "Tops",
	slug: "Tops",
};

const productOne = {
	name: "Floral Graphic Embellished Dupioni Dress",
	slug: slugify("Floral Graphic Embellished Dupioni Dress " + "Black"),
	price: 89.95,
	description:
		"Our floral embellished poly-dupioni dress is classically flattering with it's fitted bodice and flared skirt while contrast striped trim and self-button tabs add a sporty touch.",
	color: {
		name: "Black",
		base: "Black",
	},
	images: [
		"https://img1.eshakti.com/clothimages/CL0072094MP.jpg",
		"https://img1.eshakti.com/clothimages/CL0072094MP1.jpg",
	],
	category: categoryEmbroideryWovenDresserId,
	brand: brandEshaktiId,
	custom_neckline: [
		{
			model: customNecklineDefaultId,
			image_url:
				"https://www.eshakti.com/images/CL0066681/CL0066681-Neckline-As Shown.jpg",
		},
	],
};

const productTwo = {
	name: "Floral Graphic Embellished Dupioni Dress",
	slug: slugify("Floral Graphic Embellished Dupioni Dress " + "White"),
	price: 89.95,
	description:
		"Our floral embellished poly-dupioni dress is classically flattering with it's fitted bodice and flared skirt while contrast striped trim and self-button tabs add a sporty touch.",
	color: {
		name: "White",
		base: "White",
	},
	images: [
		"https://img1.eshakti.com/clothimages/CL0072094MP.jpg",
		"https://img1.eshakti.com/clothimages/CL0072094MP1.jpg",
	],
	category: categoryEmbroideryWovenDresserId,
	brand: brandOneId,
	custom_neckline: [
		{
			model: customNecklineDefaultId,
			image_url:
				"https://www.eshakti.com/images/CL0066681/CL0066681-Neckline-As Shown.jpg",
		},
	],
};

const setupDatabase = async () => {
	await BrandModel.deleteMany();
	await new BrandModel(brandOne).save();
	await new BrandModel(brandTwo).save();
	await new BrandModel(brandEshakti).save();

	await CustomNecklineModel.deleteMany();
	await new CustomNecklineModel(customNecklineDefault).save();
	await new CustomNecklineModel(customNecklineWideV).save();
	await new CustomNecklineModel(customNecklineWideScoop).save();
	await new CustomNecklineModel(customNecklineWideDeepScoop).save();

	await CategoryModel.deleteMany();
	await new CategoryModel(categoryDresser).save();
	await new CategoryModel(categoryWovenDresser).save();
	await new CategoryModel(categoryEmbroideryWovenDresser).save();
	await new CategoryModel(categoryKnitsDresser).save();
	await new CategoryModel(categoryTops).save();

	await ProductModel.deleteMany();
	await new ProductModel(productOne).save();
	await new ProductModel(productTwo).save();
};

setupDatabase();
