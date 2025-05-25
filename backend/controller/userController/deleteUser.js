console.debug("Deleting User...");

const dbConnection = require("../../database.js");
const { USERNAME_NOT_EXISTS } = require("../../utils/errorCodes.js");
const checkIfUsernameExists = require("./checkUsernameExist.js");

async function deletionOfUser(username) {
  const sqlQuery = "DELETE FROM userHub WHERE username = ?";
  const values = [username];
  try {
    const usenameExist = await checkIfUsernameExists(username);
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

module.exports = deletionOfUser;
