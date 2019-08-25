const router = require("express").Router();
const Joi = require("@hapi/joi");
const db = require("../../db");

router.get("/", (req, res) => {
  db.query("SELECT * FROM sms_users", (error, results, fields) => {
    if (error) {
      console.log(error.message);
      return res.status(500).send("ERROR");
    }
    console.log("results length", results.length);
    res.json(results);
  });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  if (!id) return res.status(400).send("ERROR");
  db.query("SELECT * FROM sms_users WHERE id=?", id, (error, results, fields) => {
    if (error) {
      console.log(error.message);
      return res.status(500).send("ERROR");
    }
    console.log("results length", results.length);
    res.json(results);
  });
});

router.post("/delete/:id", (req, res) => {
  const id = req.params.id;
  if (!id) return res.status(400).send("ERROR");
  db.query("DELETE FROM sms_users WHERE id=?", req.params.id, (error, results, fields) => {
    if (error) {
      console.log(error.message);
      return res.status(500).send("ERROR");
    }
    console.log(results);
    res.send("OK");
  });
});

module.exports = router;
