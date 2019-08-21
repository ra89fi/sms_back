const router = require("express").Router();
const db = require("../../db");
const studentValidations = require("../../validations/student");

router.get("/", (req, res) => {
  // return all student details
  db.query("SELECT * FROM sms_student_details", (error, results, fields) => {
    if (error) {
      console.log(error.message);
      return res.status(500).send("ERROR");
    }
    console.log("results length", results.length);
    res.status(200).json(results);
  });
});

router.post("/", (req, res) => {
  const student = req.body;
  // create a student details row
  const isValid = studentValidations.validateStudent(student);
  if (!isValid) return res.status(400).send("ERROR");
  const sd = student.studentDetails;
  const pd = student.parentDetails;
  try {
    db.beginTransaction(err => {
      if (err) throw err;
      db.query(
        "INSERT INTO sms_student_details (firstName, lastName, nationality, email, mobileNo, birthDate, religion, bloodGroup, gender, maritalStatus, presVillage, presPO, presUpazilla, presDistrict, permVillage, permPO, permUpazilla, permDistrict, fatherFirstName, fatherLastName, fatherProfession, fatherMobileNo, motherFirstName, motherLastName, motherProfession, motherMobileNo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
          sd.firstName,
          sd.lastName,
          sd.nationality,
          sd.email,
          sd.mobileNo,
          sd.birthDate,
          sd.religion,
          sd.bloodGroup,
          sd.gender,
          sd.maritalStatus,
          sd.presVillage,
          sd.presPO,
          sd.presUpazilla,
          sd.presDistrict,
          sd.permVillage,
          sd.permPO,
          sd.permUpazilla,
          sd.permDistrict,
          pd.father.firstName,
          pd.father.lastName,
          pd.father.profession,
          pd.father.mobileNo,
          pd.mother.firstName,
          pd.mother.lastName,
          pd.mother.profession,
          pd.mother.mobileNo
        ],
        (error, results, fields) => {
          if (error) {
            return db.rollback(() => {
              throw error;
            });
          }

          console.log("student " + results.insertId + " added");
          const { group, rollNo, school } = student;

          db.query(
            "INSERT INTO sms_admissions (studentId, class, `group`, rollNo, school) VALUES (?, ?, ?, ?, ?)",
            [results.insertId, student.class, group, rollNo, school],
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

router.get("/:id", (req, res) => {
  const id = req.params.id;
  if (!id) return res.status(400).send("ERROR");
  // return student with id as id
  db.query("SELECT * FROM sms_student_details WHERE id=", id, (error, results, fields) => {
    if (error) {
      console.log(error.message);
      return res.status(500).send("ERROR");
    }
    console.log("results length", results.length);
    res.status(200).json(results);
  });
});

router.post("/:id", (req, res) => {
  const id = req.params.id;
  if (!id) return res.status(400).send("ERROR");
  // update student with id as id
  const student = req.body;
  const isValid = studentValidations.validateStudentDetails(student);
  if (!isValid) return res.status(400).send("ERROR");
  db.query(
    "UPDATE sms_student_details SET firstName=?, lastName=?, nationality=?, email=?, mobileNo=?, birthDate=?, religion=?, bloodGroup=?, gender=?, maritalStatus=?, presVillage=?, presPO=?, presUpazilla=?, presDistrict=?, permVillage=?, permPO=?, permUpazilla=?, permDistrict=? WHERE id=?",
    [
      student.firstName,
      student.lastName,
      student.nationality,
      student.email,
      student.mobileNo,
      student.birthDate,
      student.religion,
      student.bloodGroup,
      student.gender,
      student.maritalStatus,
      student.presVillage,
      student.presPO,
      student.presUpazilla,
      student.presDistrict,
      student.permVillage,
      student.permPO,
      student.permUpazilla,
      student.permDistrict,
      id
    ],
    (error, results, fields) => {
      if (error) {
        console.log(error.message);
        return res.status(500).send("ERROR");
      }
      console.log("results", results);
      if (results && results.affectedRows) {
        res.send("OK");
      } else res.status(500).send("ERROR");
    }
  );
});

router.post("/delete/:id", (req, res) => {
  const id = req.params.id;
  if (!id) return res.status(400).send("ERROR");
  try {
    db.beginTransaction(err => {
      if (err) throw err;
      db.query("DELETE FROM sms_student_details WHERE id=?", id, (error, results, fields) => {
        if (error) {
          return db.rollback(() => {
            throw error;
          });
        }

        console.log(results.affectedRows + " student(s) deleted");

        db.query("DELETE FROM sms_admissions WHERE studentId=?", id, (error, results, fields) => {
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
        });
      });
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("ERROR");
  }
  // db.query("DELETE FROM sms_student_details WHERE id=?", id, (error, results, fields) => {
  //   if (error) {
  //     console.log(error.message);
  //     return res.status(500).send("ERROR");
  //   }
  //   console.log("results", results);
  //   if (results && results.affectedRows) {
  //     res.send("OK");
  //   } else res.status(500).send("ERROR");
  // });
});

module.exports = router;
