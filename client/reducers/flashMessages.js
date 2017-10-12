// import shortid from 'shortid';
import findIndex from 'lodash/findIndex';
import { ADD_FLASH_MESSAGE, DELETE_FLASH_MESSAGE } from '../actions/types';

/**
 * @function flashMessages
 * @param  {array} state = []  state of the flash message reducer
 * @param  {object} action = {} action dispatched
 * @return {array}             returns array of state object
 */
export default function flashMessages(state = [], action = {}) {
  switch (action.type) {
    // add flash message reducer
    case ADD_FLASH_MESSAGE: {
      return [
        ...state,
        {
          id: 1, // shortid.generate(),
          type: action.message.type,
          text: action.message.text
        }
      ];
    }
    // delete flash message reducer
    case DELETE_FLASH_MESSAGE: {
      const index = findIndex(state, { id: action.id });
      if (index >= 0) {
        return [
          ...state.slice(0, index),
          ...state.slice(index + 1)
        ];
      }
      return state;
    }
    default:
      return state;
  }
}
