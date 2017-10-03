// import
import axios from 'axios';

/**
 * userSignupRequest - signup request action
 *
 * @param  {type} userData userdata to signup
 * @return {type}          description
 */
/*eslint-disable*/
export function userSignupRequest(userData) {
  return () => axios.post('/api/v1/user/signup', userData);
}
