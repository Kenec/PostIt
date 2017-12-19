/* global expect */
import group from '../../reducers/group';
import mockAction from '../../__mocks__/actions';

const state = {};

describe('Group reducers:', () => {
  describe('creatGroup', () => {
    it('should add created group to the store', () => {
      const action = mockAction.createGroup;
      expect(group(state, action)).toEqual({ groupData: action.groupData });
    });
  });

  describe('getUsergroup', () => {
    it('should add groups a user belonged to to the store', () => {
      const action = mockAction.getUserGroup;
      expect(group(state, action)).toEqual({ groups: action.groups });
    });
  });

  describe('getAdminGroup', () => {
    it('should add a group a user created to the store', () => {
      const action = mockAction.getAdminGroup;
      expect(group(state, action))
        .toEqual({ groupsBelonged: action.groupsBelonged });
    });
  });

  describe('getUsersInGroup', () => {
    it('should add users in a group to the store', () => {
      const action = mockAction.getUsersInGroup;
      expect(group(state, action))
        .toEqual({ usersInGroup: action.usersInGroup });
    });
  });

  describe('searchAllUsers', () => {
    it('should add all users to the store', () => {
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
