const dotenv = require("dotenv");
const mysql = require("mysql");

dotenv.config();

let connection;

module.exports = () => {
  if (!connection) {
    // these will come from ENV variables
    connection = mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: 3306
    });
  }
  return connection;
};
