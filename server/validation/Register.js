const Validator = require("validator");
const isEmpty = require("./is-Empty");

const validateSignUpInput = (data) => {
  data.password = !isEmpty(data.password) ? data.password : "";
  data.email = !isEmpty(data.email) ? data.email : "";

  let errors = {};

  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is Required.";
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be more than 6 characters.";
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password is Required.";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

module.exports = validateSignUpInput;
