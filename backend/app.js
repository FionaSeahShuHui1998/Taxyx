console.log("Starting app.js...");
console.log("app.js successfully started.");

const database = require("./database");
const express = require("express");

const app = express();

app.use(express.json());

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
