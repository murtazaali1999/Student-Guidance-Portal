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
router.post("/update_credentials", userController.updateCredentials);
router.post("/get_reset_password_token", userController.getResetPasswordToken);
router.post("/reset/password", userController.resetPassword);
router.post("/get_user/:u_id", userController.getUser);
router.post("/get_all_user", userController.getAllUser);

module.exports = router;