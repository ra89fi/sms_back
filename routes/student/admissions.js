const router = require("express").Router();
const db = require("../../db");

router.get("/all/:id", (req, res) => {
  // return all student admissions
  db.query(
    "SELECT * FROM sms_admissions WHERE studentId=?",
    req.params.id,
    (error, results, fields) => {
      if (error) {
        console.log(error.message);
        return res.status(500).send("ERROR");
      }
      console.log("results length", results.length);
      res.status(200).json(results);
    }
  );
});

router.get("/latest", (req, res) => {
  // return latest student admissions
  db.query(
    "SELECT * FROM sms_admissions s WHERE DATE IN(SELECT MAX(DATE) FROM sms_admissions WHERE s.studentId = sms_admissions.studentId) ORDER BY studentId",
    (error, results, fields) => {
      if (error) {
        console.log(error.message);
        return res.status(500).send("ERROR");
      }
      console.log("results length", results.length);
      res.status(200).json(results);
    }
  );
});

module.exports = router;
