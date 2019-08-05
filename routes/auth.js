const router = require("express").Router();

router.post("/register", (req, res) => {
  // validate and register user
  res.send("register");
});

router.post("/login", (req, res) => {
  // validate and login user
  res.send("login");
});

module.exports = router;
