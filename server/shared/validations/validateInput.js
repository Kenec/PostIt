import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

/**
 * validateInput - description
 *
 * @param  {object} inputData the form data to be validated
 * @return {object}  {} containing error and isValid
 */
export default function validateInput(inputData) {
  const errors = {};

  // validate username field
  if (inputData.username) {
    if (Validator.isEmpty(inputData.username)) {
      errors.username = 'Username is required';
    }
  }

  // validate phone field
  if (inputData.phone) {
    if (Validator.isEmpty(inputData.phone)) {
      errors.phone = 'Phone number is required';
    }
  }

  // validation for valid phone number
  if (inputData.phone) {
    if (!Validator.isMobilePhone(inputData.phone, 'any')) {
      errors.phone = 'Phone number is invalid';
    }
  }

  // validation for valid email
  if (inputData.email) {
    if (Validator.isEmpty(inputData.email)) {
      errors.email = 'Email is required';
    }
    if (!Validator.isEmail(inputData.email)) {
      errors.email = 'Email is invalid';
    }
  }

  // validation for empty password
  if (inputData.password) {
    if (Validator.isEmpty(inputData.password)) {
      errors.password = 'Password is required';
    }
  }
  // check if password and retype password is the same
  if (inputData.repassword) {
    if (Validator.isEmpty(inputData.repassword)) {
      errors.confirmPassword = 'Confirm Password';
    }
    if (!Validator.equals(inputData.password, inputData.repassword)) {
      errors.confirmPassword = 'Password did not match';
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
}
