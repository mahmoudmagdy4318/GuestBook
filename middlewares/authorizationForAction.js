const UserModel = require("../models/UserModel");

const authorizeUser = async function (req, res, next) {
  const { currentUser, userMessage } = req;
  if (currentUser.id == userMessage.user.id) {
    next();
  } else {
    res.status(401).json({
      err:
        "authorization failed, You are not authorized to complete this action!",
    });
  }
};

module.exports = authorizeUser;
