/* global expect */
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import samples from '../../__mocks__/samples';
import signup from '../../actions/signupActions';
import * as types from '../../actions/types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const mock = new MockAdapter(axios);

describe('Signup Action', () => {
  const user = samples.user;
  const token = samples.validToken;

  const store = mockStore({});
  const userData = samples.userData;

  it('should create a new user', () => {
    mock.onPost('/api/v1/users/signup', userData)
      .reply(200, { token,
        message: 'User created successfully',
        username: 'Kene',
        success: true });
    return store.dispatch(signup(userData))
      .then(() => {
        expect(store.getActions()).toEqual([{
          type: types.SET_CURRENT_USER,
          user
        }]);
      });
  });
});
