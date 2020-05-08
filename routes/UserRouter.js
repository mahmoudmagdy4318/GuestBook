const express = require("express");
const app = express();
const UserModel = require("../models/UsersModel");
const mongoose = require("mongoose");
const userController = require("../controllers/UserController");
const Usercontrol = userController();

userRouter = express.Router();

userRouter.post("/register", async (req, res, next) => {
  Usercontrol.register(req, res, next);
});

module.exports = userRouter;
