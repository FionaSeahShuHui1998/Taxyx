console.debug("Getting User Password...");

const dbConnection = require("../../database.js");
const errorCodes = require("../../utils/errors/errorCodes");
const checkUsernameExists = require("./checkUsername.js");

async function getUserPassword(username) {
  const sqlQuery = "SELECT password FROM userHub WHERE username = ?";
  const values = [username];
  try {
    const usernameExists = await checkUsernameExists(username);
    if (!usernameExists) {
      throw new Error(errorCodes.USERNAME_NOT_EXISTS);
    }
    const result = await dbConnection.query(sqlQuery, values);
    if (result.length === 0) {
      throw new Error(errorCodes.FAIL_RETRIEVE_PASSWORD);
    }
    return result[0][0].password;
  } catch (error) {
    throw error;
  }
}

module.exports = getUserPassword;
