
export default function group(state={}, action) {
  switch (action.type) {
    case "CREATE_GROUP":
        return Object.assign({}, state, {groupData: action.groupData})
    case "GET_USER_GROUPS":
        return Object.assign({}, state, {groups: action.groups})
    case "GET_GROUPS_CREATED_BY_USER":
        return Object.assign({}, state, {groupsByUser: action.groupsByUser})
    case "GET_USERS_IN_GROUP":
        return Object.assign({}, state, {usersInGroup: action.usersInGroup})

    default:
    return state;

  }
}
