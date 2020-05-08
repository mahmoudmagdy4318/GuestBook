const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const salt_rounds = Number(process.env.SALT_ROUNDS);

const { Schema } = mongoose;

const UserModel = new Schema({
  username: {
    type: "String",
    required: [true, "username is required"],
    index: { unique: [true, "this username is already taken!"] },
  },
  email: { type: "String", required: [true, "email is required"] },
  password: { type: "String", required: [true, "password is required"] },
});

UserModel.pre("save", async function () {
  try {
    if (this.isModified("password")) {
      this.password = await bcrypt.hash(this.password, salt_rounds);
    }
  } catch (error) {
    console.log(error);
  }
});
UserModel.methods.comparePassword = function (pass) {
  return bcrypt.compare(pass, this.password);
};

module.exports = mongoose.model("User", UserModel);
