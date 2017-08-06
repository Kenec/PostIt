import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default function validateInput (data) {
  let errors = {};

  if (Validator.isEmpty(data.username)) {
    errors.username = "Username is required";
  }
  if (Validator.isEmpty(data.phone)) {
    errors.phone = "Phone number is required";
  }
  if (!Validator.isMobilePhone(data.phone,'any')) {
    errors.phone = "Phone number is invalid";
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email is required";
  }
  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password is required";
  }
  if (Validator.isEmpty(data.repassword)) {
    errors.confirmPassword = "Confirm Password";
  }
  if(!Validator.equals(data.password, data.repassword)){
    errors.confirmPassword = "Password did not match";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
