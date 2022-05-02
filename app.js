const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cron = require("node-cron");

const env = require("dotenv");// importer to use 

env.config({ path: "./.env" }) //giving path to .env file

const MONGOURI = process.env.MONGOURI; //MONGO-URI
const PORT = process.env.PORT; //PORT CONNECTINO

app.use(express.urlencoded({ extended: true })); //for post requests(HTML-FORMS)
app.use(express.json({})); //for post requests(JSON)

const testController = require("./Controllers/testController");

//Routers
const roadmap = require("./Routes/roadMapRouter");
const test = require("./Routes/testRouter");
const user = require("./Routes/userRouter");

//Registering Routes
app.use([user, test, roadmap]);


//default Page
app.get("/", async (req, res) => {
  res.send(`<h1>Welcome</h1>`);
});

//MongoDb Connection
mongoose.connect(MONGOURI, () => {
  console.log("MongoDB connection made successfully");
  app.listen(PORT, async () => {
    console.log(`Server is running on port #${PORT}`);
  });
});

//CRON Schedule Start and Stop Test
cron.schedule("*/15 * * * * *", testController.startTest);
cron.schedule("*/10 * * * * *", testController.endTest);