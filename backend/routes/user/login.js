console.debug("Setting up login user route...");

const loginUser = require("../../controller/userController/loginUser");
const errorCodes = require("../../utils/errors/errorCodes");

async function loginUserRoute(req, res) {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Please provide both username and password." });
  }

  try {
    const isAuthenticated = await loginUser(username, password);
    if (isAuthenticated) {
      return res.status(200).json({ message: "User logged in successfully." });
    } else {
      return res.status(401).json({ error: "Invalid username or password." });
    }
  } catch (error) {
    if (error.message === errorCodes.USERNAME_NOT_EXISTS) {
      return res.status(404).json({ error: "Username does not exist." });
    }
    console.error("Error logging in user:", error.message);
    res.status(500).json({ error: "Failed to log in user." });
  }
}

module.exports = loginUserRoute;
