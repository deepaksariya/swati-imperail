var validator = require("email-validator");
const validatePhoneNumber = require('validate-phone-number-node-js');
const { compareSync } = require("bcryptjs");
const moment = require('moment');
const request = require('request');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../config/default.json');
const multer = require('multer');
const path = require('path');
const userServices = require("../services/userServices");
const { mail } = require('../helper/mailer');
const { calculateHours,checkEmailOrMobile } = require('../helper/userHelper');
const Storage = multer.diskStorage({
    destination:'./public/uploadFile',
    filename:(req,file,cb)=>{
      cb(null,file.fieldname+"_"+Date.now()+path.extname(file.originalname))
    }
})

//middleware
const upload = multer({
    storage:Storage
}).single('file');


const signup = async function (req, res) {

    console.log("postmethod signup");
    console.log("req.body", req.body);
    var lowerCaseLetters = /[a-z]/g;
    var upperCaseLetters = /[A-Z]/g;
    var numbers = /[0-9]/g;
    let spChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;


    try {

        let firstName = req.body.firstName;
        let lastName = req.body.lastName;
        let email = req.body.email;
        //let phoneNumber=req.body.phoneNumber;
        let password = req.body.password;
        let confirm_password = req.body.confirm_password

        if (firstName == "" && lastName == "" && email == "" && password == "") {

            res.send({ status: false, message: "Please fill all details!" });

        } else if (firstName == "" || firstName == undefined) {

            res.send({ status: false, message: "Firstname is Required!" });

        } else if (spChars.test(firstName) || firstName.match(numbers)) {

            res.send({ status: false, message: "Firstname must not have special characters and numbers!" });


        }
        else if (lastName == "" || lastName == undefined) {

            res.send({ status: false, message: "Lastname is Required!" });

        } else if (spChars.test(lastName) || lastName.match(numbers)) {

            res.send({ status: false, message: "Lastname must not have special characters and numbers!" });


        }
        else if (email == "" || email == undefined) {
            res.send({ status: false, message: "Email is Required!" });

        } else if (!validator.validate(email)) {
            res.send({ status: false, message: "Please enter correct email!" });

            //   }else if(phoneNumber==""||phoneNumber==undefined){
            //     res.send( { status: false, message: "Phone is Required!" });

            //   }
            //   else if(!validatePhoneNumber.validate(phoneNumber)){

            //     res.send( { status: false, message: "Please enter correct phone!" });

        } else if (password == "" || password == undefined) {
            res.send({ status: false, message: "Password  is required!" });

        } else if (!password.match(lowerCaseLetters) || !password.match(upperCaseLetters) || !password.match(numbers) || password.length < 8) {

            res.send({ status: false, message: "Password must have at least 8 characters,at least one Lowercase ,one uppercase and one number!" });

        } else if (password != req.body.confirm_password) {
            res.send({ status: false, message: "Password and confirm password dose not matched!" });
        }

        let checkuser = await userServices.checkUser(email)
        if (checkuser) {
            console.log("User already exist")
            res.send({ status: false, message: "User already exist" });
        } else {


            console.log("password", password)

            let mystr = await userServices.createCipher(password);

            console.log("mystr", mystr)



            const userObj = {
                email: email.toLowerCase(),
                password: mystr,
                // mobile:phoneNumber,
                name: firstName,
                last_name: lastName,
                username: firstName + ' ' + lastName,
                user_role: 'user',
            };


            let user = userServices.createUser(userObj)
            console.log("user", user)
            if (user) {
                res.send({ status: true, data: user, message: "Signup Success" });
            } else {
                res.send({ status: true, data: null, message: "Signup Failed!" });
            }


        }
    } catch (error) {
        console.log("error", error)
        res.send({ status: false, message: "Something went wrong" });
    }
}




const userLogin = async (req, res) => {
  console.log('login post',req.body)
  let user = await userServices.checkUser(req.body.email);
  let password = req.body.password.trim();
  let mystr = await userServices.createCipher(password);
  console.log('dd',mystr)
  if (user) {
      if(req.body.password == "")
      {
          
          res.send({
              status:false,
              'message':'Please Enter Password.'
          })
      }
      if (user.email_verified == true) {
          let wallet = { success: 0, msg: "Account not activated please activate account before login" };
          let wallet_details = JSON.stringify(wallet);
          return res.send(wallet_details);
      }
      userObject = {
          name: user.name,
          email: user.email,
          created_at: user.created_at,
         // mobile: user.mobile,
          role: user.user_role,
          status: user.status,
      }
      let userLogin = await userServices.checkUserPass(req.body.email.trim(), mystr);
      console.log('userLogin',userLogin)
      
      if (userLogin) {
          if (userLogin.status == 'active' ) 
           {
            const _token = jwt.sign({
                success: true,
                re_admin_id: userLogin._id,
                re_admin_name: userLogin.name,
                re_admin_email: userLogin.email,
                is_admin_logged_in: true
            }, JWT_SECRET_KEY);
             await userServices.updateUserToken(_token,userLogin._id)
              res.send({
                  status:true,
                  user:userLogin,
                  token:_token,
                  'message':'Login successfull.'
              })
          } 
          else 
          {

              res.send({
                  status:false,
                  'message':'Your account is not active.'
              })
          }
      }
      else {
          res.send({
              status:false,
              'message':'The username or password is incorrect.'
          })
         
      }
  }
  else {
      res.send({
          status:false,
          'message':'Email does not exist.'
      })
  }
}

module.exports = {
    upload,
    userLogin,
    signup,

};
