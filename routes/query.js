const router = require("express").Router();
const db = require("../db");
const studentValidations = require('../validations/student');

router.get("/", (req, res) => {
  res.send("sms_demo working");
});

router.post("/", (req, res) => {
  res.send("sms_demo working");
});

router.get("/student_details", (req, res) => {
  // return all student details
  db.query(`SELECT * FROM sms_student_details`, (error, results, fields) => {
    if (error) {
      return res.status(500).send('ERROR');
    }
    console.log("results length", results.length);
    res.status(200).json(results);
  });
});

router.post("/student_details", (req, res) => {
  const student = req.body;
  // create a student details row
  const isValid = studentValidations.validateStudent(student);
  if (!isValid) return res.status(400).send('ERROR');
  db.query(`INSERT INTO sms_student_details (
    firstName,
    lastName,
    nationality,
    email,
    mobileNo,
    birthDate,
    religion,
    bloodGroup,
    gender,
    maritalStatus,
    presVillage,
    presPO,
    presUpazilla,
    presDistrict,
    permVillage,
    permPO,
    permUpazilla,
    permDistrict,
    fatherFirstName,
    fatherLastName,
    fatherProfession,
    fatherMobileNo,
    motherFirstName,
    motherLastName,
    motherProfession,
    motherMobileNo
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [
      student.studentDetails.firstName,
      student.studentDetails.lastName,
      student.studentDetails.nationality,
      student.studentDetails.email,
      student.studentDetails.mobileNo,
      student.studentDetails.birthDate,
      student.studentDetails.religion,
      student.studentDetails.bloodGroup,
      student.studentDetails.gender,
      student.studentDetails.maritalStatus,
      student.studentDetails.presVillage,
      student.studentDetails.presPO,
      student.studentDetails.presUpazilla,
      student.studentDetails.presDistrict,
      student.studentDetails.permVillage,
      student.studentDetails.permPO,
      student.studentDetails.permUpazilla,
      student.studentDetails.permDistrict,
      student.parentDetails.father.firstName,
      student.parentDetails.father.lastName,
      student.parentDetails.father.profession,
      student.parentDetails.father.mobileNo,
      student.parentDetails.mother.firstName,
      student.parentDetails.mother.lastName,
      student.parentDetails.mother.profession,
      student.parentDetails.mother.mobileNo
  ], (error, results, fields) => {
    if (error) {
        console.log(error.message)
          return res.status(500).send("ERROR");
        }
        console.log("results", results);
        if (results && results.insertId) {
          res.send("OK");
        }
  });
});

module.exports = router;
