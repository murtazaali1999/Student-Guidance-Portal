const express = require("express");

const router = express.Router();

//Importing all Controllers
const taskController = require("../controllers/taskController");

/* 
//Importing all Middleware
const adminMiddleware = require("../middlewares/adminMiddleware"); */

//defining routes
router.get("/task/gettaskbyid/:t_id", taskController.getTaskById);
router.get("/task/getallapprovedtasks", taskController.getAllApprovedRequest); //gets all task from approved-task with status aproved
router.get("/task/getallrejecttasks", taskController.getAllRejectRequest); //gets all rejected tasks from approved-task
router.get("/task/getallpendingtasks", taskController.getAllPendingRequest); //gets all pending tass from approved-task
router.get(
  "/task/getapprovedtaskbyid/:t_id",
  taskController.getApprovedRequestById
);

module.exports = router;
