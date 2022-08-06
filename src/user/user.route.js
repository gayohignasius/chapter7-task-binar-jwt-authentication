const express = require("express");
const tokenVerification = require("../middleware/token.verification");
const userController = require("./user.controller");
const userRouter = express.Router();

userRouter.post("/api/registration", userController.createNewUser);
userRouter.put("/api/v1/users/:userId", tokenVerification, userController.editUser);

module.exports = userRouter;