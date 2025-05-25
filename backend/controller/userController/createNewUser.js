console.debug("Creating New User...");

const dbConnection = require("../../database.js");

function creationOfNewUser(
  username,
  password,
  email,
  firstName,
  lastName,
  role
) {
  const sqlQuery =
    "INSERT INTO userHub (username, password, email, firstname, lastname, role) VALUES (?, ?, ?, ?, ?, ?)";
  const values = [username, password, email, firstName, lastName, role];

  dbConnection.query(sqlQuery, values, (err, result) => {
    if (err) {
      console.error("Fail to create new user - ", err.message);
    } else {
      console.log("Succussfully created new user.");
    }
  });
}

module.exports = creationOfNewUser;
