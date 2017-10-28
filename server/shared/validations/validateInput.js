import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

/**
 * validateInput - description
 * @param  {object} inputData the form data to be validated
 * @return {object}  {} containing error and isValid
 */
export default function validateInput(inputData) {
  const errors = {};

  // validate username field
  if (inputData.username) {
    if (Validator.isEmpty(inputData.username)) {
      errors.username = 'Username is required';
    } else if (!Validator.isAlphanumeric(inputData.username)) {
      errors.username = 'Username can only be string';
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
    } else if (!Validator.isAlphanumeric(inputData.password)) {
      errors.password = 'Password can only contain Alphanumerics';
    }
  }
  // check if password and retype password is the same
  if (inputData.repassword) {
    if (Validator.isEmpty(inputData.repassword)) {
      errors.confirmPassword = 'Confirm Password';
    } else if (!Validator.isAlphanumeric(inputData.password)) {
      errors.password = 'Confirm Password can only contain Alphanumberics';
    }
    if (!Validator.equals(inputData.password, inputData.repassword)) {
      errors.confirmPassword = 'Password did not match';
    }
  }

  // validate message input
  if (inputData.message) {
    if (Validator.isEmpty(inputData.message)) {
      errors.message = 'Message field is required';
    }
  }

  // validate priority level
  if (inputData.priorityLevel) {
    if (Validator.isEmpty(inputData.priorityLevel)) {
      errors.priorityLevel = 'Priority level is required';
    }
  }

  // validate sentBy
  if (inputData.sentBy) {
    if (inputData.sentBy === '') {
      errors.sentBy = 'sentBy is required';
    }
  }

  // validate readBy
  if (inputData.readBy) {
    if (inputData.readBy === '') {
      errors.readBy = 'readBy is required';
    }
  }

  // validate groupName
  if (inputData.groupName) {
    if (Validator.isEmpty(inputData.groupName)) {
      errors.groupName = 'groupName is required';
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
}
