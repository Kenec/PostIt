/**
 * Represents a book.
 * @class
 * @param {objects} state - The state of the store.
 * @param {object} action - The action of the store.
 */
export default function message(state = {}, action) {
  switch (action.type) {
    case 'COMPOSE_MESSAGE':
      return Object.assign({}, state, { messageData: action.messageData })
    case 'RETRIEVE_MESSAGE':
      return Object.assign({}, state, { messageData: action.retrieveMessages })
    default:
      return state;
  }
}
