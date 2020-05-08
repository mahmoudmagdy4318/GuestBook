const MessageModel = require("../models/MessageModel");
const mongoose = require("mongoose");
const messageController = function () {
  //function to get all messages
  const getAllMessages = async (req, res, next) => {
    try {
      const messages = await MessageModel.find({}).populate("user");
      res.json(messages);
    } catch (error) {
      error.statusCode = 403;
      next(error);
    }
  };

  //function to add a message
  const addMessage = async (req, res, next) => {
    //get the authenticated user
    const newMessage = new MessageModel({
      user: mongoose.Types.ObjectId(req.body.user),
      body: req.body.message,
    });
    try {
      const message = await newMessage.save();
      res.json(message);
    } catch (err) {
      err.statusCode = 403;
      next(err);
    }
  };

  //function to edit a message
  const editMessage = async (req, res, next) => {
    const { userMessage } = req;
    try {
      const updatedMessage = await MessageModel.updateOne(userMessage, {
        $set: req.body,
      });
      res.json(updatedMessage);
    } catch (err) {
      err.statusCode = 403;
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
      err.statusCode = 403;
      next(err);
    }
  };

  return { getAllMessages, addMessage, editMessage, deleteMessage };
};

module.exports = messageController;
