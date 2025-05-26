console.debug("Settiting up view user route...");

const express = require("express");
const router = express.Router();

const viewingUser = require("../../controller/userController/getUser");
const errorCodes = require("../../utils/errors/errorCodes");

async function getUserRoute(req, res) {
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
    console.error("Error retrieving user:", error.message);
    res.status(500).json({ error: "Failed to retrieve user." });
  }
}

module.exports = getUserRoute;
