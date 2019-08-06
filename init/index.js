const connection = require("../db");

let query = `CREATE TABLE IF NOT EXISTS sms_users (
  id int(12) NOT NULL AUTO_INCREMENT,
  username varchar(32) NOT NULL,
  email varchar(255) NOT NULL,
  password varchar(1024) NOT NULL,
  date datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
 ) ENGINE=InnoDB`;

// connection.query(query, function(error, results, fields) {
//   if (error) throw error;
//   console.log(results, fields);
// });
