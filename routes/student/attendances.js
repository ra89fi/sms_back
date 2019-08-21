const router = require("express").Router();
const db = require("../../db");

router.post("/", (req, res, next) => {
  if (!req.body.class) return res.status(400).send("ERROR");
  const { group, subject, date, data } = req.body;
  if (!subject || !date) return res.status(400).send("ERROR");
  if (typeof data != "object") return res.status(400).send("ERROR");
  if (Object.keys(data).length === 0) return res.status(400).send("ERROR");
  if (req.body.class == "9" || req.body.class == "10") {
    if (!group) return res.status(400).send("ERROR");
  }
  // all OK
  // create attendance instance then batch insert student attendances
  try {
    db.beginTransaction(err => {
      if (err) throw err;
      db.query(
        "INSERT INTO sms_attendances (date, class, `group`, subject) VALUES (?, ?, ?, ?)",
        [date, req.body.class, group, subject],
        (error, results, fields) => {
          if (error) {
            return db.rollback(() => {
              throw error;
            });
          }

          console.log("attendance instance " + results.insertId + " added");
          // prepare data
          const values = Object.keys(data).map(rollNo => {
            const { studentId, status, notes } = data[rollNo];
            return [results.insertId, studentId, rollNo, status, notes];
          });

          db.query(
            "INSERT INTO sms_attendances_students (attId, studentId, rollNo, status, notes) VALUES ?",
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
