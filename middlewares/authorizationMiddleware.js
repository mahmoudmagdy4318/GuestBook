const UserModel = require("../models/UserModel");

const authorizeToken = async function (req, res, next) {
  if (!req.headers.token)
    res.status(401).json({
      err:
        "authorization failed, You are not authorized to complete this action!",
    });
  else {
    const token = req.headers.token;
    try {
      const currentUser = await UserModel.getCurrentUserFromToken(token);
      req.currentUser = currentUser;
      next();
    } catch {
      res.status(401).json({ error: "Your session has been expired!" });
    }
  }
};

module.exports = authorizeToken;
