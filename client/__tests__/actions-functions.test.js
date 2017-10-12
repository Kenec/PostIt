/* global expect */
// import
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import * as flashmessage from '../actions/flashMessages';
import * as forgotPassword from '../actions/forgotPasswordAction';
import * as group from '../actions/groupActions';
import * as signup from '../actions/signupActions';
import * as signin from '../actions/signinActions';
import * as message from '../actions/messageActions';
import * as types from '../actions/types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const mock = new MockAdapter(axios);
// const localStorage = window.localStorage;
// flashmessage action
describe('Flashmessage Action', () => {
  // should have addFlashmessage action creator
  it('should have addFlasmessage action creator', () => {
    const myMessage = {
      type: 'success',
      message: 'This is a success message'
    };
    expect(flashmessage.addFlashMessage(myMessage)).toEqual({
      type: types.ADD_FLASH_MESSAGE,
      message
    });
  });
  // should have deleteFlashmessage action creator
  it('should have deleteFlasmessage action creator', () => {
    const id = 1;
    expect(flashmessage.deleteFlashMessage(id)).toEqual({
      type: types.DELETE_FLASH_MESSAGE,
      id
    });
  });
});
// forgot password action creator
describe('Forgot Password Action', () => {
  // should have forgotPasswordRequest method
  it('should have forgotPassword action creator', () => {
    const email = 'email@email.com';
    expect((typeof forgotPassword.forgotPasswordRequest(email)))
      .toEqual('function');
  });
  // should have forgotPasswordRequest method return
  // an asyn action of post request
  it('should have forgotPasswordRequest return json response', () => {
    const store = mockStore({});
    const email = 'email@email.com';
    mock.onPost('/api/v1/users/resetpassword', email)
      .reply(200, { message: 'password reset link sent to your email' });
    return store.dispatch(forgotPassword.forgotPasswordRequest(email))
      .then((messages) => {
        // return of async actions
        expect(messages.data).toEqual({
          message: 'password reset link sent to your email'
        });
      });
  });
  // should have isValidToken method
  it('should have isValidToken action creator', () => {
    const token = 'gibrishastoken';
    expect((typeof forgotPassword.isValidToken(token))).toEqual('function');
  });
  // should have isValidToken method return an asyn action of get request
  it('should have isValidToken return json request', () => {
    const store = mockStore({});
    const token = 'thisisgibrishtoken';
    mock.onGet(`/api/v1/users/resetpassword/${token}`)
      .reply(200, { message: true });
    return store.dispatch(forgotPassword.isValidToken(token))
      .then((messages) => {
        // return of async actions
        expect(messages.data).toEqual({
          message: true
        });
      });
  });
  // should have updatePassword method
  it('should have updatePassword action creator', () => {
    const token = 'gibrishastoken';
    const password = 'newpassword';
    expect((typeof forgotPassword.updatePassword(token, password)))
      .toEqual('function');
  });
  // should have updatePassword method return an asyn action of post request
  it('should have updatePassword return json response', () => {
    const store = mockStore({});
    const token = 'thisisgibrishtoken';
    const newPassword = 'this is a new password';
    mock.onPost(`/api/v1/users/resetpassword/${token}`, newPassword)
      .reply(200, { message: 'password updated successfully!' });
    return store.dispatch(forgotPassword.updatePassword(token, newPassword))
      .then((messages) => {
        // return of async actions
        expect(messages.data).toEqual({
          message: 'password updated successfully!'
        });
      });
  });
});
// group action creator
describe('Group Action', () => {
  const groupData = {
    groupId: 1,
    groupName: 'Random',
    createdBy: 'Kene',
  };
  const usersData = [
    { id: 1, username: 'kene' },
    { id: 2, username: 'obi' },
  ];
  // should have createGroupAction method
  it('should have createGroupAction action creator', () => {
    expect((group.createGroupAction(groupData))).toEqual({
      type: types.CREATE_GROUP,
      groupData
    });
  });
  // should have getuserGroupsAction method
  it('should have getuserGroupsAction action creator', () => {
    expect((group.getuserGroupsAction(groupData))).toEqual({
      type: types.GET_USER_GROUPS,
      groups: groupData
    });
  });
  // should have searchAllUsersAction method
  it('should have searchAllUsersAction action creator', () => {
    expect((group.searchAllUsersAction(usersData))).toEqual({
      type: types.SEARCH_ALL_USERS,
      users: usersData
    });
  });
  // should have getAdminGroupsAction method
  it('should have getAdminGroupsAction action creator', () => {
    expect((group.getAdminGroupsAction(usersData))).toEqual({
      type: types.GET_ADMIN_GROUPS,
      groupsBelonged: usersData
    });
  });
  // should have getUsersInGroupAction method
  it('should have getUsersInGroupAction action creator', () => {
    expect((group.getUsersInGroupAction(usersData))).toEqual({
      type: types.GET_USERS_IN_GROUP,
      usersInGroup: usersData
    });
  });
  // should have addUserToGroupsAction method
  it('should have addUserToGroupsAction action creator', () => {
    expect((group.addUserToGroupsAction(usersData))).toEqual({
      type: types.ADD_USER_TO_GROUPS,
      userData: usersData
    });
  });
  // should have searchAllUsers method
  it('should have searchAllUsers action creator', () => {
    const username = 'Kene';
    const offset = 1;
    expect((typeof group.searchAllUsers(username, offset))).toEqual('function');
  });
  // should have dispatch an async action when searchAllUsers method is called
  it('should dispatch an async action when searchAllUsers is called', () => {
    const store = mockStore({});
    const username = 'Kene';
    const offset = 1;
    mock.onPost(`/api/v1/users/${offset}`, username)
      .reply(200, usersData);
    return store.dispatch(group.searchAllUsers(username, offset)).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual([{
        type: types.SEARCH_ALL_USERS,
        users: usersData
      }]);
    });
  });
  // should have getUsersInGroup method 
  it('should have getUsersInGroup return result of get request', () => {
    const store = mockStore({});
    const groupId = 1;
    mock.onGet(`/api/v1/groupss/${groupId}/users`)
      .reply(200, usersData);
    return store.dispatch(group.getUsersInGroup(groupId))
      .then((groupMembers) => {
      // return of async actions
        expect(groupMembers.data).toEqual(usersData);
      });
  });
  // should have addUserToGroups method 
  it('should have addUserToGroups return result of post request', () => {
    const store = mockStore({});
    const groupId = 1;
    const newUser = { id: 3, username: 'john' };
    mock.onPost(`/api/v1/groups/${groupId}/user`, newUser.id)
      .reply(200, usersData.push(newUser));
    return store.dispatch(group.addUserToGroups(groupId, newUser.id))
      .then((newGroupMembers) => {
      // return of async actions
        expect(newGroupMembers.data).toEqual(usersData.length);
      });
  });
  // should have getUserInfo method 
  it('should have getUserInfo return result of post request', () => {
    const store = mockStore({});
    const userId = 1;
    mock.onPost('/api/v1/users/username', userId)
      .reply(200, usersData[0].username);
    return store.dispatch(group.getUserInfo(userId)).then((username) => {
      // return of async actions
      expect(username.data).toEqual(usersData[0].username);
    });
  });
  // should have dispatch an async action when createGroup method is called
  it('should dispatch an async action when createGroup is called', () => {
    const store = mockStore({});
    const newGroup = {
      groupId: 1,
      groupName: 'Random',
      createdBy: 'Kene' };
    mock.onPost('/api/v1/groups', newGroup)
      .reply(200, newGroup);
    return store.dispatch(group.createGroup(newGroup)).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual([{
        type: types.CREATE_GROUP,
        groupData
      }]);
    });
  });
  // should have dispatch an async action when getUserGroups method is called
  it('should dispatch an async action when getUserGroups is called', () => {
    const store = mockStore({});
    const usersGroup = {
      username: 'Kene',
      groups: [{ groupId: 1, groupName: 'Random', createdBy: 'Kene' }] };
    mock.onPost('/api/v1/users/groups', usersGroup.username)
      .reply(200, usersGroup);
    return store.dispatch(group.getUserGroups(usersGroup.username)).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual([{
        type: types.GET_USER_GROUPS,
        groups: usersGroup
      }]);
    });
  });
  // should have dispatch an async action when getAdminGroups method is called
  it('should dispatch an async action when getAdminGroups is called', () => {
    const store = mockStore({});
    const usersGroup = {
      username: 'Kene',
      groups: [{ groupId: 1, groupName: 'Random', createdBy: 'Kene' }] };
    mock.onPost('/api/v1/groups/creator', usersGroup.username)
      .reply(200, usersGroup);
    return store.dispatch(group.getAdminGroups(usersGroup.username))
      .then(() => {
      // return of async actions
        expect(store.getActions()).toEqual([{
          type: types.GET_ADMIN_GROUPS,
          groupsBelonged: usersGroup
        }]);
      });
  });
});
// signup action creator
describe('Signup Action', () => {
  const store = mockStore({});
  const userData = {
    username: 'LordLugard',
    email: 'lordlougard@email.com',
    password: 'Kene',
    phone: 123
  };
  // should have userSignupRequest method
  it('should have userSignupRequest action return json repsonse', () => {
    mock.onPost('/api/v1/users/signup', userData)
      .reply(200, { message: 'User created successfully' });
    return store.dispatch(signup.userSignupRequest(userData))
      .then((messages) => {
        // return of async actions
        expect(messages.data).toEqual({
          message: 'User created successfully'
        });
      });
  });
});
// message action creator
describe('Message Action', () => {
  const messageData = [{
    messageId: 1,
    message: 'Random message',
    sentBy: 'Kene',
    readBy: 'Kene',
  }];
  const notificationData = [{
    messageId: 1,
    sentBy: 'Kene',
    readStatus: 1
  }];
  const retrieveMessages = messageData.push({
    messageId: 2,
    message: 'Random message2',
    sentBy: 'Kene',
    readBy: 'Kene',
  });
  const usersWhoHaveReadMessage = 'Kene, Obi';
  // should have composeMessageAction method
  it('should have composeMessageAction action creator', () => {
    expect((message.composeMessageAction(messageData))).toEqual({
      type: types.COMPOSE_MESSAGE,
      messageData
    });
  });
  // should have getNotificationAction method
  it('should have getNotificationAction action creator', () => {
    expect((message.getNotificationAction(notificationData))).toEqual({
      type: types.GET_NOTIFICATION,
      notificationData
    });
  });
  // should have clearRetrievedMessageAction method
  it('should have clearRetrievedMessageAction action creator', () => {
    expect((message.clearRetrievedMessageAction())).toEqual({
      type: types.COMPOSE_MESSAGE,
      messageData: []
    });
  });
  // should have retrieveMessageAction method
  it('should have retrieveMessageAction action creator', () => {
    expect((message.retrieveMessageAction(retrieveMessages))).toEqual({
      type: types.RETRIEVE_MESSAGE,
      retrieveMessages
    });
  });
  // should have readByAction method
  it('should have readByAction action creator', () => {
    expect((message.readByAction(usersWhoHaveReadMessage))).toEqual({
      type: types.READ_BY,
      usersWhoHaveReadMessage
    });
  });
  // should have dispatch an async action when composeMessage method is called
  it('should dispatch an async action when composeMessage is called', () => {
    const store = mockStore({});
    const groupId = 1;
    mock.onPost(`/api/v1/groups/${groupId}/message`, messageData)
      .reply(200, { message: 'sent!' });
    return store.dispatch(message.composeMessage(groupId, messageData))
      .then((messages) => {
      // return of async actions
        expect(messages.data).toEqual({
          message: 'sent!'
        });
      });
  });
  // should have retrieveMessage method 
  it('should have retrieveMessage return result of get request', () => {
    const store = mockStore({});
    const groupId = 1;
    mock.onGet(`/api/v1/groups/${groupId}/messages`)
      .reply(200, retrieveMessages);
    return store.dispatch(message.retrieveMessage(groupId))
      .then((messagesResult) => {
      // return of async actions
        expect(messagesResult.data).toEqual(messageData.length);
      });
  });
  // should have clearRetrievedMessage method 
  it('should have clearRetrievedMessage return async action', () => {
    const store = mockStore({});
    expect(typeof message.clearRetrievedMessage()).toEqual('function');
    expect(store.dispatch(message.clearRetrievedMessage())).toEqual(
      undefined
    );
  });
  // should have addNotification method 
  it('should have addNotification return result of post request', () => {
    const store = mockStore({});
    const newNotificationData = {
      messageId: 3,
      sentBy: 'Kene',
      readStatus: 1
    };
    mock
      .onPost(`/api/v1/groups/${newNotificationData.messageId}/notification`,
        newNotificationData)
      .reply(200, notificationData.push(newNotificationData));
    return store.dispatch(message.addNotification(newNotificationData.messageId,
      newNotificationData))
      .then((notificationResult) => {
      // return of async actions
        expect(notificationResult.data).toEqual(notificationData.length);
      });
  });
  // should have dispatch an async action when getNotification method is called
  it('should dispatch an async action when getNotification is called', () => {
    const store = mockStore({});
    const userId = 1;
    mock.onPost('/api/v1/user/notifications', userId)
      .reply(200, notificationData);
    return store.dispatch(message.getNotification(userId)).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual([{
        type: types.GET_NOTIFICATION,
        notificationData
      }]);
    });
  });
  // should have dispatch an async action when
  // updateNotification method is called
  it('should dispatch an action when updateNotification is called', () => {
    const store = mockStore({});
    const updateNotificationData = {
      messageId: 1,
      sentBy: 'Kene',
      readStatus: 0
    };
    mock
      .onPost(`/api/v1/user/${updateNotificationData.messageId}/notification`,
        updateNotificationData)
      .reply(200, updateNotificationData);
    return store
      .dispatch(message.updateNotification(updateNotificationData.messageId,
        updateNotificationData))
      .then((result) => {
        // return of async actions
        expect(result.data).toEqual(updateNotificationData);
      });
  });
  // should have dispatch an async action when updateReadBy method is called
  it('should dispatch an async action when updateReadBy is called', () => {
    const store = mockStore({});
    const readBy = 'Kene, Francis, Love';
    mock
      .onPost(`/api/v1/groups/${messageData[0].messageId}/updateReadBy`,
        readBy)
      .reply(200, messageData[0].readBy = readBy);
    return store
      .dispatch(message.updateReadBy(messageData[0].messageId,
        readBy))
      .then((result) => {
      // return of async actions
        expect(result.data).toEqual(messageData[0].readBy);
      });
  });
  // should have dispatch an async action when getReadBy method is called
  it('should dispatch an async action when getReadBy is called', () => {
    const store = mockStore({});
    mock.onPost(`/api/v1/users/${messageData[0].messageId}/read`)
      .reply(200, messageData[0].readBy);
    return store.dispatch(message.getReadBy(messageData[0].messageId))
      .then(() => {
      // return of async actions
        expect(store.getActions()).toEqual([{
          type: types.READ_BY,
          usersWhoHaveReadMessage: 'Kene, Francis, Love'
        }]);
      });
  });
});
// signin action creator
describe('Signin Action', () => {
  // should have setCurrentUser action creator
  it('should have setCurrentUser action creator', () => {
    const user = {
      id: 1,
      username: 'Kene'
    };
    expect(signin.setCurrentUser(user)).toEqual({
      type: types.SET_CURRENT_USER,
      user
    });
  });
});

