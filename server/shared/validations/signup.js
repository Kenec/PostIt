import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

/**
 * validateInput - description
 *
 * @param  {object} data description
 * @return {type}      description
 */
export default function validateInput(data) {
  const errors = {};

  if (data.username) {
    if (Validator.isEmpty(data.username)) {
      errors.username = 'Username is required';
    }
  }

  if (data.phone) {
    if (Validator.isEmpty(data.phone)) {
      errors.phone = 'Phone number is required';
    }
  }

  if (data.phone) {
    if (!Validator.isMobilePhone(data.phone, 'any')) {
      errors.phone = 'Phone number is invalid';
    }
  }

  if (data.email) {
    if (Validator.isEmpty(data.email)) {
      errors.email = 'Email is required';
    }
    if (!Validator.isEmail(data.email)) {
      errors.email = 'Email is invalid';
    }
  }

  if (data.password) {
    if (Validator.isEmpty(data.password)) {
      errors.password = 'Password is required';
    }
  }
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
