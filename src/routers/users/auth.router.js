const express = require("express");

const { signUpRules } = require("../../libs/validator/user.rules");
const { requestValidator } = require("../../libs/validator/validator");
const authController = require("../../controllers/users/auth.controller");

const router = new express.Router();

router.post("/signup", [signUpRules, requestValidator], authController.signUp);

module.exports = router;
