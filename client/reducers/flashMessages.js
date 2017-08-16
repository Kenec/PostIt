import shortid from 'shortid';
import findIndex from 'lodash/findIndex';
import { ADD_FLASH_MESSAGE, DELETE_FLASH_MESSAGE } from '../actions/types';

/**
 * flashMessages - description
 *
 * @param  {type} state = []  state of the flash message reducer
 * @param  {type} action = {} action dispatched
 * @return {type}             description
 */
export default function flashMessages(state = [], action = {}) {
  switch (action.type) {
    // add flash messgae reducer
    case ADD_FLASH_MESSAGE: {
      return [
        ...state,
        {
          id: shortid.generate(),
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
