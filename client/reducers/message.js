
export default function message(state={}, action) {
  switch (action.type) {
    case "COMPOSE_MESSAGE":
        return Object.assign({}, state, {messageData: action.messageData})
    case "RETRIEVE_MESSAGE":
        return Object.assign({}, state, {messageData: action.retrieveMessages})
    default:
      return state;

  }
}
