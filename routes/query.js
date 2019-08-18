const router = require("express").Router();

const studentDetailsRoute = require("./student/student_details");

router.get("/", (req, res) => {
  res.send("sms_demo working");
});

router.post("/", (req, res) => {
  res.send("sms_demo working");
});

router.use("/student_details", studentDetailsRoute);

module.exports = router;
