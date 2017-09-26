/* global localStorage */
// import
import axios from 'axios';
import jwt from 'jsonwebtoken';
import config from '../../server/config';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import { SET_CURRENT_USER } from './types';

/**
 * setCurrentUser - sets the current user
 *
 * @param  {object} user description
 * @return {object}      user object
 */
export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user
  };
}


/**
 * logout - description
 *
 * @return {object}  description
 */
export function logout() {
  return (dispatch) => {
    localStorage.removeItem('jwtToken');
    setAuthorizationToken(false);
    dispatch(setCurrentUser({}));
  };
}

/**
 * logout - description
 *
 * @return {object}  description
 */
export function isLoggedIn() {
  let isUserLoggedIn = false;
  const localJWT = localStorage.getItem('jwtToken');
  if (localJWT && jwt.verify(localJWT, config.jwtSecret)) {
    isUserLoggedIn = true;
  }
  return isUserLoggedIn;
}

/**
 * userSigninRequestAction - description
 *
 * @param  {object} data userdata for firing signin action
 * @return {type}      description
 */
export function userSigninRequestAction(data) {
  return dispatch => axios.post('/api/v1/user/signin', data).then((res) => {
    const token = res.data.token;
    localStorage.setItem('jwtToken', token);
    setAuthorizationToken(token);
    dispatch(setCurrentUser(jwt.decode(token)));
  });
}
