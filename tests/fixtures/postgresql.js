const { product: ProductModel } = require("../../src/db/sequelize");

const productOne = {
	title: "test product 1",
	price: 300000,
	description: "desc product 1",
};

const setupPGSQL = async () => {
	// Truncate/Delete all record
	await ProductModel.destroy({
		truncate: true,
		restartIdentity: true,
	});
	await ProductModel.create(productOne);
};

module.exports = {
	setupPGSQL,
	productOne,
};
