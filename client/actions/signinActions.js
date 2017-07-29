import axios from 'axios';

export function userSigninRequestAction(data) {
    return dispatch => {
      return axios.post('/api/user/signin',data);
    }
}
