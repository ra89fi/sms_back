const bcrypt = require("bcryptjs");
const Joi = require("@hapi/joi");
const jwt = require("jsonwebtoken");
const router = require("express").Router();
const db = require("../db");

const registerSchema = {
  username: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),
  email: Joi.string()
    .email({ minDomainSegments: 2 })
    .required(),
  password: Joi.string()
    .min(6)
    .max(30)
    .required(),
  password2: Joi.string()
    .min(6)
    .max(30)
    .required()
};

router.post("/register", async (req, res) => {
  console.log(req.body);
  // validate and register user
  const error = Joi.validate(req.body, registerSchema).error;
  if (error) {
    const err = error.details[0];
    const name = err.path[0];
    return res.status(400).json({ [name]: err.message });
  }
  const { username, email, password, password2 } = req.body;
  if (password !== password2) {
    return res.status(400).json({ password2: "passwords must match" });
  }
  // check for email
  let promise = new Promise((resolve, reject) => {
    db.query(`SELECT * FROM sms_users WHERE email = ?`, email, (error, results, fields) => {
      if (error) {
        reject({ status: 500, data: "ERROR" });
      }
      console.log("results", results);
      if (results.length) {
        reject({
          status: 400,
          data: { email: "email already exists" }
        });
      }
      resolve(true);
    });
  });
  const emailOk = await promise
    .then(msg => msg)
    .catch(err => {
      console.log("err", err);
      res.status(err.status).json(err.data);
    });
  console.log("emailOk", emailOk);
  if (!emailOk) return;
  // check for username
  promise = new Promise((resolve, reject) => {
    db.query(`SELECT * FROM sms_users WHERE username = ?`, username, (error, results, fields) => {
      if (error) {
        reject({ status: 500, data: "ERROR" });
      }
      console.log("results", results);
      if (results.length) {
        reject({
          status: 400,
          data: { username: "username already exists" }
        });
      }
      resolve(true);
    });
  });
  const usernameOk = await promise
    .then(msg => msg)
    .catch(err => {
      console.log("err", err);
      res.status(err.status).json(err.data);
    });
  console.log("usernameOk", usernameOk);
  if (!usernameOk) return;
  // all OK here, save into db
  if (emailOk && usernameOk) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    db.query(
      `INSERT INTO sms_users (username, email, password) values (?, ?, ?)`,
      [username, email, hashedPassword],
      (error, results, fields) => {
        if (error) {
          return res.status(500).send("ERROR");
        }
        console.log("results", results);
        if (results && results.insertId) {
          res.send("OK");
        }
      }
    );
  }
});

const loginSchema = {
  username: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),
  password: Joi.string()
    .min(6)
    .max(30)
    .required()
};

router.post("/login", async (req, res) => {
  console.log(req.body);
  // validate and login user
  const error = Joi.validate(req.body, loginSchema).error;
  if (error) {
    const err = error.details[0];
    const name = err.path[0];
    return res.status(400).json({ [name]: err.message });
  }
  const { username, password } = req.body;
  // check for username
  let promise = new Promise((resolve, reject) => {
    db.query(`SELECT * FROM sms_users WHERE username = ?`, username, (error, results, fields) => {
      if (error) {
        reject({ status: 500, data: "ERROR" });
      }
      console.log("results", results);
      if (!results.length) {
        reject({
          status: 400,
          data: { username: "username does not match" }
        });
      }
      resolve(results[0]);
    });
  });
  const user = await promise
    .then(msg => msg)
    .catch(err => {
      console.log("err", err);
      res.status(err.status).json(err.data);
    });
  console.log("user", user);
  if (!user) return;
  // compare password
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return res.status(400).json({ password: "password does not match" });
  // create and assign token
  const token = jwt.sign({ id: user.id }, process.env.TOKEN_SECRET);
  res.set({
    'Access-Control-Expose-Headers': 'Auth-Token',
    'Auth-Token': token
  }).send("OK");
});

module.exports = router;
