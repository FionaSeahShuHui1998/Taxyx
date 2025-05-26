console.debug("Setting up delete user route...");

const express = require("express");
const router = express.Router();

const deleteUser = require("../../controller/userController/deleteUser");
const errorCodes = require("../../utils/errors/errorCodes");

async function deleteUserRoute(req, res) {
  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ error: "Username is required." });
  }

  try {
    await deleteUser(username);
    res.status(200).json({ message: "User deleted successfully." });
  } catch (error) {
    if (error.message === errorCodes.USERNAME_NOT_EXISTS) {
      return res.status(404).json({ error: "Username does not exist." });
    }
    console.error("Error deleting user:", error.message);
    res.status(500).json({ error: "Failed to delete user." });
  }
}

module.exports = deleteUserRoute;
