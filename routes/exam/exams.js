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

router.post("/sxid", (req, res, next) => {
  if (!req.body.class) return res.status(400).send("ERROR");
  const { group, subject, date, data, marks, highest, yxid } = req.body;
  if (!subject || !date || !marks || !highest || !yxid) return res.status(400).send("ERROR");
  if (typeof data != "object") return res.status(400).send("ERROR");
  if (Object.keys(data).length === 0) return res.status(400).send("ERROR");
  if (req.body.class == "9" || req.body.class == "10") {
    if (!group) return res.status(400).send("ERROR");
  }
  // all OK
  // create subject_exams instance then batch insert student marks
  try {
    db.beginTransaction(err => {
      if (err) throw err;
      db.query(
        "INSERT INTO sms_subject_exams (date, class, `group`, subject, yxid, marks, highest) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [date, req.body.class, group, subject, yxid, marks, highest],
        (error, results, fields) => {
          if (error) {
            return db.rollback(() => {
              throw error;
            });
          }

          console.log("sms_subject_exams instance " + results.insertId + " added");
          // prepare data
          const values = Object.keys(data).map(rollNo => {
            const { studentId, marks, yxid } = data[rollNo];
            return [results.insertId, studentId, marks, rollNo, yxid];
          });

          db.query(
            "INSERT INTO sms_marks (sxid, studentId, marks, rollNo, yxid) VALUES ?",
            [values],
            (error, results, fields) => {
              if (error) {
                return db.rollback(() => {
                  throw error;
                });
              }
              db.commit(err => {
                if (err) {
                  return db.rollback(() => {
                    throw err;
                  });
                }
                console.log("success!");
                res.send("OK");
              });
            }
          );
        }
      );
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("ERROR");
  }
});

module.exports = router;
