const express = require("express");
const app = express();
const mongoose = require("mongoose");
const MONGOURI = require("./Keys/keys").MONGOURI;
const PORT = 5533;

const admin = require("../game-train-checkin-app/Routes/admin");
const boardManager = require("../game-train-checkin-app/Routes/boardManager");
const employee = require("../game-train-checkin-app/Routes/employee");
const task = require("../game-train-checkin-app/Routes/task");

app.use(express.urlencoded({ extended: true }));
app.use(express.json({})); // for parsing json object, on POST/PUT request

app.use([admin, boardManager, employee, task]);

app.get("/", async (req, res) => {
  res.send(`<h1>Welcome</h1>`);
});

mongoose.connect(MONGOURI, () => {
  console.log("MongoDB connection made successfully");
  app.listen(PORT, async () => {
    console.log(`Server is running on port #${PORT}`);
  });
});
