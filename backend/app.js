console.log("==========================================================");
console.log("Starting app.js...");
console.log("app.js successfully started.");

require("dotenv").config();

console.log("Environment:", process.env.REACT_APP_ENV);
console.log("==========================================================");

if (process.env.REACT_APP_ENV === "Production") {
  console.debug = () => {};
  console.info = () => {};
  console.warn = () => {};
  console.error = () => {};
}

const express = require("express");
const app = express();

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

const database = require("./database");

const userRoutes = require("./routes/userRoutes");

app.use(express.json());

app.use("/", userRoutes);
