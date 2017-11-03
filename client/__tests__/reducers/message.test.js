/* global expect */
import message from '../../reducers/message';
import mockAction from '../../__mocks__/actions';

const state = {};

describe('Message reducers', () => {
  describe('When COMPOSE_MESSAGE action type is fired from an action', () => {
    it('message should be added to the message store', () => {
      const action = mockAction.composeMessage;
      expect(message(state, action))
        .toEqual({ messageData: action.messageData });
    });
  });
  describe('When RETRIEVE_MESSAGE action type is fired from action', () => {
    it('messages should be retrieved from the store', () => {
      const action = mockAction.retrieveMessage;
      expect(message(state, action))
        .toEqual({ messageData: action.retrieveMessages });
    });
  });
  describe(`When CLEAR_RETRIEVED_MESSAGE
      action type is fired from action`, () => {
      it('messages from the store should be cleared', () => {
        const action = mockAction.clearRetrievedMessage;
        expect(message(state, action))
          .toEqual({ messageData: action.messageData });
      });
    });
  describe(`When GET_NOTIFICATION
        action type is fired from action`, () => {
      it('notification should be retrieved from the store', () => {
        const action = mockAction.getNotification;
        expect(message(state, action))
          .toEqual({ notificationData: action.notificationData });
      });
    });
  describe(`When UPDATE_NOTIFICATION
  action type is fired from action`, () => {
      it('notification should be updated in the store', () => {
        const action = mockAction.updateNotification;
        expect(message(state, action))
          .toEqual({ messageData: action.messageData });
      });
    });
});
