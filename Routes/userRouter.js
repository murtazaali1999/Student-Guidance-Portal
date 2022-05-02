const mongoose = require("mongoose");
const epxress = require("express");
const router = epxress.Router();


/* 
signup
login
update credentials(whole))
reset password token
reset password
get user by id
get all users
*/

const userController = require("../Controllers/userController");

router.post("/sigup", userController.signup);
router.post("/login", userController.login);
router.post("/update_credentials/:u_id", userController.updateCredentials);
router.post("/get_reset_password_token", userController.getResetPasswordToken);
router.post("/reset/password", userController.resetPassword);
router.get("/get_user/:u_id", userController.getUser);
router.get("/get_all_user", userController.getAllUser);

module.exports = router;