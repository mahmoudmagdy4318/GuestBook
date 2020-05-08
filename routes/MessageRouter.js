const express = require("express");
const mongoose = require("mongoose");
const messageController = require("../controllers/MessageController");
const messageControl = messageController();
const MessageModel = require("../models/MessageModel");

messageRouter = express.Router();

messageRouter
  .route("/")
  //route to get all messages
  .get((req, res, next) => {
    messageControl.getAllMessages(req, res, next);
  })
  //route to add new message
  .post((req, res, next) => {
    messageControl.addMessage(req, res, next);
  });

//middleware for all routes to "/:id"
messageRouter.all("/:id", async (req, res, next) => {
  const message = await MessageModel.findById(
    mongoose.Types.ObjectId(req.params.id)
  ).populate("user");
  req.userMessage = message;
  next();
});

messageRouter
  .route("/:id")
  //route for getting a specific message
  .get((req, res, next) => {
    res.json(req.userMessage);
  })
  //route for editing a message
  .patch((req, res, next) => {
    messageControl.editMessage(req, res, next);
  })
  //route for deleting a message
  .delete((req, res, next) => {
    messageControl.deleteMessage(req, res, next);
  });

module.exports = messageRouter;
