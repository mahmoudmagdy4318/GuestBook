const mongoose = require("mongoose");

const { Schema } = mongoose;

const MessageModel = new Schema(
  {
    user: {
      type: "ObjectId",
      ref: "User",
    },
    body: {
      type: "String",
    },
  },
  { timestamps: { createdAt: "created_at" } }
);

module.exports = mongoose.model("Message", MessageModel);
