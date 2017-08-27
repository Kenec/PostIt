import { CREATE_GROUP,
  GET_USER_GROUPS, SEARCH_ALL_USERS,
  GET_GROUPS_CREATED_BY_USER,
  GET_USERS_IN_GROUP

} from '../actions/types';
/**
 * group - group reducer
 *
 * @param  {object} state the state from the store
 * @param  {object} action the action from every dispatch
 * @return {object} group function reducer returns object  --   description
 */
export default function group(state = {}, action) {
  switch (action.type) {
    case CREATE_GROUP:
      return Object.assign({}, state, { groupData: action.groupData });
    case GET_USER_GROUPS:
      return Object.assign({}, state, { groups: action.groups });
    case GET_GROUPS_CREATED_BY_USER:
      return Object.assign({}, state, { groupsByUser: action.groupsByUser });
    case GET_USERS_IN_GROUP:
      return Object.assign({}, state, { usersInGroup: action.usersInGroup });
    case SEARCH_ALL_USERS:
      return Object.assign({}, state, { searchedUsers: action.users });
    default:
      return state;
  }
}
