const Validator = require("validator");
const isEmpty = require("./is-Empty");

const validateProductInput = (data) => {
  data.name = !isEmpty(data.name) ? data.name : "";
  data.imageUrl = !isEmpty(data.imageUrl) ? data.imageUrl : "";
  data.price = !isEmpty(data.price) ? data.price : "";

  let errors = {};

  if (Validator.isEmpty(data.name)) {
    errors.name = "Name is Required.";
  }

  if (!Validator.isEmail(data.imageUrl)) {
    errors.imageUrl = "Image is Required.";
  }
  if (Validator.isEmpty(data.price)) {
    errors.price = "Price is Required.";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

module.exports = validateProductInput;
