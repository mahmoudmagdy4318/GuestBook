const express = require("express");
const TokenAuthorizationMiddleware = require("../middlewares/authorizationMiddleware");
const repliesController = require("../controllers/ReplyController");
const repliesControl = repliesController();
repliesRouter = express.Router();

repliesRouter.use((req, res, next) => {
  TokenAuthorizationMiddleware(req, res, next);
});

repliesRouter.post("/", (req, res, next) => {
  repliesControl.addReply(req, res, next);
});

module.exports = repliesRouter;
