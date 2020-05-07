const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const salt_rounds = process.env.SALT_ROUNDS;

const { Schema } = mongoose;

const UserModel = new Schema({
  username: { type: "String", required: true, index: { unique: true } },
  email: { type: "String", required: true },
  password: { type: "String", required: true },
});

UserModel.pre("save", async function () {
  try {
    if (this.isModified) {
      this.password = await bcrypt.hash(this.password, salt_rounds);
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = mongoose.model("User", UserModel);
