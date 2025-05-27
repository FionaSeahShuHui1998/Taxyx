console.debug("Editing User...");

const bcrypt = require("bcryptjs");
const dbConnection = require("../../database.js");
const { VALID_ROLES } = require("../../utils/config/userConfig.js");
const errorCodes = require("../../utils/errors/errorCodes.js");
const {
  isValidPassword,
  isValidEmail,
} = require("../../utils/validators/index.js");
require("dotenv").config();

async function editUser(username, newData) {
  const fields = [];
  const values = [];
  if (newData.email) {
    if (!isValidEmail(newData.email)) {
      console.error("Invalid email format:", newData.email);
      throw new Error(errorCodes.INVALID_EMAIL);
    } else {
      fields.push("email = ?");
      values.push(newData.email);
    }
  }

  if (newData.password) {
    if (!isValidPassword(newData.password)) {
      console.error("Invalid password format:", newData.password);
      throw new Error(errorCodes.INVALID_PASSWORD);
    } else {
      const saltRounds = parseInt(process.env.SALT_ROUNDS);
      const newHashedPassword = await bcrypt.hash(newData.password, saltRounds);
      fields.push("password = ?");
      values.push(newHashedPassword);
    }
  }

  if (newData.role) {
    if (!VALID_ROLES.includes(newData.role)) {
      console.error("Invalid user role:", newData.role);
      throw new Error(errorCodes.INVALID_ROLE);
    } else {
      fields.push("role = ?");
      values.push(newData.role);
    }
  }

  if (!newData.email && !newData.password && !newData.role) {
    throw new Error(errorCodes.INVALID_UPDATE);
  }
  const sqlQuery = `UPDATE userHub SET ${fields.join(", ")} WHERE username = ?`;
  values.push(username);

  try {
    const [result] = await dbConnection.query(sqlQuery, values);
    return {
      message: "User updated successfully",
      affectedRows: result.affectedRows,
    };
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
}

module.exports = editUser;
