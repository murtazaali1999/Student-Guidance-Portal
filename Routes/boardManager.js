const express = require("express");

const router = express.Router();

//Importing all Controllers
const boardManagerController = require("../controllers/boardManagerController");

//Importing all Middleware
/* const adminMiddleware = require("../middlewares/adminMiddleware");
 */
//defining routes
router.post(
  "/boardmanager/createtask/:bm_id",
  boardManagerController.createtask
);
router.post(
  "/boardmanager/assignemployee/:u_id/:b_id",
  boardManagerController.assignEmployee
); //to BM board, pass task id in body
router.get(
  "/boardmanager/getallrequest",
  boardManagerController.getAllRequests
);
router.post(
  "/boardmanager/insertresponsenote/:at_id",
  boardManagerController.insertResponseNote
); //check task then user then back to manager

router.post(
  "/boardmanager/updaterequest/:at_id",
  boardManagerController.updateRequestStatus
);

router.post(
  "/boardmanager/updaterequest/:at_id",
  boardManagerController.updateRequestStatus
); //either of the app,rej etc

router.post(
  "/boardmanager/getboardmanagerbytask/:t_id",
  boardManagerController.getboardmanagerbytask
);

module.exports = router;
