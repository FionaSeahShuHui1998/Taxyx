console.debug("Checking if username exists...");

const dbConnection = require("../../database.js");

async function checkUsernameExists(username) {
  const sqlQuery = "SELECT * FROM userHub WHERE username = ?";
  const values = [username];

  try {
    const [result] = await dbConnection.query(sqlQuery, values);
    return result.length > 0;
  } catch (error) {
    throw error;
  }
}

module.exports = checkUsernameExists;
