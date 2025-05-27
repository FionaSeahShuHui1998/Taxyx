console.debug("Setting up edit user route...");

const editUser = require("../../controller/userController/editUser");
const errorCodes = require("../../utils/errors/errorCodes");

async function editUserRoute(req, res) {
  const { username, email, password, role } = req.body;
  if (!username) {
    return res.status(400).json({ error: "Username is required." });
  }

  try {
    const updateData = {};
    if (!email && !password && !role) {
      throw new Error(errorCodes.INVALID_UPDATE);
    } else {
      if (email) updateData.email = email;
      if (password) updateData.password = password;
      if (role) updateData.role = role;
      await editUser(username, updateData);
      res.status(200).json({ message: "Successfuly update user." });
    }
  } catch (error) {
    if (error.message === errorCodes.INVALID_ROLE) {
      return res.status(400).json({ error: "Invalid user role." });
    }
    if (error.message === errorCodes.INVALID_EMAIL) {
      return res.status(400).json({ error: "Invalid email format." });
    }
    if (error.message === errorCodes.INVALID_PASSWORD) {
      return res.status(400).json({ error: "Invalid password format." });
    }
    if (error.message === errorCodes.INVALID_UPDATE) {
      return res
        .status(400)
        .json({ error: "Only can update password, email & role" });
    }
    "Error editing user:", error;
    res.status(500).json({ error: "Failed to edit user." });
  }
}

module.exports = editUserRoute;
