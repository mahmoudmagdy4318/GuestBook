const mongoose = require("mongoose");
const ReplyModel = require("./ReplyModel");

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

MessageModel.set("toJSON", { virtuals: true });

MessageModel.virtual("replies", {
  ref: "Reply",
  localField: "_id",
  foreignField: "message",
});

//middleware to cascade deleting replies of this message
MessageModel.pre("remove", function (next) {
  ReplyModel.remove({ message: this._id }).exec();
  next();
});

module.exports = mongoose.model("Message", MessageModel);
