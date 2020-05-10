const mongoose = require("mongoose");

const { Schema } = mongoose;

const ReplyModel = new Schema(
  {
    user: {
      type: "ObjectId",
      ref: "User",
    },
    message: {
      type: "ObjectId",
      ref: "Message",
    },
    body: {
      type: "String",
    },
  },
  { timestamps: { createdAt: "created_at" } }
);

module.exports = mongoose.model("Reply", ReplyModel);
