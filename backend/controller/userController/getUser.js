console.debug("Viewing user...");

const dbConnection = require("../../database.js");
const { USERNAME_NOT_EXISTS } = require("../../utils/errors/errorCodes.js");
const checkUsernameExists = require("./checkUsername.js");

async function getUser(username) {
  const sqlQuery = "SELECT * FROM userHub WHERE username = ?";
  const values = [username];
  try {
    const usenameExist = await checkUsernameExists(username);
    if (!usenameExist) {
      throw new Error(USERNAME_NOT_EXISTS);
    }
    const user = await dbConnection.query(sqlQuery, values);
    return user[0];
  } catch (error) {
    throw error;
  }
}

module.exports = getUser;
