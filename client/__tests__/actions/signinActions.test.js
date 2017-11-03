/* global expect */
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import samples from '../../__mocks__/samples';
import * as signin from '../../actions/signinActions';
import * as types from '../../actions/types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const mock = new MockAdapter(axios);

describe('Signin Action', () => {
  const user = samples.user;
  const token = samples.validToken;

  it('should have setCurrentUser action creator', () => {
    expect(signin.setCurrentUser(user)).toEqual({
      type: types.SET_CURRENT_USER,
      user
    });
  });

  it('should have userSigninRequestAction action creator', () => {
    const userDetail = samples.userDetail;
    const store = mockStore({});
    mock.onPost('/api/v1/users/signin', userDetail)
      .reply(201, { token,
        message: 'Successfully logged in',
        username: 'Kene',
        success: true });
    return store.dispatch(signin.userSigninRequestAction(userDetail))
      .then(() => {
        expect(store.getActions()).toEqual([{
          type: types.SET_CURRENT_USER,
          user
        }]);
      });
  });
});
