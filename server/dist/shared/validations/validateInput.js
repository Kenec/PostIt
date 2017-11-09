'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = validateInput;

var _validator = require('validator');

var _validator2 = _interopRequireDefault(_validator);

var _isEmpty = require('lodash/isEmpty');

var _isEmpty2 = _interopRequireDefault(_isEmpty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * validateInput - description
 * @param  {object} inputData the form data to be validated
 * @return {object}  {} containing error and isValid
 */
function validateInput(inputData) {
  var errors = {};

  // validate username field
  if (inputData.username) {
    if (_validator2.default.isEmpty(inputData.username)) {
      errors.username = 'Username is required';
    } else if (!_validator2.default.isAlphanumeric(inputData.username)) {
      errors.username = 'Username can only be string';
    }
  }

  // validate phone field
  if (inputData.phone) {
    if (_validator2.default.isEmpty(inputData.phone)) {
      errors.phone = 'Phone number is required';
    }
  }

  // validation for valid phone number
  if (inputData.phone) {
    if (!_validator2.default.isMobilePhone(inputData.phone, 'any')) {
      errors.phone = 'Phone number is invalid';
    }
  }

  // validation for valid email
  if (inputData.email) {
    if (_validator2.default.isEmpty(inputData.email)) {
      errors.email = 'Email is required';
    }
    if (!_validator2.default.isEmail(inputData.email)) {
      errors.email = 'Email is invalid';
    }
  }

  // validation for empty password
  if (inputData.password) {
    if (_validator2.default.isEmpty(inputData.password)) {
      errors.password = 'Password is required';
    } else if (!_validator2.default.isAlphanumeric(inputData.password)) {
      errors.password = 'Password can only contain Alphanumerics';
    }
  }
  // check if password and retype password is the same
  if (inputData.repassword) {
    if (_validator2.default.isEmpty(inputData.repassword)) {
      errors.confirmPassword = 'Confirm Password';
    } else if (!_validator2.default.isAlphanumeric(inputData.password)) {
      errors.password = 'Confirm Password can only contain Alphanumberics';
    }
    if (!_validator2.default.equals(inputData.password, inputData.repassword)) {
      errors.confirmPassword = 'Password did not match';
    }
  }

  // validate message input
  if (inputData.message) {
    if (_validator2.default.isEmpty(inputData.message)) {
      errors.message = 'Message field is required';
    }
  }

  // validate priority level
  if (inputData.priorityLevel) {
    if (_validator2.default.isEmpty(inputData.priorityLevel)) {
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
    if (_validator2.default.isEmpty(inputData.groupName)) {
      errors.groupName = 'groupName is required';
    }
  }

  return {
    errors: errors,
    isValid: (0, _isEmpty2.default)(errors)
  };
}