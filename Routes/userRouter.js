const mongoose = require("mongoose");
const epxress = require("express");
const router = epxress.Router();


/* 
signup
login
update credentials(whole))
reset password
get user by id
get all users
*/

router.post("/sigup");
router.post("/login");
router.post("/update_credentials");
router.post("/reset_password/:u_id");
router.post("/get_user/:u_id");
router.post("/get_all_user");

module.exports = router;