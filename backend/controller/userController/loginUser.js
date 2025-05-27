console.debug("Logging in User...");

require("dotenv").config();

const bcrypt = require("bcryptjs");
const getUserPassword = require("./getUserPassword.js");

async function loginUser(username, enteredPassword) {
  try {
    const dbPassword = await getUserPassword(username);
    const compareResult = await bcrypt.compare(enteredPassword, dbPassword);
    return compareResult;
  } catch (error) {
    throw new Error("Failed to log in user: " + error.message);
  }
}

module.exports = loginUser;
