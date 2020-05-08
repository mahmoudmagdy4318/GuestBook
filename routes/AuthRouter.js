const express = require("express");
const authController = require("../controllers/AuthController");
const Authcontrol = authController();
const { check, validationResult } = require("express-validator");
const alreadyLoginnedMiddleware = require("../middlewares/alreadyLoginnedMiddleware");

authRouter = express.Router();

authRouter.use((req, res, next) => {
  alreadyLoginnedMiddleware(req, res, next);
});

authRouter.post(
  "/register",
  [
    // email must be a valid email
    check("email").isEmail(),
    // password must be at least 6 chars long
    check("password").isLength({ min: 6 }),
    // username must be at least 5 chars long
    check("username").isLength({ min: 5 }),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    Authcontrol.register(errors, req, res, next);
  }
);

authRouter.post("/login", (req, res, next) => {
  Authcontrol.login(req, res, next);
});

module.exports = authRouter;
