// import
import axios from 'axios';
import { CREATE_GROUP,
  GET_USER_GROUPS, SEARCH_ALL_USERS,
  GET_GROUPS_CREATED_BY_USER,
  ADD_USER_TO_GROUPS,
  GET_USERS_IN_GROUP

} from './types';

/**
 * Create Group Action method.
 * @constructor
 * @param {object} groupData - The group data return from creating a group.
 *
 */
export function createGroupAction(groupData) {
  return {
    type: CREATE_GROUP,
    groupData
  };
}

/**
 * Represents a book.
 * @constructor
 * @param {object} groupData - The group data return from creating a group.
 *
 */
export function getuserGroupsAction(groupData) {
  return {
    type: GET_USER_GROUPS,
    groups: groupData
  };
}

/**
 * Represents a book.
 * @constructor
 * @param {object} usersData - The user data retur
 * n from searching all user from a group.
 *
 */
export function searchAllUsersAction(usersData) {
  return {
    type: SEARCH_ALL_USERS,
    users: usersData
  };
}

/**
 * Represents a book.
 * @constructor
 * @param {object} data - data of groups created by a particular user
 * .
 *
 */
export function getGroupsCreatedByUserAction(data) {
  return {
    type: GET_GROUPS_CREATED_BY_USER,
    groupsByUser: data
  };
}
/**
 * Represents a book.
 * @constructor
 * @param {object} data - data of users in a group
 * .
 *
 */
export function getUsersInGroupAction(data) {
  return {
    type: GET_USERS_IN_GROUP,
    usersInGroup: data
  };
}
/**
 * Add user to a group action.
 * @constructor
 * @param {object} data - data of user to be added in a group
 * .
 *
 */
export function addUserToGroupsAction(data) {
  return {
    type: ADD_USER_TO_GROUPS,
    userData: data
  };
}

/**
 * Search for all user where a username is LIKE.
 * @constructor
 * @param {string} username - The is the username of the user being searhed.
 *  @param {Number} offset - the offset
 */
export function searchAllUsers(username, offset) {
  return dispatch => axios.post(`/api/v1/users/${offset}`, username)
    .then((res) => {
      dispatch(searchAllUsersAction(res.data));
    });
}

/**
 * Search for all user in a group.
 * @constructor
 * @param {string} groupId - The is the groupid.
 *
 */
export function getUsersInGroup(groupId) {
  return () => axios.get(`/api/v1/groups/${groupId}/users`);
}

/**
 * Search for all user in a group.
 * @constructor
 * @param {string} groupId - The is the groupid.
 * @param {string} userId - The is the userId.
 *
 */
export function addUserToGroups(groupId, userId) {
  return () => axios.post(`/api/v1/group/${groupId}/user`, userId);
}

/**
 * Search for all user in a group.
 * @constructor
 * @param {string} data - This is the userInfo data.
 *
 */
export function getUserInfo(data) {
  return () => axios.post('/api/v1/users/username', data);
}

/**
 * Create group function.
 * @constructor
 * @param {string} groupData - The is the group data for creating group.
 *
 */
export function createGroup(groupData) {
  return dispatch => axios.post('/api/v1/group', groupData).then(() => {
    dispatch(createGroupAction(groupData));
  }
  );
}
/**
 * Get users in group function.
 * @constructor
 * @param {string} user - The is the user whose group  which he belongs to
 * is fetched.
 *
 */
export function getUserGroups(user) {
  return dispatch => axios.post('/api/v1/users/me', user).then((res) => {
    dispatch(getuserGroupsAction(res.data));
  });
}
/**
 * Get groups created by a user function.
 * @constructor
 * @param {string} user - The is the user whose group is fetched.
 *
 */
export function getGroupsCreatedByUser(user) {
  return dispatch => axios.post('/api/v1/group/creator', user).then((res) => {
    dispatch(getGroupsCreatedByUserAction(res.data));
  });
}

/**
 * 
 * @param {integer} id 
 * @param {object} payLoad
 * @return {void}
 */
export function removeUserFromGroup(id, payLoad) {
  return () => axios.post(`/api/v1/group/${id}/removeuser`, payLoad);
}
