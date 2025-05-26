console.log("Viewing all users...");

const dbConnection = require("../../database.js");
const { USERNAME_NOT_EXISTS } = require("../../utils/errorCodes.js");
const checkIfUsernameExists = require("./checkUsernameExist.js");

async function viewingAllUsers() {
  const sqlQuery = "SELECT * FROM userHub";
  try {
    const users = await dbConnection.query(sqlQuery);
    return users[0];
  } catch (error) {
    throw error;
  }
}

async function viewingUser(username) {
  const sqlQuery = "SELECT * FROM userHub WHERE username = ?";
  const values = [username];
  try {
    const usenameExist = await checkIfUsernameExists(username);
    if (!usenameExist) {
      throw new Error(USERNAME_NOT_EXISTS);
    }
    const user = await dbConnection.query(sqlQuery, values);
    return user[0];
  } catch (error) {
    throw error;
  }
}

module.exports = {
  viewingAllUsers,
  viewingUser,
};
