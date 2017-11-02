import * as types from '../actions/types';

const mockAction = {
  addFlashMessage: {
    type: types.ADD_FLASH_MESSAGE,
    message: {
      type: 'success',
      text: 'This is a success message!'
    }
  },
  deleteFlashMessage: {
    type: types.DELETE_FLASH_MESSAGE,
    id: 1
  },
  createGroup: {
    type: types.CREATE_GROUP,
    groupData: {
      groupName: 'Group',
      createdby: 1
    }
  },
  getUserGroup: {
    type: types.GET_USER_GROUPS,
    groups: {
      id: 1,
      groupName: 'Group'
    }
  },
  getAdminGroup: {
    type: types.GET_ADMIN_GROUPS,
    groupsBelonged: {
      id: 1,
      groupName: 'Group'
    }
  },
  getUsersInGroup: {
    type: types.GET_USERS_IN_GROUP,
    usersInGroup: {
      id: 1,
      username: 'Kene',
      email: 'kene@gmail.com',
      phone: '07038550515'
    }
  },
  searchAllUser: {
    type: types.SEARCH_ALL_USERS,
    users: [
      {
        id: 1,
        username: 'Kene',
        email: 'kene@gmail.com',
        phone: '07038550515'
      },
      {
        id: 2,
        username: 'Obi',
        email: 'obi@gmail.com',
        phone: '07038550515'
      },
    ]
  },
  composeMessage: {
    type: types.COMPOSE_MESSAGE,
    messageData: {
      id: 1,
      message: 'Hello Obi! Welcome',
      priorityLevel: 'Normal',
      groupId: 1,
      sentBy: 1,
      createdAt: '2017-08-15T11:10:50.743Z'
    }
  },
  retrieveMessage: {
    type: types.RETRIEVE_MESSAGE,
    messageData: {
      id: 1,
      message: 'Hello Obi! Welcome',
      priorityLevel: 'Normal',
      groupId: 1,
      sentBy: 1,
      createdAt: '2017-08-15T11:10:50.743Z'
    }
  },
  clearRetrievedMessage: {
    type: types.CLEAR_RETRIEVED_MESSAGE,
    messageData: []
  },
  getNotification: {
    type: types.GET_NOTIFICATION,
    notificationData: {
      id: 1,
      message: 'Hello Obi! Welcome',
      priorityLevel: 'Normal',
      groupId: 1,
      sentBy: 1,
      createdAt: '2017-08-15T11:10:50.743Z'
    }
  },
  updateNotification: {
    type: types.UPDATE_NOTIFICATION,
    messageData: {
      id: 1,
      message: 'Hello Obi! Welcome',
      priorityLevel: 'Normal',
      groupId: 1,
      sentBy: 1,
      createdAt: '2017-08-15T11:10:50.743Z'
    }
  },
  setCurrentUser: {
    type: types.SET_CURRENT_USER,
    isAuthenticated: true,
    user: { id: 1, username: 'Kene' }
  }
};

export default mockAction;
