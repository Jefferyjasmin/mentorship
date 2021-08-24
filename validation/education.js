// www.youtube.com/watch?v=BqclonOIRx4&list=PLanIiKDTgXLy4cZc5Ahfi_x443ZVKXb_5&index=15
const { default: validator } = require("validator");
const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateExperienceInput(data) {
  let errors = {};

  data.school = !isEmpty(data.school) ? data.school : "";
  data.degree = !isEmpty(data.degree) ? data.degree : "";
  data.from = !isEmpty(data.from) ? data.from : "";
  data.fieldofstudy = !isEmpty(data.fieldofstudy) ? data.fieldofstudy : "";

  if (validator.isEmpty(data.school)) {
    errors.school = " School field is invalid";
  }

  if (validator.isEmpty(data.degree)) {
    errors.degree = "Degree field is invalid";
  }

  if (validator.isEmpty(data.from)) {
    errors.from = "From date field is invalid";
  }
  if (validator.isEmpty(data.fieldofstudy)) {
    errors.fieldofstudy = "Field of study date field is invalid";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
