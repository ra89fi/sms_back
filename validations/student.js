const Joi = require("@hapi/joi");

const studentRootSchema = {
  class: Joi.string().required(),
  group: Joi.any().optional(),
  rollNo: Joi.number()
    .integer()
    .required(),
  school: Joi.string().required(),
  studentDetails: Joi.any().required(),
  parentDetails: Joi.any().required()
  // previousExamDetails: Joi.any().required()
};

const studentDetailsSchema = {
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  nationality: Joi.string().required(),
  email: Joi.string().email({ minDomainSegments: 2 }),
  mobileNo: Joi.string()
    .regex(/^[0-9]+$/, "numbers")
    .min(11)
    .max(11)
    .required(),
  birthDate: Joi.date().required(),
  religion: Joi.string().required(),
  bloodGroup: Joi.any().optional(),
  gender: Joi.string().required(),
  maritalStatus: Joi.string().required(),
  presVillage: Joi.string().required(),
  presPO: Joi.string().required(),
  presUpazilla: Joi.string().required(),
  presDistrict: Joi.string().required(),
  permVillage: Joi.string().required(),
  permPO: Joi.string().required(),
  permUpazilla: Joi.string().required(),
  permDistrict: Joi.string().required()
};

const parentDetailsSchema = {
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  profession: Joi.any().optional(),
  mobileNo: Joi.any().optional()
};

// const previousExamSchema = {
//   nameOfExam: Joi.string()
//     .alphanum()
//     .min(1)
//     .required(),
//   group_subject: Joi.any().optional(),
//   institution: Joi.string()
//     .alphanum()
//     .min(1)
//     .required(),
//   board: Joi.any().optional(),
//   passingYear: Joi.any().optional(),
//   rollNo: Joi.number()
//     .integer()
//     .min(1)
//     .required(),
//   regNo: Joi.number()
//     .integer()
//     .min(1)
//     .required(),
//   gpa: Joi.any().optional(),
//   outOf: Joi.any().optional()
// };

const validateStudent = data => {
  let errors = [];
  errors.push(Joi.validate(data, studentRootSchema).error);
  errors.push(Joi.validate(data.studentDetails, studentDetailsSchema).error);
  errors.push(Joi.validate(data.parentDetails.father, parentDetailsSchema).error);
  errors.push(Joi.validate(data.parentDetails.mother, parentDetailsSchema).error);
  errors = errors.filter(error => error);
  console.log(errors.length);
  return !errors.length;
};

const validateStudentDetails = data => {
  const { error } = Joi.validate(data, studentDetailsSchema);
  return !error;
};

// const createErrorMsgObjFromErrors = errors => {
//   const obj = {};
//   errors.forEach(error => {
//     const err = error.details[0];
//     const name = err.path[0];
//     obj[name] = err.message
//   });
//   return obj;
// };

module.exports = {
  studentRootSchema,
  studentDetailsSchema,
  parentDetailsSchema,
  validateStudent,
  validateStudentDetails
  // createErrorMsgObjFromErrors
};
