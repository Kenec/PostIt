/* global expect */
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import mockActions from '../../__mocks__/actions';
import samples from '../../__mocks__/samples';
import * as group from '../../actions/groupActions';
import * as types from '../../actions/types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const mock = new MockAdapter(axios);

describe('Group Action', () => {
  const groupData = samples.groupData;
  const usersData = samples.usersData;
  const errorMessage = mockActions.mockError;

  describe('searchAllUsers', () => {
    it('should be a function', () => {
      const username = samples.username;
      const offset = samples.offset;
      expect((typeof group.searchAllUsers(username, offset)))
        .toEqual('function');
    });

    it('should search all user', () => {
      const store = mockStore({});
      const username = samples.username;
      const offset = samples.offset;
      mock.onPost(`/api/v1/users/${offset}`, username)
        .reply(200, usersData);
      return store.dispatch(group.searchAllUsers(username, offset)).then(() => {
        expect(store.getActions()).toEqual([{
          type: types.SEARCH_ALL_USERS,
          users: usersData
        }]);
      });
    });
  });

  describe('getUserInGroup', () => {
    it('should throw an error when groupId is not supplied', () => {
      const store = mockStore({});
      const groupId = undefined;
      mock.onGet(`/api/v1/groups/${groupId}/users`)
        .reply(400, errorMessage.message);
      return store.dispatch(group.getUsersInGroup(groupId))
        .then(() => {
          expect(store.getActions()).toEqual([{
            type: types.GET_USER_ERROR, error: errorMessage.message
          }]);
        });
    });

    it('should get all users that belong to a group', () => {
      const store = mockStore({});
      const groupId = samples.groupId;
      mock.onGet(`/api/v1/groups/${groupId}/users`)
        .reply(200, usersData);
      return store.dispatch(group.getUsersInGroup(groupId))
        .then((groupMembers) => {
          expect(store.getActions()).toEqual([{
            type: types.GET_USERS_IN_GROUP,
            usersInGroup: groupMembers
          }]);
        });
    });
  });

  describe('addUserToGroups', () => {
    it('should add user to a group', () => {
      const store = mockStore({});
      const groupId = samples.groupId;
      const newUser = samples.newUser;
      mock.onPost(`/api/v1/groups/${groupId}/user`, newUser.id)
        .reply(200, usersData.push(newUser));
      return store.dispatch(group.addUserToGroups(groupId, newUser.id))
        .then((newGroupMembers) => {
          expect(newGroupMembers.data).toEqual(usersData.length);
        });
    });
  });

  describe('getUserInfo', () => {
    it('should get users information by username', () => {
      const store = mockStore({});
      const userId = samples.userId;
      mock.onPost('/api/v1/users/username', userId)
        .reply(200, usersData[0].username);
      return store.dispatch(group.getUserInfo(userId)).then((username) => {
        expect(username.data).toEqual(usersData[0].username);
      });
    });
  });

  describe('createGroup', () => {
    it('should create new group', () => {
      const store = mockStore({});
      const newGroup = samples.newGroup;
      mock.onPost('/api/v1/groups', newGroup)
        .reply(200, newGroup);
      return store.dispatch(group.createGroup(newGroup)).then(() => {
        expect(store.getActions()).toEqual([{
          type: types.CREATE_GROUP,
          groupData
        }]);
      });
    });
  });

  describe('getUserGroups', () => {
    it('should get users group', () => {
      const store = mockStore({});
      const usersGroup = samples.usersGroup;
      mock.onPost('/api/v1/user/groups', usersGroup.username)
        .reply(200, usersGroup);
      return store
        .dispatch(group.getUserGroups(usersGroup.username)).then(() => {
          expect(store.getActions()).toEqual([{
            type: types.GET_USER_GROUPS,
            groups: usersGroup
          }]);
        });
    });
  });

  describe('getAdminGroups', () => {
    it('should get all groups a user created', () => {
      const store = mockStore({});
      const usersGroup = samples.usersGroup;
      mock.onPost('/api/v1/groups/creator', usersGroup.username)
        .reply(200, usersGroup);
      return store.dispatch(group.getAdminGroups(usersGroup.username))
        .then(() => {
          expect(store.getActions()).toEqual([{
            type: types.GET_ADMIN_GROUPS,
            groupsBelonged: usersGroup
          }]);
        });
    });
  });
});
