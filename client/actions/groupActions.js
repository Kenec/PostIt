// import
import axios from 'axios';
import { CREATE_GROUP,
  GET_USER_GROUPS,
  SEARCH_ALL_USERS,
  GET_ADMIN_GROUPS,
  ADD_USER_TO_GROUPS,
  GET_USERS_IN_GROUP
} from './types';

/**
 * @function createGroupAction
 * @param {object} groupData - The group data return from creating a group.
 * @return {object} - object of type CREATE_Group and groupData
 */
export function createGroupAction(groupData) {
  return {
    type: CREATE_GROUP,
    groupData
  };
}
/**
 * @function getuserGroupsAction
 * @param {object} groupData - The group data return from creating a group.
 * @return {object} - object of type GET_USER_GROUPS and groups
 */
export function getuserGroupsAction(groupData) {
  return {
    type: GET_USER_GROUPS,
    groups: groupData
  };
}
/**
 * @function searchAllUsersAction
 * @param {object} usersData - The user data from search
 * @return {object} - object of type SEARCH_ALL_USER and users
 */
export function searchAllUsersAction(usersData) {
  return {
    type: SEARCH_ALL_USERS,
    users: usersData
  };
}
/**
 * @function getAdminGroupsAction
 * @param {object} groups - data of groups created by a particular user
 * @return {object} - object of type GET_ADMIN_GROUPS and groupBelonged
 */
export function getAdminGroupsAction(groups) {
  return {
    type: GET_ADMIN_GROUPS,
    groupsBelonged: groups
  };
}
/**
 * @function getUsersInGroupAction
 * @param {object} users - data of users in a group
 * @return {object} - object of type GET_USERS_IN_GROUP
 */
export function getUsersInGroupAction(users) {
  return {
    type: GET_USERS_IN_GROUP,
    usersInGroup: users
  };
}
/**
 * @function addUserToGroupsAction
 * @param {object} user - data of user to be added in a group
 * @return {object} - object of type ADD_USER_TO_GROUPS and userData
 */
export function addUserToGroupsAction(user) {
  return {
    type: ADD_USER_TO_GROUPS,
    userData: user
  };
}
/**
 * @function searchAllUsers 
 * @param {string} username - the username of the user being searched.
 * @param {number} offset - the offset
 * @return {json} -  axios post response
 */
export function searchAllUsers(username, offset) {
  return dispatch => axios.post(`/api/v1/users/${offset}`, username)
    .then((res) => {
      dispatch(searchAllUsersAction(res.data));
    });
}
/**
 * @function getUsersInGroup
 * @param {string} groupId - The groupid of a group.
 * @return {json} - axios get response
 */
export function getUsersInGroup(groupId) {
  return () => axios.get(`/api/v1/groups/${groupId}/users`);
}
/**
 * @function addUserToGroups
 * @param {string} groupId - The is the groupid.
 * @param {string} userId - The is the userId.
 * @return {json} - axios post response
 */
export function addUserToGroups(groupId, userId) {
  return () => axios.post(`/api/v1/groups/${groupId}/user`, userId);
}
/**
 * @function getUserInfo
 * @param {string} user - This is the userInfo data.
 * @return {json} - axios post response
 */
export function getUserInfo(user) {
  return () => axios.post('/api/v1/users/username', user);
}
/**
 * @function createGroup
 * @param {string} groupData - The is the group data for creating group.
 * @return {json} - axios post response
 */
export function createGroup(groupData) {
  return dispatch => axios.post('/api/v1/groups', groupData).then(() => {
    dispatch(createGroupAction(groupData));
  }
  );
}
/**
 * @function getUserGroups
 * @param {string} user - user whose group is fetched
 * @return {json} - axios post response
 */
export function getUserGroups(user) {
  return dispatch => axios.post('/api/v1/user/groups', user).then((res) => {
    dispatch(getuserGroupsAction(res.data));
  });
}
/**
 * @function getAdminGroups
 * @param {string} user - The is the user whose group is fetched.
 * @return {json} - axios post response
 */
export function getAdminGroups(user) {
  return dispatch => axios.post('/api/v1/groups/creator', user).then((res) => {
    dispatch(getAdminGroupsAction(res.data));
  });
}
/** 
 * @function removeUserFromGroup
 * @param {integer} id 
 * @param {object} payLoad
 * @return {json} - axios post response
 */
export function removeUserFromGroup(id, payLoad) {
  return () => axios.post(`/api/v1/groups/${id}/users`, payLoad);
}
