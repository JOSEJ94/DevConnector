const validator = require("validator");
const isEmpty = require("./is_empty");

module.exports = function validatePostInput(data) {
  let errors = {};
  data.text = !isEmpty(data.text) ? data.text : "";
  if (!validator.isLength(data.text, { min: 6, max: 300 }))
    errors.text = "Text must be between 6 and 300 characters";
  if (validator.isEmpty(data.text)) errors.text = "Text field is required";
  return { errors, isValid: isEmpty(errors) };
};
