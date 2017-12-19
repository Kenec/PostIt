// import
import axios from 'axios';
import { CREATE_GROUP, GET_USER_GROUPS,
  SEARCH_ALL_USERS, GET_ADMIN_GROUPS,
  GET_USERS_IN_GROUP, GET_USER_ERROR } from './types';

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
      dispatch({ type: SEARCH_ALL_USERS, users: res.data });
    })
);

/**
 * Get users in a group from the database
 * @function getUsersInGroup
 * @param {string} groupId - The groupid of a group.
 * @return {json} - axios get response
 */
export const getUsersInGroup = groupId => (
  dispatch => axios.get(`/api/v1/groups/${groupId}/users`).then(
    ({ data }) => {
      dispatch({ type: GET_USERS_IN_GROUP, usersInGroup: data.users });
    },
    ({ response }) => {
      dispatch({ type: GET_USER_ERROR, error: response.data });
    }
  )
);

/**
 * Add user to a group
 * @function addUserToGroups
 * @param {string} groupId - The is the groupid.
 * @param {string} userId - The is the of id of the user.
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
    dispatch({ type: CREATE_GROUP, groupData });
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
    dispatch({ type: GET_USER_GROUPS, groups: res.data });
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
    dispatch({ type: GET_ADMIN_GROUPS, groupsBelonged: res.data });
  })
);

/**
 * Remove user from a group
 * @function removeGroupUser
 * @param {integer} id
 * @param {object} payLoad contains group admin and user to be remobed
 * @return {json} - axios post response
 */
export const removeGroupUser = (id, payLoad) => (
  () => axios.delete(`/api/v1/groups/${id}/users`,
    { params:
      {
        admin: payLoad.admin,
        user: payLoad.user
      }
    })
);
