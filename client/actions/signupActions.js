import axios from 'axios';

export function userSignupRequest(userData) {
  return dispatch => axios.post('/api/user/signup', userData);
}
