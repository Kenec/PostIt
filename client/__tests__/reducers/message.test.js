/* global expect */
import message from '../../reducers/message';
import mockAction from '../../__mocks__/actions';

const state = {};

describe('Message reducers:', () => {
  describe('composeMessage', () => {
    it('should add composed message to the store', () => {
      const action = mockAction.composeMessage;
      expect(message(state, action))
        .toEqual({ messageData: action.messageData });
    });
  });

  describe('When composeMessage fails', () => {
    it('compose error message should be added to the store', () => {
      const action = mockAction.composeMessageError;
      expect(message(state, action))
        .toEqual({ messageError: action.error });
    });
  });

  describe('When composeMessage is successful', () => {
    it('compose success message should  be added to the store', () => {
      const action = mockAction.composeMessageSuccess;
      expect(message(state, action))
        .toEqual({ messageSuccess: action.success });
    });
  });

  describe('retrieveMessage', () => {
    it('should retrieve message from the store', () => {
      const action = mockAction.retrieveMessage;
      expect(message(state, action))
        .toEqual({ messageData: action.retrieveMessages });
    });
  });

  describe('When retrieveMessage fails', () => {
    it('retrieve error message should be added to the store', () => {
      const action = mockAction.retrieveMessageError;
      expect(message(state, action))
        .toEqual({ error: action.error });
    });
  });

  describe('clearRetrievedMessage', () => {
    it('should clear retrieved message from the store', () => {
      const action = mockAction.clearRetrievedMessage;
      expect(message(state, action))
        .toEqual({ messageData: action.messageData });
    });
  });

  describe('getNotification', () => {
    it('should retrieve notification from the store', () => {
      const action = mockAction.getNotification;
      expect(message(state, action))
        .toEqual({ notificationData: action.notificationData });
    });
  });

  describe('updateNotification', () => {
    it('should update the notification store', () => {
      const action = mockAction.updateNotification;
      expect(message(state, action))
        .toEqual({ messageData: action.messageData });
    });
  });

  describe('readBy', () => {
    it('should add message readers to the store', () => {
      const action = mockAction.readBy;
      expect(message(state, action))
        .toEqual({ readBy: action.readBy });
    });
  });

  describe('clearNotification', () => {
    it('should clear notification from the store', () => {
      const action = mockAction.clearNotification;
      expect(message(state, action))
        .toEqual({ messageData: action.messageData });
    });
  });
});
