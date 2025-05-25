console.debug("Deleting User...");

const dbConnection = require("../../database.js");

async function deletionOfUser(username) {
  const sqlQuery = "DELETE FROM userHub WHERE username = ?";
  const values = [username];
  try {
    const deleteUser = await dbConnection.query(sqlQuery, values);
    return deleteUser;
  } catch (error) {
    throw error;
  }
}

module.exports = deletionOfUser;
