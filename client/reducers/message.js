/**
 * Represents a book.
 * @class
 * @param {objects} state - The state of the store.
 * @param {object} action - The action of the store.
 */
export default function message(state = {}, action) {
  switch (action.type) {
    case 'COMPOSE_MESSAGE':
      return Object.assign({}, state, { messageData: action.messageData });
    case 'RETRIEVE_MESSAGE':
      return Object.assign({}, state, { messageData: action.retrieveMessages });
    case 'CLEAR_RETRIEVED_MESSAGE':
      return Object.assign({}, state, { messageData: action.messageData });
    case 'GET_NOTIFICATION':
      return Object.assign({}, state,
        { notificationData: action.notificationData });
    case 'UPDATE_NOTIFICATION':
      return Object.assign({}, state,
        { notificationData: action.notificationData });
    case 'CLEAR_NOTIFICATION':
      return Object.assign({}, state,
        { notificationData: action.notificationData });
    case 'USERS_WHO_HAVE_READ_MESSAGE':
      return Object.assign({}, state,
        { usersWhoHaveReadMessage: action.usersWhoHaveReadMessage });
    default:
      return state;
  }
}
