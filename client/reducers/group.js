import {
  CREATE_GROUP,
  GET_USER_GROUPS,
  SEARCH_ALL_USERS,
  GET_ADMIN_GROUPS,
  GET_USERS_IN_GROUP,
  GET_USER_ERROR,
  ADD_USER_ERROR,
  ADD_USER_TO_GROUPS
} from '../actions/types';

/**
 * @function group
 * @param  {object} state the state from the store
 * @param  {object} action the action from every dispatch
 * @return {object} group function reducer returns object  --   description
 */
export default function group(state = {}, action) {
  switch (action.type) {
    case CREATE_GROUP:
      return Object.assign({}, state,
        { groupData: action.groupData });
    case GET_USER_GROUPS:
      return Object.assign({}, state,
        { groups: action.groups });
    case GET_ADMIN_GROUPS:
      return Object.assign({}, state,
        { groupsBelonged: action.groupsBelonged });
    case ADD_USER_TO_GROUPS:
      return Object.assign({}, state,
        { usersInGroup: action.usersInGroup });
    case GET_USERS_IN_GROUP:
      return Object.assign({}, state,
        { usersInGroup: action.usersInGroup });
    case SEARCH_ALL_USERS:
      return Object.assign({}, state,
        { searchedUsers: action.users });
    case GET_USER_ERROR:
      return Object.assign({}, state,
        { getUsererror: action.error });
    case ADD_USER_ERROR:
      return Object.assign({}, state,
        { addUsererror: action.error });
    default:
      return state;
  }
}
