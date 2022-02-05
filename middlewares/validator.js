const { body, validationResult } = require("express-validator");

const userRegistrationValidator = [
  body("username")
    .trim()
    .isLength({ min: 6 })
    .withMessage("username should be 6 to more characters"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("pasword should be 8 or more character."),
  body("firstName")
    .trim()
    .isLength({ min: 1 })
    .withMessage("First name can not be empty!"),
  body("lastName")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Last name can not be empty!"),
];

const userLoginValidator = [
  body("username")
    .trim()
    .isLength({ min: 1 })
    .withMessage("username can not be empty!"),
  body("password")
    .isLength({ min: 1 })
    .withMessage("pasword can not be empty!"),
];

const customerRegistrationValidator = [
  body("firstName")
    .trim()
    .isLength({ min: 1 })
    .withMessage("First name can not be empty!"),
  body("lastName")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Last name can not be empty!"),
  body("address")
    .trim()
    .isLength({ min: 1 })
    .withMessage("address can not be empty!"),
  body("postCode")
    .trim()
    .isLength({ min: 1 })
    .withMessage("post code can not be empty!"),
  body("mobile").trim().isLength({ min: 10, max: 12 }).isInt(),
];

function validatorHandler(req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }

  next();
}
module.exports = {
  userRegistrationValidator,
  userLoginValidator,
  customerRegistrationValidator,
  validatorHandler,
};
