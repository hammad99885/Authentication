//register.js

const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};
  // check if the fields are empty or not
  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password_confirm = !isEmpty(data.password_confirm)
    ? data.password_confirm
    : "";

  // check if name has minimum length of 2 char and max of 30
  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "Name must be between 2 to 30 chars";
  }

  // check if name is not empty
  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }

  //check if email is a valid email
  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  // check if email is not empty
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email is required";
  }

  // check if password length is more than 6 and less than 30
  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must have 6 chars";
  }

  //check if password is not empty
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password is required";
  }

  //check if password-confirm length is more than 6 and less than 30
  if (!Validator.isLength(data.password_confirm, { min: 6, max: 30 })) {
    errors.password_confirm = "Password must have 6 chars";
  }

  //check if password-confirm is not empty
  if (!Validator.equals(data.password, data.password_confirm)) {
    errors.password_confirm = "Password and Confirm Password must match";
  }

  // check if password and password-confirm match with each other.
  if (Validator.isEmpty(data.password_confirm)) {
    errors.password_confirm = "Password is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
