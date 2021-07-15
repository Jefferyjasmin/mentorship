// www.youtube.com/watch?v=BqclonOIRx4&list=PLanIiKDTgXLy4cZc5Ahfi_x443ZVKXb_5&index=15
const { default: validator } = require("validator");
const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateExperienceInput(data) {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : "";
  data.company = !isEmpty(data.company) ? data.company : "";
  data.from = !isEmpty(data.from) ? data.from : "";

  if (validator.isEmpty(data.title)) {
    errors.title = "Job title field is invalid";
  }

  if (validator.isEmpty(data.company)) {
    errors.company = "Company field is invalid";
  }

  if (validator.isEmpty(data.from)) {
    errors.from = "From date field is invalid";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
