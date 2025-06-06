console.debug("Deleting User...");

const dbConnection = require("../../database.js");
const { USERNAME_NOT_EXISTS } = require("../../utils/errors/errorCodes.js");
const checkUsernameExists = require("./checkUsername.js");

async function deleteUser(username) {
  const sqlQuery = "DELETE FROM userHub WHERE username = ?";
  const values = [username];
  try {
    const usenameExist = await checkUsernameExists(username);
    if (!usenameExist) {
      throw new Error(USERNAME_NOT_EXISTS);
    }
    const deleteUser = await dbConnection.query(sqlQuery, values);
    console.log("User deleted successfully:", username);
    return deleteUser;
  } catch (error) {
    throw error;
  }
}

module.exports = deleteUser;
