const express = require("express");

const productsController = require("../../controllers/products/products.controller");

const router = new express.Router();

router.route("/").get(productsController.read).post(productsController.create);
router
	.route("/:id")
	.get(productsController.find)
	.patch(productsController.update);

module.exports = router;
