import isEmpty from 'lodash/isEmpty';
import { SET_CURRENT_USER } from '../actions/types';

const initialState = {
  isAuthenticated: false,
  user: {}
};
/**
 * @function userLogin
 * @param  {object} state = initialState of the reducer
 * @param  {object} action = {} the action type that is dispatched
 * @return {object}  returns object of isAuthenticated and user
 */
export default function userLogin(state = initialState, action = {}) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        isAuthenticated: !isEmpty(action.user),
        user: action.user
      };
    default:
      return state;
  }
}
