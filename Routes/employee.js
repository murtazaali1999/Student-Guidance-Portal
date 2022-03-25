const express = require("express");

const router = express.Router();

//Importing all Controllers
const employeeController = require("../controllers/employeeController");
/* 
//Importing all Middleware
const adminMiddleware = require("../middlewares/adminMiddleware"); */

//defining routes
router.post(
  "/employee/createrequest/:u_id/:t_id",
  employeeController.createRequest
); //adds task to approved task
router.post(
  "/employee/insertusernoterequest/:at_id",
  employeeController.insertUserNoteRequest
);

module.exports = router;
