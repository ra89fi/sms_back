const router = require("express").Router();
const db = require("../../db");

router.get("/", (req, res) => {
  // return all exams
  db.query("SELECT * FROM sms_year_exams", (error, results, fields) => {
    if (error) {
      console.log(error.message);
      return res.status(500).send("ERROR");
    }
    console.log("results length", results.length);
    res.status(200).json(results);
  });
});

router.post("/", (req, res) => {
  const name = req.body.name;
  if (!name) return res.status(400).send("ERROR");
  db.query("INSERT INTO sms_year_exams (name) VALUES (?)", name, (error, results, fields) => {
    if (error) {
      console.log(error.message);
      return res.status(500).send("ERROR");
    }
    console.log("results", results);
    if (results && results.insertId) res.send("OK");
    else res.send("ERROR");
  });
});

router.post("/delete", (req, res) => {
  const id = req.body.id;
  if (!id) return res.status(400).send("ERROR");
  db.query("DELETE FROM sms_year_exams WHERE id=?", id, (error, results, fields) => {
    if (error) {
      console.log(error.message);
      return res.status(500).send("ERROR");
    }
    console.log("results", results);
    res.send("OK");
  });
});

module.exports = router;
