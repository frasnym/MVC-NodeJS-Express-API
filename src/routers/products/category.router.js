const express = require("express");

const caregoryController = require("../../controllers/products/categories.controller");

const router = new express.Router();

router.route("/").post(caregoryController.create).get(caregoryController.read);

module.exports = router;
