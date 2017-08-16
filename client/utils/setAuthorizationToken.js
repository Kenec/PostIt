import axios from 'axios';

/**
 * setAuthorizationToken - This function sets the authorization token to the
 * header of the browser with the name x-access-token
 *
 * @param  {type} token token generated when a user provides a valid credential
 * for logging in
 * @return {type}       description
 */
export default function setAuthorizationToken(token) {
  if (token) {
    // axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    axios.defaults.headers.common['x-access-token'] = `${token}`;
  } else {
    // delete axios.defaults.headers.common['Authorization'];
    delete axios.defaults.headers.common['x-access-token'];
  }
}
