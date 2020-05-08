const express = require("express");
const app = express();
const UserModel = require("../models/UsersModel");
const mongoose = require("mongoose");
const userController = require("../controllers/UserController");
const Usercontrol = userController();
const { check, validationResult } = require("express-validator");

userRouter = express.Router();

userRouter.post(
  "/register",
  [
    // email must be a valid email
    check("email").isEmail(),
    // password must be at least 6 chars long
    check("password").isLength({ min: 6 }),
    // username must be at least 5 chars long
    check("username").isLength({ min: 5 }),
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    Usercontrol.register(errors, req, res, next);
  }
);

module.exports = userRouter;
