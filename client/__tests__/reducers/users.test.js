/* global expect */
import userLoginReducer from '../../reducers/users';
import mockAction from '../../__mocks__/actions';

const state = {};

describe('User reducers', () => {
  describe('When SET_CURRENT_USER action type is fired from an action', () => {
    it('current user should be added to the user store', () => {
      const action = mockAction.setCurrentUser;
      expect(userLoginReducer(state, action))
        .toEqual(
          { isAuthenticated: true, user: { id: 1, username: 'Kene' } }
        );
    });
  });
  describe('When No action type is fired from an action', () => {
    it('default state of user store returned', () => {
      const action = {};
      expect(userLoginReducer(state, action))
        .toEqual({});
    });
  });
});
