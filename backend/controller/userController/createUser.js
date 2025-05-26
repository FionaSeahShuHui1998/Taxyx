console.debug("Creating New User...");

require("dotenv").config();

const bcrypt = require("bcryptjs");
const dbConnection = require("../../database.js");
const errorCodes = require("../../utils/errors/errorCodes.js");
const { VALID_ROLES } = require("../../utils/config/userConfig.js");
const checkUsernameExists = require("./checkUsername.js");
const {
  isValidEmail,
  isValidFirstLastName,
  isValidPassword,
} = require("../../utils/validators/index.js");

async function createUser(
  username,
  password,
  email,
  firstName,
  lastName,
  role
) {
  // Check if password is valid
  if (!isValidPassword(password)) {
    console.error("Invalid password format:", password);
    throw new Error(errorCodes.INVALID_PASSWORD);
  }

  // Hashing of password
  const saltRounds = parseInt(process.env.SALT_ROUNDS);
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const sqlQuery =
    "INSERT INTO userHub (username, password, email, firstname, lastname, role) VALUES (?, ?, ?, ?, ?, ?)";
  const values = [username, hashedPassword, email, firstName, lastName, role];
  try {
    const usernameExists = await checkUsernameExists(username);
    // Check if username exist
    if (usernameExists) {
      throw new Error(errorCodes.USERNAME_EXISTS);
    }
    // Check if role is valid
    if (!VALID_ROLES.includes(role)) {
      throw new Error(errorCodes.INVALID_ROLE);
    }
    // Check if email is valid
    if (!isValidEmail(email)) {
      console.error("Invalid email format:", email);
      throw new Error(errorCodes.INVALID_EMAIL);
    }
    // Check if first name is valid
    if (!isValidFirstLastName(firstName)) {
      console.error("Invalid email format:", email);
      throw new Error(errorCodes.INVALID_FIRST_NAME);
    }
    // Check if last name is valid
    if (!isValidFirstLastName(lastName)) {
      console.error("Invalid first name format:", lastName);
      throw new Error(errorCodes.INVALID_LAST_NAME);
    }

    const createUserResult = await dbConnection.query(sqlQuery, values);
    return createUserResult;
  } catch (error) {
    throw error;
  }
}

module.exports = createUser;
