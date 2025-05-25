console.debug("Setting up user routes...");

const express = require("express");
const router = express.Router();

const creationOfNewUser = require("../controller/userController/createNewUser");

router.post("/createUser", (req, res) => {
  const { username, password, email, firstName, lastName, role } = req.body;

  if (!username || !password || !email || !firstName || !lastName || !role) {
    return res
      .status(400)
      .json({ error: "Please provide all required fields." });
  }

  creationOfNewUser(username, password, email, firstName, lastName, role);

  res.status(201).json({ message: "User creation requested." });
});

module.exports = router;
