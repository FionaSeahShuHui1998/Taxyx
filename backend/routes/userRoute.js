console.debug("Setting up user routes...");

const express = require("express");
const router = express.Router();

const creationOfNewUser = require("../controller/userController/createNewUser");
const deletionOfUser = require("../controller/userController/deleteUser");
const errorCodes = require("../utils/errorCodes");
const {
  viewingAllUsers,
  viewingUser,
} = require("../controller/userController/viewAllUsers");

router.post("/createUser", async (req, res) => {
  const { username, password, email, firstName, lastName, role } = req.body;

  if (!username || !password || !email || !firstName || !lastName || !role) {
    return res
      .status(400)
      .json({ error: "Please provide all required fields." });
  }

  try {
    await creationOfNewUser(
      username,
      password,
      email,
      firstName,
      lastName,
      role
    );
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
});

router.get("/deleteUser", async (req, res) => {
  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ error: "Username is required." });
  }

  try {
    await deletionOfUser(username);
    res.status(200).json({ message: "User deleted successfully." });
  } catch (error) {
    if (error.message === errorCodes.USERNAME_NOT_EXISTS) {
      return res.status(404).json({ error: "Username does not exist." });
    }
    console.error("Error deleting user:", error.message);
    res.status(500).json({ error: "Failed to delete user." });
  }
});

router.get("/viewAllUsers", async (req, res) => {
  try {
    const userTable = await viewingAllUsers();
    res.status(200).json(userTable);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to retrieve users. " + error.message });
  }
});

router.get("/viewUser", async (req, res) => {
  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ error: "Username is required." });
  }

  try {
    const user = await viewingUser(username);
    res.status(200).json(user[0]);
  } catch (error) {
    if (error.message === errorCodes.USERNAME_NOT_EXISTS) {
      return res.status(404).json({ error: "Username does not exist." });
    }
    res.status(500).json({ error: "Failed to retrieve user." });
  }
});

module.exports = router;
