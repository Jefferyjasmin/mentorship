// www.youtube.com/watch?v=BqclonOIRx4&list=PLanIiKDTgXLy4cZc5Ahfi_x443ZVKXb_5&index=15

const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateLoginInput(data) {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  if (Validator.isEmpty(data.email)) {
    errors.email = "email field is required";
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = "email field is  invalid";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "password field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
