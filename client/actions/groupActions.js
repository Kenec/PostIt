// import
import axios from 'axios';
import { CREATE_GROUP, GET_USER_GROUPS,
  SEARCH_ALL_USERS, GET_ADMIN_GROUPS,
  ADD_USER_TO_GROUPS, GET_USERS_IN_GROUP } from './types';

/**
 * Add created group to the store
 * @function createGroupAction
 * @param {object} groupData - The group data return from creating a group.
 * @return {object} - object of type CREATE_Group and groupData
 */
export const createGroupAction = groupData => (
  {
    type: CREATE_GROUP,
    groupData
  }
);

/**
 * Get Groups from the store
 * @function getuserGroupsAction
 * @param {object} groupData - The group data return from creating a group.
 * @return {object} - object of type GET_USER_GROUPS and groups
 */
export const getuserGroupsAction = groupData => (
  {
    type: GET_USER_GROUPS,
    groups: groupData
  }
);

/**
 * Search All user
 * @function searchAllUsersAction
 * @param {object} usersData - The user data from search
 * @return {object} - object of type SEARCH_ALL_USER and users
 */
export const searchAllUsersAction = usersData => (
  {
    type: SEARCH_ALL_USERS,
    users: usersData
  }
);

/**
 * Get Groups created by a user
 * @function getAdminGroupsAction
 * @param {object} groups - data of groups created by a particular user
 * @return {object} - object of type GET_ADMIN_GROUPS and groupBelonged
 */
export const getAdminGroupsAction = groups => (
  {
    type: GET_ADMIN_GROUPS,
    groupsBelonged: groups
  }
);

/**
 * Get users in a group
 * @function getUsersInGroupAction
 * @param {object} users - data of users in a group
 * @return {object} - object of type GET_USERS_IN_GROUP
 */
export const getUsersInGroupAction = users => (
  {
    type: GET_USERS_IN_GROUP,
    usersInGroup: users
  }
);

/**
 * Add user to a group in the store
 * @function addUserToGroupsAction
 * @param {object} user - data of user to be added in a group
 * @return {object} - object of type ADD_USER_TO_GROUPS and userData
 */
export const addUserToGroupsAction = user => (
  {
    type: ADD_USER_TO_GROUPS,
    userData: user
  }
);

/**
 * Search user from the database
 * @function searchAllUsers
 * @param {string} username - the username of the user being searched.
 * @param {number} offset - the offset
 * @return {json} -  axios post response
 */
export const searchAllUsers = (username, offset) => (
  dispatch => axios.post(`/api/v1/users/${offset}`, username)
    .then((res) => {
      dispatch(searchAllUsersAction(res.data));
    })
);

/**
 * Get users in a group from the database
 * @function getUsersInGroup
 * @param {string} groupId - The groupid of a group.
 * @return {json} - axios get response
 */
export const getUsersInGroup = groupId => (
  () => axios.get(`/api/v1/groups/${groupId}/users`)
);

/**
 * Add user to a group
 * @function addUserToGroups
 * @param {string} groupId - The is the groupid.
 * @param {string} userId - The is the userId.
 * @return {json} - axios post response
 */
export const addUserToGroups = (groupId, userId) => (
  () => axios.post(`/api/v1/groups/${groupId}/user`, userId)
);

/**
 * Get user info by username from the database
 * @function getUserInfo
 * @param {string} user - This is the userInfo data.
 * @return {json} - axios post response
 */
export const getUserInfo = user => (
  () => axios.post('/api/v1/users/username', user)
);

/**
 * create group
 * @function createGroup
 * @param {string} groupData - The is the group data for creating group.
 * @return {json} - axios post response
 */
export const createGroup = groupData => (
  dispatch => axios.post('/api/v1/groups', groupData).then(() => {
    dispatch(createGroupAction(groupData));
  })
);

/**
 * Get users Groups
 * @function getUserGroups
 * @param {string} user - user whose group is fetched
 * @return {json} - axios post response
 */
export const getUserGroups = user => (
  dispatch => axios.post('/api/v1/user/groups', user).then((res) => {
    dispatch(getuserGroupsAction(res.data));
  })
);

/**
 * Get Groups created by a user from the database
 * @function getAdminGroups
 * @param {string} user - The is the user whose group is fetched.
 * @return {json} - axios post response
 */
export const getAdminGroups = user => (
  dispatch => axios.post('/api/v1/groups/creator', user).then((res) => {
    dispatch(getAdminGroupsAction(res.data));
  })
);

/**
 * Remove user from a group
 * @function removeUserFromGroup
 * @param {integer} id
 * @param {object} payLoad
 * @return {json} - axios post response
 */
export const removeUserFromGroup = (id, payLoad) => (
  () => axios.post(`/api/v1/groups/${id}/users`, payLoad)
);
