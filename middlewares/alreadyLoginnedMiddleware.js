const checkForLoginned = function (req, res, next) {
  if (req.headers.token)
    res.status(409).json({ error: "you are already loginned!" });
  next();
};

module.exports = checkForLoginned;
