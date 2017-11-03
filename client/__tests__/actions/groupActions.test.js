/* global expect */
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import samples from '../../__mocks__/samples';
import * as group from '../../actions/groupActions';
import * as types from '../../actions/types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const mock = new MockAdapter(axios);

describe('Group Action', () => {
  const groupData = samples.groupData;
  const usersData = samples.usersData;

  it('should have createGroupAction action creator', () => {
    expect((group.createGroupAction(groupData))).toEqual({
      type: types.CREATE_GROUP,
      groupData
    });
  });

  it('should have getuserGroupsAction action creator', () => {
    expect((group.getuserGroupsAction(groupData))).toEqual({
      type: types.GET_USER_GROUPS,
      groups: groupData
    });
  });

  it('should have searchAllUsersAction action creator', () => {
    expect((group.searchAllUsersAction(usersData))).toEqual({
      type: types.SEARCH_ALL_USERS,
      users: usersData
    });
  });

  it('should have getAdminGroupsAction action creator', () => {
    expect((group.getAdminGroupsAction(usersData))).toEqual({
      type: types.GET_ADMIN_GROUPS,
      groupsBelonged: usersData
    });
  });

  it('should have getUsersInGroupAction action creator', () => {
    expect((group.getUsersInGroupAction(usersData))).toEqual({
      type: types.GET_USERS_IN_GROUP,
      usersInGroup: usersData
    });
  });

  it('should have addUserToGroupsAction action creator', () => {
    expect((group.addUserToGroupsAction(usersData))).toEqual({
      type: types.ADD_USER_TO_GROUPS,
      userData: usersData
    });
  });

  it('should have searchAllUsers action creator', () => {
    const username = samples.username;
    const offset = samples.offset;
    expect((typeof group.searchAllUsers(username, offset))).toEqual('function');
  });

  it('should dispatch an async action when searchAllUsers is called', () => {
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

  it('should have getUsersInGroup return result of get request', () => {
    const store = mockStore({});
    const groupId = samples.groupId;
    mock.onGet(`/api/v1/groups/${groupId}/users`)
      .reply(200, usersData);
    return store.dispatch(group.getUsersInGroup(groupId))
      .then((groupMembers) => {
        expect(groupMembers.data).toEqual(usersData);
      });
  });

  it('should have addUserToGroups return result of post request', () => {
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

  it('should have getUserInfo return result of post request', () => {
    const store = mockStore({});
    const userId = samples.userId;
    mock.onPost('/api/v1/users/username', userId)
      .reply(200, usersData[0].username);
    return store.dispatch(group.getUserInfo(userId)).then((username) => {
      expect(username.data).toEqual(usersData[0].username);
    });
  });

  it('should dispatch an async action when createGroup is called', () => {
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

  it('should dispatch an async action when getUserGroups is called', () => {
    const store = mockStore({});
    const usersGroup = samples.usersGroup;
    mock.onPost('/api/v1/user/groups', usersGroup.username)
      .reply(200, usersGroup);
    return store.dispatch(group.getUserGroups(usersGroup.username)).then(() => {
      expect(store.getActions()).toEqual([{
        type: types.GET_USER_GROUPS,
        groups: usersGroup
      }]);
    });
  });

  it('should dispatch an async action when getAdminGroups is called', () => {
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
