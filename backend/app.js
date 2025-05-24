console.log("Starting app.js...");
console.log("app.js successfully started.");

const database = require("./database");
const express = require("express");

const app = express();
const userRoutes = require("./routes/userRoute");

app.use(express.json());
app.use("/", userRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
