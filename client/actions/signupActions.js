// import
import axios from 'axios';

/**
 * @function userSignupRequest
 * @param  {object} userData - user data to signup
 * @return {json} - json response from the server
 */
/*eslint-disable*/
export function userSignupRequest(userData) {
  return () => axios.post('/api/v1/users/signup', userData);
}
