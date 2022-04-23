const mongoose = require("mongoose");
const epxress = require("express");
const router = epxress.Router();

/* 
create Test
update test time(start + end)
update question(whole)
delete test(before start only)
get all tests
get single test
get test by type
get test by start time
submit test
participate in test
endtest by cron count points of all tests of candidate
starttest by cron 
*/

const testController = require("../Controllers/testController");

router.post("/create_test", testController.createTest);
router.post("/update_test_time/:t_id", testController.updateTestTime);
router.post("/update_questions/:t_id", testController.updateQuestions);
router.post("/delete_test/:t_id", testController.deleteTest);
router.get("/get_all_test", testController.getAllTest);
router.get("/get_single_test/:t_id", testController.getSingleTest);
router.post("/get_test_by_type", testController.getTestsByType);
router.post("/get_test_by_start_time", testController.getTestByStartTime);
router.post("/submit_test/:u_id/:t_id", testController.submitTest);
router.post("/participate_in_test/:u_id", testController.participateInTest);

//cron in APP, this is callback, just call this from app.js
router.post("/start_test");
router.post("/end_test");

module.exports = router;