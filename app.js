const express = require("express");
const app = express();
const mongoose = require("mongoose");

const env = require("dotenv");

env.config({ path: "./.env" })

const MONGOURI = process.env.MONGOURI;
const PORT = process.env.PORT;

app.use(express.urlencoded({ extended: true }));
app.use(express.json({}));


/* app.use([]);
 */


app.get("/", async (req, res) => {
  res.send(`<h1>Welcome</h1>`);
});

mongoose.connect(MONGOURI, () => {
  console.log("MongoDB connection made successfully");
  app.listen(PORT, async () => {
    console.log(`Server is running on port #${PORT}`);
  });
});
