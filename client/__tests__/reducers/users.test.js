/* global expect */
import login from '../../reducers/users';
import mockAction from '../../__mocks__/actions';

const state = {};

describe('User reducers:', () => {
  describe('Login', () => {
    it('should handle SET_CURRENT_USER', () => {
      const action = mockAction.setCurrentUser;
      expect(login(state, action))
        .toEqual(
          { isAuthenticated: true, user: { id: 1, username: 'Kene' } }
        );
    });
  });
  describe('DEFAULT', () => {
    it('should return the initial state', () => {
      const action = {};
      expect(login(state, action))
        .toEqual({});
    });
  });
});
