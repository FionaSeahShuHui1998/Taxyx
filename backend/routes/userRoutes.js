console.debug("Setting up user routes...");

const express = require("express");
const router = express.Router();

const createUserRoute = require("./user/create");
const deleteUserRoute = require("./user/delete");
const viewAllUsersRoute = require("./user/getAll");
const viewUserRoute = require("./user/getOne");
const editUserRoute = require("./user/edit");

router.post("/createNewUser", createUserRoute);
router.get("/deleteUser", deleteUserRoute);
router.get("/viewAllUsers", viewAllUsersRoute);
router.get("/viewUser", viewUserRoute);
router.post("/editUser", editUserRoute);

module.exports = router;
