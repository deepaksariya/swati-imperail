var express = require('express');
var router = express.Router();
var session = require('express-session');
const AuthController=require('../controllers/AuthController')
router.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.post('/signup',AuthController.signup);
router.post('/login',AuthController.userLogin);
router.post("/forget-password", AuthController.ForgetPassword);
router.get("/reset-password", AuthController.ResetPassword);
//admin login signup
module.exports = router;
