import axios from 'axios';

/**
 * forgotPasswordRequest - description
 *
 * @param  {string} email The email of the user requesting for change
 * of password
 * @return {type}          description
 */
export function forgotPasswordRequest(email) {
  return () => axios.post('/api/user/resetpassword', email);
}

/**
 * ChangePasswordWithValidToken - description
 *
 * @param  {string} token token
 * @return {type}       description
 */
export function checkForValidToken(token) {
  return () => axios.get(`/api/user/resetpassword/${token}`);
}

/**
 * updatePassword - update password
 *
 * @param  {string} token description
 * @param {object} updatePasswordDetail contains the email and the new password
 * @return {type}       description
 */
export function updatePassword(token, updatePasswordDetail) {
  return () => axios.post(`/api/user/resetpassword/${token}`,
    updatePasswordDetail);
}
