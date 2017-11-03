/* global expect */
import group from '../../reducers/group';
import mockAction from '../../__mocks__/actions';

const state = {};

describe('Group reducers', () => {
  describe('When CREATE_GROUP action type is fired from an action', () => {
    it('group should be created and pushed to the group store', () => {
      const action = mockAction.createGroup;
      expect(group(state, action)).toEqual({ groupData: action.groupData });
    });
  });
  describe('When GET_USER_GROUPS action type is fired from action', () => {
    it('groups a user belonged to should be added to the store', () => {
      const action = mockAction.getUserGroup;
      expect(group(state, action)).toEqual({ groups: action.groups });
    });
  });
  describe(`When GET_ADMIN_GROUPS
            action type is fired from action`, () => {
      it('groups a user created should be added to the store', () => {
        const action = mockAction.getAdminGroup;
        expect(group(state, action))
          .toEqual({ groupsBelonged: action.groupsBelonged });
      });
    });
  describe(`When GET_USERS_IN_GROUP
            action type is fired from action`, () => {
      it('users in a group should be added to the store', () => {
        const action = mockAction.getUsersInGroup;
        expect(group(state, action))
          .toEqual({ usersInGroup: action.usersInGroup });
      });
    });
  describe(`When SEARCH_ALL_USERS
            action type is fired from action`, () => {
      it('all users should be added to the store', () => {
        const action = mockAction.searchAllUser;
        expect(group(state, action))
          .toEqual({ searchedUsers: action.users });
      });
    });
  describe('When No action is specified', () => {
    it('the state of the group store should be returned', () => {
      const action = {};
      expect(group(state, action)).toEqual(state);
    });
  });
});
