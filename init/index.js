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

// OK
let sms_attendances = `CREATE TABLE IF NOT EXISTS sms_attendances (
  id int(12) NOT NULL AUTO_INCREMENT,
  date date NOT NULL,
  class varchar(16) NOT NULL,
  \`group\` varchar(64),
  subject varchar(64) NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB`;

// OK
let sms_attendances_students = `CREATE TABLE IF NOT EXISTS sms_attendances_students (
  attId int(12) NOT NULL,
  studentId int(12) NOT NULL,
  rollNo varchar(12) NOT NULL,
  status varchar(64) NOT NULL,
  notes varchar(255),
  INDEX (attId)
) ENGINE=InnoDB`;

// OK
let sms_teachers = `CREATE TABLE IF NOT EXISTS sms_teachers (
  id int(12) NOT NULL AUTO_INCREMENT,
  name varchar(255) NOT NULL,
  mobileNo varchar(12) NOT NULL,
  email varchar(255),
  subject varchar(64) NOT NULL,
  gender varchar(16) NOT NULL,
  addVillage varchar(64) NOT NULL,
  addPO varchar(64) NOT NULL,
  addUpazilla varchar(64) NOT NULL,
  addDistrict varchar(64) NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB`;

// OK
let sms_year_exams = `CREATE TABLE IF NOT EXISTS sms_year_exams(
  id INT(12) NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  PRIMARY KEY(id)
) ENGINE = INNODB`;

// OK
let sms_subject_exams = `CREATE TABLE IF NOT EXISTS sms_subject_exams(
  id INT(12) NOT NULL AUTO_INCREMENT,
  class VARCHAR(32) NOT NULL,
  \`group\` VARCHAR(64) NOT NULL,
  subject VARCHAR(64) NOT NULL,
  yxid INT(12) NOT NULL,
  date DATE NOT NULL,
  marks VARCHAR(4) NOT NULL,
  highest VARCHAR(4) NOT NULL,
  PRIMARY KEY(id),
  INDEX(yxid),
  INDEX(class)
) ENGINE = INNODB`;

// OK
let sms_marks = `CREATE TABLE IF NOT EXISTS sms_marks(
  rollNo VARCHAR(12) NOT NULL,
  marks VARCHAR(3) NOT NULL,
  yxid INT(12) NOT NULL,
  sxid INT(12) NOT NULL,
  studentId int(12) NOT NULL,
  INDEX(yxid),
  INDEX(sxid),
  INDEX(studentId)
) ENGINE = INNODB`;
