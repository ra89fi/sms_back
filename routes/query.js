const router = require("express").Router();

const studentDetailsRoute = require("./student/student_details");
const admissionsRoute = require("./student/admissions");
const attendancesRoute = require("./student/attendances");

router.get("/", (req, res) => {
  res.send("sms_demo working");
});

router.post("/", (req, res) => {
  res.send("sms_demo working");
});

router.use("/student_details", studentDetailsRoute);
router.use("/admissions", admissionsRoute);
router.use("/attendances", attendancesRoute);

module.exports = router;
