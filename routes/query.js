const router = require("express").Router();
const db = require("../db")();

router.post("/", (req, res) => {
  db.query("SELECT 1 + 1 AS solution", function(error, results, fields) {
    if (error) {
      console.log(error);
      return res.send("ERROR");
    }
    res.send("The solution is: " + results[0].solution);
  });
});

module.exports = router;
