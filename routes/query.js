const router = require("express").Router();

router.post("/", (req, res) => {
  res.send("query");
});

module.exports = router;
