/* global localStorage */
// import
import axios from 'axios';
import jwt from 'jsonwebtoken';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import { SET_CURRENT_USER } from './types';

/**
 * Set current user in the store
 * @function setCurrentUser
 * @param  {object} user description
 * @return {object} - object of type SET_CURRENT_USER and user
 */
export const setCurrentUser = user => (
  {
    type: SET_CURRENT_USER,
    user
  }
);

/**
 * Logout a user 
 * @function logout
 * @return {object} - object user
 */
export const logout = () => (
  (dispatch) => {
    localStorage.removeItem('jwtToken');
    setAuthorizationToken(false);
    dispatch(setCurrentUser({}));
  }
);

/**
 * User signin request
 * @function userSigninRequestAction
 * @param  {object} userData userdata for firing signin action
 * @return {object} - user
 */
export const userSigninRequestAction = userData => (
  dispatch => axios.post('/api/v1/users/signin', userData)
    .then((res) => {
      const token = res.data.token;
      localStorage.setItem('jwtToken', token);
      setAuthorizationToken(token);
      const { username, id } = jwt.decode(token);
      dispatch(setCurrentUser({ username, id }));
    })
);
