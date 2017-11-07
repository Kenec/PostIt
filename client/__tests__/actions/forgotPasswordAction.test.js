/* global expect */
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import samples from '../../__mocks__/samples';
import * as forgotPassword from '../../actions/forgotPasswordAction';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const mock = new MockAdapter(axios);

describe('Forgot Password Action', () => {
  const store = mockStore({});
  const token = samples.token;

  describe('forgotPasswordRequest', () => {
    it('should be a function', () => {
      const email = samples.email;
      expect((typeof forgotPassword.forgotPasswordRequest(email)))
        .toEqual('function');
    });

    it(`should make an api post request
        to update user reset password toke`, () => {
        const email = samples.email;
        mock.onPost('/api/v1/users/resetpassword', email)
          .reply(200, { message: 'password reset link sent to your email' });
        return store.dispatch(forgotPassword.forgotPasswordRequest(email))
          .then((messages) => {
            expect(messages.data).toEqual({
              message: 'password reset link sent to your email'
            });
          });
      });
  });
  describe('isValidToken', () => {
    it('should be a function', () => {
      expect((typeof forgotPassword.isValidToken(token))).toEqual('function');
    });

    it(`should make an api GET request to get users token
        and check if it is valid`, () => {
        mock.onGet(`/api/v1/users/resetpassword/${token}`)
          .reply(200, { message: true });
        return store.dispatch(forgotPassword.isValidToken(token))
          .then((messages) => {
            expect(messages.data).toEqual({
              message: true
            });
          });
      });
  });
  describe('updatePassword', () => {
    it('should be a function', () => {
      const password = samples.password;
      expect((typeof forgotPassword.updatePassword(token, password)))
        .toEqual('function');
    });

    it('should make an api post request to update users password', () => {
      const newPassword = samples.newPassword;
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
});
