/* global localStorage */
import axios from 'axios';
import jwt from 'jsonwebtoken';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import { setCurrentUser } from '../actions/signinActions';

/**
 * Signup a user
 * @function signup
 * @param  {object} userData - user data to signup
 * @return {json} - json response from the server
 */
const signup = userData => (
  dispatch => axios.post('/api/v1/users/signup', userData)
    .then((response) => {
      const token = response.data.token;
      localStorage.setItem('jwtToken', token);
      setAuthorizationToken(token);
      const { username, id } = jwt.decode(token);
      dispatch(setCurrentUser({ username, id }));
    })
);

export default signup;
