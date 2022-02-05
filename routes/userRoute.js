const express = require("express");
const router = express.Router();

const { userRegistration, userLogin } = require("../controller/userController");
const {
  userRegistrationValidator,
  userLoginValidator,
  validatorHandler,
} = require("../middlewares/validator");

router.post(
  "/register",
  userRegistrationValidator,
  validatorHandler,
  userRegistration
);

router.post("/login", userLoginValidator, validatorHandler, userLogin);

module.exports = router;
