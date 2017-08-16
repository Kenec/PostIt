import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

/**
 * validateInput - description
 *
 * @param  {object} data the form data to be validated
 * @return {object}  {} containing error and isValid
 */
export default function validateInput(data) {
  const errors = {};

  // validate username field
  if (data.username) {
    if (Validator.isEmpty(data.username)) {
      errors.username = 'Username is required';
    }
  }

  // validate phone field
  if (data.phone) {
    if (Validator.isEmpty(data.phone)) {
      errors.phone = 'Phone number is required';
    }
  }

  // validation for valid phone number
  if (data.phone) {
    if (!Validator.isMobilePhone(data.phone, 'any')) {
      errors.phone = 'Phone number is invalid';
    }
  }

  // validation for valid email
  if (data.email) {
    if (Validator.isEmpty(data.email)) {
      errors.email = 'Email is required';
    }
    if (!Validator.isEmail(data.email)) {
      errors.email = 'Email is invalid';
    }
  }

  // validation for empty password
  if (data.password) {
    if (Validator.isEmpty(data.password)) {
      errors.password = 'Password is required';
    }
  }
  // check if password and retype password is the same
  if (data.repassword) {
    if (Validator.isEmpty(data.repassword)) {
      errors.confirmPassword = 'Confirm Password';
    }
    if (!Validator.equals(data.password, data.repassword)) {
      errors.confirmPassword = 'Password did not match';
    }
  }


  return {
    errors,
    isValid: isEmpty(errors)
  };
}
