const MessageModel = require("../models/MessageModel");
const mongoose = require("mongoose");
const messageController = function () {
  //function to get all messages
  const getAllMessages = async (req, res, next) => {
    try {
      const messages = await MessageModel.find({})
        .populate("user")
        .populate({
          path: "replies",
          populate: { path: "user" },
        });
      res.json(messages);
    } catch (error) {
      error.statusCode = 400;
      next(error);
    }
  };

  //function to add a message
  const addMessage = async (req, res, next) => {
    const newMessage = new MessageModel({
      user: req.currentUser,
      body: req.body.message,
    });
    try {
      const message = await newMessage.save();
      res.json(message);
    } catch (err) {
      err.statusCode = 400;
      next(err);
    }
  };

  //function to edit a message
  const editMessage = async (req, res, next) => {
    const { userMessage } = req;
    try {
      const updatedMessage = await MessageModel.update(userMessage, {
        $set: { body: req.body.editedMessage },
      });
      userMessage.body = req.body.editedMessage;
      res.json(userMessage);
    } catch (err) {
      err.statusCode = 400;
      next(err);
    }
  };

  //function to delete a message
  const deleteMessage = async (req, res, next) => {
    const { userMessage } = req;
    try {
      userMessage.remove();
      res.json({ res: "deleted successfully" });
    } catch (err) {
      err.statusCode = 400;
      next(err);
    }
  };

  return { getAllMessages, addMessage, editMessage, deleteMessage };
};

module.exports = messageController;
