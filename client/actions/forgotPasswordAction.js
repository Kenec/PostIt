// import
import axios from 'axios';

/**
 * Add forgotPassword token to user's token column
 * @function forgotPasswordRequest
 * @param  {string} email - user email requesting password reset
 * @return {json} - axios post response
 */
export const forgotPasswordRequest = email => (
  () => axios.post('/api/v1/users/resetpassword', email)
);

/**
 * Check if a token is valid
 * @function isValidToken
 * @param  {string} token - token generated for the user for password reset
 * @return {json} - axios post response
 */
export const isValidToken = token => (
  () => axios.get(`/api/v1/users/resetpassword/${token}`)
);

/**
 * Update users password in the database
 * @function updatePassword
 * @param  {string} token - token generated for the user for password reset
 * @param {object} updatePasswordDetail - the email and the new password
 * @return {json} - axios post response
 */
export const updatePassword = (token, updatePasswordDetail) => (
  () => axios.post(`/api/v1/users/resetpassword/${token}`,
    updatePasswordDetail)
);
