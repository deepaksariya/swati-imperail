var mongoose = require('mongoose');

exports.required = async (element) => {
  if (element === '' || element == null || element === undefined) return true;
};

exports.validID = async (id) => {
  var ObjectId = mongoose.Types.ObjectId;
  if (!ObjectId.isValid(id)) return true;
};

exports.isString = async (element) => {
  var letters = /^[A-Za-z ]+$/;
  if (!element.match(letters)) return true;
};

exports.isNumber = async (element) => {
  var letters = /^[0-9]+$/;
  if (!element.toString().match(letters)) return true;
};

exports.isValidPhoneNumber = async (element) => {
  var letters = /^[6-9]{1}[0-9]{9}$/;
  if (!element.toString().match(letters)) return true;
};

exports.isBoolean = async (element) => {
  if (!(element === true || element === false || element === 'true' || element === 'false')) return true;
};

exports.minStringLength = async (element, len) => {
  if (element.toString().length < len) return true;
};

exports.maxStringLength = async (element, len) => {
  if (element.toString().length > len) return true;
};

exports.stringLength = async (element, len) => {
  if (element.toString().length !== len) return true;
};

exports.isBetweenNumber = async (element, start, end) => {
  if (Number(element) < start || Number(element) > end) return true;
};
exports.isDouble = async (element) => {
  var letters = /^[-+]?[0-9]*\.?[0-9]+$/;
  if (!element.toString().match(letters)) return true;
};

exports.isMatch = async (element1, element2) => {
  if (element1 != element2) return true;
};

exports.isStrongPassword = async (element) => {
  let password = /^^(?=.*[A-Za-z])(?=.*[A-Z])(?=.*\d)(?=.*[ !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~])[A-Za-z\d !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]{8,}$/;
  if (!password.test(element)) {
    return true;
  }
};

exports.isValidEmail = async (element) => {
  let email = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  if (!email.test(element)) {
    return true;
  }
};

exports.isValidLatitude = async (element) => {
  let latitude = /^-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,6}/;
  if (!latitude.test(element)) return true;
};

exports.isValidLongitude = async (element) => {
  let longitude = /^-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,6}/;
  if (!longitude.test(element)) return true;
};

exports.isValidDate = async (element) => {
  var pattern = /^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/;
  if (!pattern.test(element)) return true;
};

exports.isValidDate = async (element) => {
  var pattern = /^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/;
  if (!pattern.test(element)) return true;
};
