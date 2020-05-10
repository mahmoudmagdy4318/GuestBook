const ReplyModel = require("../models/ReplyModel");
const mongoose = require("mongoose");
const repliesCotroller = function () {
  const addReply = async (req, res, next) => {
    const { messageId, reply } = req.body;
    const { currentUser } = req;
    const newReplyInstance = new ReplyModel({
      user: currentUser,
      message: mongoose.Types.ObjectId(messageId),
      body: reply,
    });
    try {
      const newReply = await newReplyInstance.save();
      res.json(newReply);
    } catch (err) {
      err.statusCode = 400;
      next(err);
    }
  };
  return { addReply };
};

module.exports = repliesCotroller;
