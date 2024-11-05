const Validator = require("validator");
const isEmpty = require("./is-Empty");
const signinValidation = (data) => {
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  let errors = {};

  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is Required.";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password is Required.";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

module.exports = signinValidation;
