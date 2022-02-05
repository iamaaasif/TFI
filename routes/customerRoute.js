const express = require("express");
const router = express.Router();

const { customerRegistration } = require("../controller/customerController");
const {
  customerRegistrationValidator,
  validatorHandler,
} = require("../middlewares/validator");
const { CheckLogin } = require("../middlewares/checkLogin");

router.post(
  "/add",
  CheckLogin,
  customerRegistrationValidator,
  validatorHandler,
  customerRegistration
);

module.exports = router;
