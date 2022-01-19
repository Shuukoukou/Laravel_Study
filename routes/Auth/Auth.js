/**
 * @description 登录注册路由集合
 * @author zhou
 * @date 2022-01-18
 */
const express = require ('express');
const router = express.Router();
const LoginController = require ('../../controllers/Auth/LoginController.js');
const RegisterController = require ('../../controllers/Auth/RegisterController.js');
const ConfirmPasswordController = require ('../../controllers/Auth/ConfirmPasswordController.js');
const ForgotPasswordController = require ('../../controllers/Auth/ForgotPasswordController.js');
const ResetPasswordController = require ('../../controllers/Auth/ResetPasswordController.js');
const UseTokenController = require ('../../controllers/Auth/UseTokenController.js');


const bodyParser=require("body-parser");
const jsonParser = bodyParser.json ();

router.post('/login', LoginController.login);

router.post('/register', RegisterController.register);

router.post('/confirmpassword', ConfirmPasswordController.confirmPassword);

router.post('/forgotPassword', ForgotPasswordController.forgotPassword);

router.post('/resetpassword', ResetPasswordController.resetPassword);

router.post('/usetoken',UseTokenController.useToken);


module.exports = router