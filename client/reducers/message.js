
export default function message(state={}, action) {
  switch (action.type) {
    case "COMPOSE_MESSAGE":
        return Object.assign({}, state, {messageData: action.messageData})

    default:
      return state;

  }
}
