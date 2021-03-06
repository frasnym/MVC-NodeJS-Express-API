const express = require("express");

const fashionsController = require("../../controllers/products/fashions.controller");

const router = new express.Router();

router.route("/").post(fashionsController.create).get(fashionsController.read);
router.route("/:slug").get(fashionsController.find);

module.exports = router;
