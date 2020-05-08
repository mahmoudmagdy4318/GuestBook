const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const salt_rounds = Number(process.env.SALT_ROUNDS);
const jwt = require("jsonwebtoken");
const util = require("util");

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

//promisify jwt functions
const sign = util.promisify(jwt.sign);
const verify = util.promisify(jwt.verify);

//generate token
UserModel.methods.generateToken = function () {
  const token = sign(
    {
      username: JSON.stringify(this.username),
    },
    process.env.SECRET_KEY,
    { expiresIn: "1h" }
  );
  return token;
};

UserModel.statics.getCurrentUserFromToken = async function (token) {
  const payload = await verify(token, process.env.SECRET_KEY);
  const currentUser = await this.find({ username: payload.username });
  if (!currentUser) throw new Error("user not found!");
  return currentUser;
};

module.exports = mongoose.model("User", UserModel);
