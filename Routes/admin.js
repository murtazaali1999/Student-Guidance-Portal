const express = require("express");

const router = express.Router();

//Importing all Controllers
const adminController = require("../Controllers/adminController");

//Importing all Middleware
/* const adminMiddleware = require("../Middleware/adminMiddleware");
 */

//defining routes

router.get("/admin/addemployee", adminController.addEmployee);
router.get("/login", adminController.userLogin); //both user and admin can use this
router.post("/admin/createtask", adminController.createtask); //both for admin and BM
router.post("/admin/addboardmanager", adminController.addBoardManager);
router.post("/admin/edittaskname/:t_id", adminController.editTaskName);
router.post("/admin/edittaskstatus/:t_id", adminController.editTaskStatus);
router.post(
  "/admin/edittaskdescription/:t_id",
  adminController.editTaskDescription
);
module.exports = router;
