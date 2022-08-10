const express = require("express");
const tokenVerification = require("../middleware/token.verification");
const validate = require("../middleware/validation/validate");
const userController = require("./user.controller");
const userRouter = express.Router();
const schemas = require("../middleware/validation/schemas");
const { checkSchema } = require("express-validator");

userRouter.post(
  "/api/registration",
  validate(checkSchema(schemas.registrationSchema)),
  userController.createNewUser
);
userRouter.put("/api/v1/users/:userId", tokenVerification, userController.editUser);

module.exports = userRouter;