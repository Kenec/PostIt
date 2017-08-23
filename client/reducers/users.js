import isEmpty from 'lodash/isEmpty';
import { SET_CURRENT_USER } from '../actions/types';

const initialState = {
  isAuthenticated: false,
  user: {}
};

/**
 * Represents a book.
 * @constructor
 * @param {object} state - this is the state of the store.
 * @param {object} action - The action of the store.
 */
export default function userLoginReducer(state = initialState, action = {}) {
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
