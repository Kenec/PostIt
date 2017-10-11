import { COMPOSE_MESSAGE,
  GET_NOTIFICATION, RETRIEVE_MESSAGE,
  USERS_WHO_HAVE_READ_MESSAGE,
  CLEAR_RETRIEVED_MESSAGE,
  UPDATE_NOTIFICATION,
  CLEAR_NOTIFICATION
} from '../actions/types';


/**
 * message - message reducer dunction
 *
 * @param  {object} state = {} message state
 * @param  {object} action     action that is dispatched
 * @return {object}            returns state object for the action type
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
    case USERS_WHO_HAVE_READ_MESSAGE:
      return Object.assign({}, state,
        { usersWhoHaveReadMessage: action.usersWhoHaveReadMessage });
    default:
      return state;
  }
}
