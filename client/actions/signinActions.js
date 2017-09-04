// import
import axios from 'axios';
import jwt from 'jsonwebtoken';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import { SET_CURRENT_USER } from './types';

/**
 * setCurrentUser - sets the current user
 *
 * @param  {object} user description
 * @return {type}      description
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
 * @return {type}  description
 */
/*eslint-disable*/
export function logout() {
  return (dispatch) => {
    localStorage.removeItem('jwtToken');
    setAuthorizationToken(false);
    dispatch(setCurrentUser({}));
  };
}


/**
 * userSigninRequestAction - description
 *
 * @param  {object} data userdata for firing signin action
 * @return {type}      description
 */
export function userSigninRequestAction(data) {
  return dispatch => axios.post('/api/user/signin', data).then((res) => {
    const token = res.data.token;
    localStorage.setItem('jwtToken', token);
    setAuthorizationToken(token);
    dispatch(setCurrentUser(jwt.decode(token)));
  });
}
