const UserModel = require("../models/UsersModel");
module.exports = function userController() {
  const register = async (errors, req, res, next) => {
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const user = new UserModel(req.body);
    try {
      const newUser = await user.save();
      res.json({ newUser });
    } catch (err) {
      err.statusCode = 403;
      next(err);
    }
  };
  const login = () => {};
  return { register, login };
};
