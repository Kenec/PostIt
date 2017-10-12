// import
import axios from 'axios';

/**
 * @function forgotPasswordRequest
 * @param  {string} email - user email requesting password reset
 * @return {json} - axios post response
 */
export function forgotPasswordRequest(email) {
  return () => axios.post('/api/v1/users/resetpassword', email);
}
/**
 * @function isValidToken
 * @param  {string} token - token generated for the user for password reset
 * @return {json} - axios post response
 */
export function isValidToken(token) {
  return () => axios.get(`/api/v1/users/resetpassword/${token}`);
}
/**
 * @function updatePassword
 * @param  {string} token - token generated for the user for password reset
 * @param {object} updatePasswordDetail - contains the email and the new password
 * @return {json} - axios post response
 */
export function updatePassword(token, updatePasswordDetail) {
  return () => axios.post(`/api/v1/users/resetpassword/${token}`,
    updatePasswordDetail);
}
