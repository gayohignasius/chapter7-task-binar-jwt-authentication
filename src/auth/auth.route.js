const express = require("express");
const authController = require('./auth.controller');
const authRouter = express.Router();

authRouter.post("/api/auth/login", authController);

module.exports = authRouter;