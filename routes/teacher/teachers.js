const router = require("express").Router();
const Joi = require("@hapi/joi");
const db = require("../../db");

const teacherSchema = {
  name: Joi.string().required(),
  mobileNo: Joi.string()
    .regex(/^[0-9]+$/, "numbers")
    .min(11)
    .max(11)
    .required(),
  email: Joi.string().email({ minDomainSegments: 2 }),
  subject: Joi.string().required(),
  gender: Joi.string().required(),
  addVillage: Joi.string().required(),
  addPO: Joi.string().required(),
  addUpazilla: Joi.string().required(),
  addDistrict: Joi.string().required()
};

router.post("/", (req, res) => {
  // validate and save
  const teacher = req.body;
  const {
    name,
    mobileNo,
    email,
    subject,
    gender,
    addVillage,
    addPO,
    addUpazilla,
    addDistrict
  } = teacher;
  let error = Joi.validate(teacher, teacherSchema).error;
  if (error) return res.status(400).send("ERROR");
  db.query(
    "INSERT INTO sms_teachers (name, mobileNo, email, subject, gender, addVillage, addPO, addUpazilla, addDistrict) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [name, mobileNo, email, subject, gender, addVillage, addPO, addUpazilla, addDistrict],
    (error, results, fields) => {
      if (error) {
        console.log(error.message);
        return res.status(500).send("ERROR");
      }
      console.log("results", results);
      if (results && results.insertId) {
        res.send("OK");
      } else res.status(500).send("ERROR");
    }
  );
});

module.exports = router;
