console.log("Viewing all users...");

const dbConnection = require("../../database.js");

async function getAllUsers() {
  const sqlQuery = "SELECT * FROM userHub";
  try {
    const users = await dbConnection.query(sqlQuery);
    return users[0];
  } catch (error) {
    throw error;
  }
}

module.exports = getAllUsers;
