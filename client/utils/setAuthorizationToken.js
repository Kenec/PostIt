import axios from 'axios';

/**
 * setAuthorizationToken - This function sets the authorization token to the
 * header of the browser with the name x-access-token
 * @param  {string} token token generated when a
 * user provides a valid credential for logging in
 * @return {void}
 */
const setAuthorizationToken = (token) => {
  if (token) {
    axios.defaults.headers.common['x-access-token'] = `${token}`;
  } else {
    delete axios.defaults.headers.common['x-access-token'];
  }
};

export default setAuthorizationToken;
