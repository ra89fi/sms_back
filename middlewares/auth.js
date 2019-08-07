const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) return res.status(401).send("access_denied");
  try {
    const user = jwt.verify(token, process.env.TOKEN_SECRET);
    console.log(user);
    req.user = user;
    next();
  } catch (err) {
    res.status(400).send("invalid_token");
  }
};
