import axios from 'axios';
import jwt from 'jsonwebtoken';

export function createGroupAction(groupData) {
  return {
    type: "CREATE_GROUP",
    groupData
  }
}

export function getuserGroupsAction(data) {
  return {
    type: "GET_USER_GROUPS",
    groups: data
  }
}

export function getGroupsCreatedByUserAction(data) {
  return {
    type: "GET_GROUPS_CREATED_BY_USER",
    groupsByUser: data
  }
}
export function addUserToGroupsAction(data) {
  return {
    type: "ADD_USER_TO_GROUPS",
    userData: data
  }
}

export function addUserToGroups (groupId,userId) {
    return dispatch => {
      return axios.post('/api/group/'+groupId+'/user',userId);
    }
}

export function getUserInfo(data) {
    return dispatch => {
      return axios.post('/api/users/username',data)
    }
}

export function createGroup (groupData) {
    return dispatch => {
      return axios.post('/api/group',groupData).then( res => {
          dispatch(createGroupAction(groupData));
        }
      );
    }
}

export function getUserGroups (user) {
  return dispatch => {
    return axios.post('/api/users/me',user).then( res => {
        dispatch(getuserGroupsAction(res.data));
    });
  }
}

export function getGroupsCreatedByUser (user) {
  return dispatch => {
    return axios.post('/api/group/creator',user).then( res => {
        dispatch(getGroupsCreatedByUserAction(res.data));
    });
  }
}
