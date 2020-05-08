const UserModel = require("../models/UserModel");
module.exports = function authController() {
  //helper function to get specific user
  const getUser = async (userName) => {
    const user = await UserModel.findOne({ username: userName });
    return user;
  };

  //registration function
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
  //login function
  const login = async (req, res, next) => {
    const { username, password } = req.body;
    const user = await getUser(username);
    if (user) {
      const cmp = await user.comparePassword(password);
      if (cmp) {
        res.json(user);
      } else {
        res.status(403).json({ error: "invalid username or password" });
      }
    } else {
      res.status(403).json({ error: "user not found!" });
    }
  };

  return { register, login };
};
