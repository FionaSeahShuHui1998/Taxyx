console.debug("Setting up create new user route...");

const express = require("express");
const router = express.Router();

const createUserRoute = require("../../controller/userController/createUser");
const errorCodes = require("../../utils/errors/errorCodes");

async function createNewUserRoute(req, res) {
  const { username, password, email, firstName, lastName, role } = req.body;

  if (!username || !password || !email || !firstName || !lastName || !role) {
    return res
      .status(400)
      .json({ error: "Please provide all required fields." });
  }

  try {
    await createUserRoute(username, password, email, firstName, lastName, role);
    res.status(201).json({ message: "User creation requested." });
  } catch (error) {
    if (error.message === errorCodes.USERNAME_EXISTS) {
      return res.status(409).json({ error: "Username already exists." });
    }
    if (error.message === errorCodes.INVALID_ROLE) {
      return res.status(400).json({ error: "Invalid user role." });
    }
    if (error.message === errorCodes.INVALID_EMAIL) {
      return res.status(400).json({ error: "Invalid email format." });
    }
    if (error.message === errorCodes.INVALID_FIRST_NAME) {
      return res.status(400).json({ error: "Invalid first name format." });
    }
    if (error.message === errorCodes.INVALID_LAST_NAME) {
      return res.status(400).json({ error: "Invalid last name format." });
    }
    if (error.message === errorCodes.INVALID_PASSWORD) {
      return res.status(400).json({ error: "Invalid password format." });
    }
    console.error("Error creating user:", error.message);
    res.status(500).json({ error: "Failed to create user." });
  }
}

module.exports = createNewUserRoute;
