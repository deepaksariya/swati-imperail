var aggregateHelper = require('../helper/searchHelper')
const { hashSync } = require("bcryptjs");
const moment = require("moment");
const crypto = require('crypto');
const { generateCode } = require('../helper/userHelper');
const {  UserInfo } = require('../models/userModel');
const { mail } = require('../helper/mailer');
const createCipher = async (text) => {
  let mykey1 = crypto.createCipher('aes-128-cbc', 'mypass');
  let mystr1 = mykey1.update(text, 'utf8', 'hex')
  mystr1 += mykey1.final('hex');
  return mystr1;
};
const addUser = async (userDetails, pass, created) => {
  const userObject = {
    name: userDetails.name,
    email: userDetails.email,
    password: pass,
    mobile: userDetails.mobile,
    image:'author-2.jpg'
  };
  try {
    const user = new UserInfo(userObject);
    await user.save();
    return userObject;
  } catch (error) {
    console.log(error)
    return null;
  }
};

const createUser = async (userData) => {
 
  try {
    console.log('registration data',userData)
    const user = new UserInfo(userData);
    await user.save();
    return  user;
  } catch (error) {
    console.log(error)
    return null;
  }
};

const checkUserId = async (user_id) => {
  let user = await UserInfo.findOne({ '_id': user_id });
  if (user) {
    return user;
  }
};

const checkUser = async (email) => {
  let user = await UserInfo.findOne({ 'email': email });
  if (user) {
    return user;
  }else{
    return false
  }
};

const findAdmin = async () => {
  let user = await UserInfo.findOne({ 'user_role':'admin' });
  if (user) {
    return user;
  }
};

const checkUserByID = async (user_id) => {
  let user = await UserInfo.findOne({ '_id':user_id });
  if (user) {
    return user;
  }
};



const checkUserPass = async (email, password) => {
  let user = await UserInfo.findOne({ 'email': email, 'password': password });
  if (user) {
    return user;
  }
};

const sendNewPasswordMail = async function (req, otp, user_id) {
  console.log(otp)
  let user = await Registration.findOne({ '_id': user_id });

  console.log(`ForgetPassword OTP generated for ${user.name}`);
  const subject = 'JUSTyours Forget Password'
  const reciever = `${user.email}`
  const message = `
      <h3> Hello ${user.name}, </h3>
      <p>Thank you for using JUSTyours.</p>
      <p>Here is your password please don't share this with anybody</p>
      <p> <h2>${otp}</h2></p>
      <p>You can change password once you login</p>
      <p>Team JUSTyours</p>`;
  let sendmail = await mail(reciever, subject, message);
  if (sendmail) {
    return true;
  }

}

const updateUserToken = async (token, id) => {
  let user = await UserInfo.updateOne({ '_id': id},{userToken:token});
  if (user) {
    return user;
  }
};
module.exports = {
  addUser,
  checkUserId,
  checkUser,
  checkUserPass,
  sendNewPasswordMail,
  checkUserByID,
  findAdmin,
  createUser,
  createCipher,
  updateUserToken,
};
