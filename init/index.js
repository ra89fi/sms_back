const connection = require("../db");

// OK
let sms_users = `CREATE TABLE IF NOT EXISTS sms_users (
  id int(12) NOT NULL AUTO_INCREMENT,
  username varchar(32) NOT NULL,
  email varchar(255) NOT NULL,
  password varchar(1024) NOT NULL,
  date datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
 ) ENGINE=InnoDB`;

// connection.query(sms_users, function(error, results, fields) {
//   if (error) throw error;
//   console.log(results, fields);
// });

// OK
let sms_student_details = `CREATE TABLE IF NOT EXISTS sms_student_details (
  id int(12) NOT NULL AUTO_INCREMENT,
  date datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  firstName varchar(32) NOT NULL,
  lastName varchar(32) NOT NULL,
  nationality varchar(255) NOT NULL,
  email varchar(255),
  mobileNo varchar(12) NOT NULL,
  birthDate date NOT NULL,
  religion varchar(32) NOT NULL,
  bloodGroup varchar(8),
  gender varchar(16) NOT NULL,
  maritalStatus varchar(16) NOT NULL,
  presVillage varchar(64) NOT NULL,
  presPO varchar(64) NOT NULL,
  presUpazilla varchar(64) NOT NULL,
  presDistrict varchar(64) NOT NULL,
  permVillage varchar(64) NOT NULL,
  permPO varchar(64) NOT NULL,
  permUpazilla varchar(64) NOT NULL,
  permDistrict varchar(64) NOT NULL,
  fatherFirstName varchar(32) NOT NULL,
  fatherLastName varchar(32) NOT NULL,
  fatherProfession varchar(32) NOT NULL,
  fatherMobileNo varchar(12),
  motherFirstName varchar(32) NOT NULL,
  motherLastName varchar(32) NOT NULL,
  motherProfession varchar(32) NOT NULL,
  motherMobileNo varchar(12),
  PRIMARY KEY (id),
  INDEX (email),
  INDEX (mobileNo)
) ENGINE=InnoDB`;

// OK
let sms_admissions = `CREATE TABLE IF NOT EXISTS sms_admissions (
  id int(12) NOT NULL AUTO_INCREMENT,
  date datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  studentId int(12) NOT NULL,
  class varchar(16) NOT NULL,
  \`group\` varchar(64),
  rollNo varchar(12) NOT NULL,
  school varchar(255) NOT NULL,
  PRIMARY KEY (id),
  INDEX (studentId)
) ENGINE=InnoDB`;

let sms_attendances = `CREATE TABLE IF NOT EXISTS sms_attendances (
  id int(12) NOT NULL AUTO_INCREMENT,
  date date NOT NULL,
  studentId int(12) NOT NULL,
  class varchar(16) NOT NULL,
  subject varchar(64) NOT NULL,
  status int(1) NOT NULL,
  PRIMARY KEY (id),
  INDEX (date)
)`;
