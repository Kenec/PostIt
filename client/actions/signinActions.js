/* global localStorage */
// import
import axios from 'axios';
import jwt from 'jsonwebtoken';
import config from '../../server/config';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import { SET_CURRENT_USER } from './types';

/**
 * @function setCurrentUser
 * @param  {object} user description
 * @return {object} - object of type SET_CURRENT_USER and user
 */
export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user
  };
}
/**
 * @function logout
 * @return {object} - object user
 */
export function logout() {
  return (dispatch) => {
    localStorage.removeItem('jwtToken');
    setAuthorizationToken(false);
    dispatch(setCurrentUser({}));
  };
}
/**
 * @function isLoggedIn
 * @return {boolean} - isUserLoggedIn
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
 * @function userSigninRequestAction
 * @param  {object} userData userdata for firing signin action
 * @return {object} - user
 */
export function userSigninRequestAction(userData) {
  return dispatch => axios.post('/api/v1/users/signin', userData).then((res) => {
    const token = res.data.token;
    localStorage.setItem('jwtToken', token);
    setAuthorizationToken(token);
    dispatch(setCurrentUser(jwt.decode(token)));
  });
}
