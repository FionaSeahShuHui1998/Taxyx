console.debug("Setting up view all users route...");

const express = require("express");
const router = express.Router();

const viewingAllUsers = require("../../controller/userController/getAllUsers.js");

async function getAllUserRoute(req, res) {
  try {
    const users = await viewingAllUsers();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error retrieving users:", error.message);
    res.status(500).json({ error: "Failed to retrieve users." });
  }
}

module.exports = getAllUserRoute;
