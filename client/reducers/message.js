import {
  COMPOSE_MESSAGE,
  GET_NOTIFICATION,
  RETRIEVE_MESSAGE,
  RETRIEVE_MESSAGE_ERROR,
  READ_BY,
  CLEAR_RETRIEVED_MESSAGE,
  UPDATE_NOTIFICATION,
  CLEAR_NOTIFICATION,
  COMPOSE_MESSAGE_ERROR,
  COMPOSE_MESSAGE_SUCCESS
} from '../actions/types';

/**
 * @function message
 * @param  {object} state = {} message state
 * @param  {object} action action that is dispatched
 * @return {object} returns state object for the action type
 */
export default function message(state = {}, action) {
  switch (action.type) {
    case COMPOSE_MESSAGE:
      return Object.assign({}, state, { messageData: action.messageData });
    case RETRIEVE_MESSAGE:
      return Object.assign({}, state, { messageData: action.retrieveMessages });
    case CLEAR_RETRIEVED_MESSAGE:
      return Object.assign({}, state, { messageData: action.messageData });
    case GET_NOTIFICATION:
      return Object.assign({}, state,
        { notificationData: action.notificationData });
    case UPDATE_NOTIFICATION:
      return Object.assign({}, state,
        { notificationData: action.notificationData });
    case CLEAR_NOTIFICATION:
      return Object.assign({}, state,
        { notificationData: action.notificationData });
    case READ_BY:
      return Object.assign({}, state,
        { readBy: action.readBy });
    case COMPOSE_MESSAGE_ERROR:
      return Object.assign({}, state,
        { messageError: action.error });
    case RETRIEVE_MESSAGE_ERROR:
      return Object.assign({}, state,
        { error: action.error });
    case COMPOSE_MESSAGE_SUCCESS:
      return Object.assign({}, state,
        { messageSuccess: action.success });
    default:
      return state;
  }
}
