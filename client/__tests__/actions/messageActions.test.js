/* global expect */
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import samples from '../../__mocks__/samples';
import * as message from '../../actions/messageActions';
import * as types from '../../actions/types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const mock = new MockAdapter(axios);

describe('Message Actions:', () => {
  const messageData = samples.messageData;
  const notificationData = samples.notificationData;
  const retrieveMessages = messageData.push(samples.newMessage);
  describe('composeMessage', () => {
    it(`should make an api call to add message and
      add the COMPOSE_MESSAGE_SUCCESS of sent to the store`, () => {
        const store = mockStore({});
        const groupId = samples.groupId;
        mock.onPost(`/api/v1/groups/${groupId}/message`, messageData)
          .reply(200, { message: 'Sent!' });
        return store.dispatch(message.composeMessage(groupId, messageData))
          .then(() => {
            expect(store.getActions()).toEqual([
              { type: types.COMPOSE_MESSAGE_ERROR, error: '' },
              { type: types.COMPOSE_MESSAGE_SUCCESS, success: 'Sent!' }
            ]);
          });
      });
  });
  describe('retrieveMessage', () => {
    it(`should make an api call to get messages
      and add RETREIVE_MESSAGE to the store`, () => {
        const store = mockStore({});
        const groupId = samples.groupId;
        mock.onGet(`/api/v1/groups/${groupId}/messages`)
          .reply(200, retrieveMessages);
        return store.dispatch(message.retrieveMessage(groupId))
          .then(() => {
            expect(store.getActions()).toEqual([
              { type: types.RETRIEVE_MESSAGE, retrieveMessages: 2 },
              { type: types.RETRIEVE_MESSAGE_ERROR, error: '' }
            ]);
          });
      });
  });
  describe('clearRetreivedMessage', () => {
    it('should clear messages in the store', () => {
      const store = mockStore({});
      expect(typeof message.clearRetrievedMessage()).toEqual('function');
      expect(store.dispatch(message.clearRetrievedMessage())).toEqual(
        undefined
      );
    });
  });
  describe('addNotification', () => {
    it(`should make an api call to add notification to the notification 
      table`, () => {
        const store = mockStore({});
        const newNotificationData = samples.newNotificationData;
        mock
          .onPost(`/api/v1/groups/${newNotificationData.messageId}/notification`,
            newNotificationData)
          .reply(200, notificationData.push(newNotificationData));
        return store
          .dispatch(message.addNotification(newNotificationData.messageId,
            newNotificationData))
          .then((notificationResult) => {
            expect(notificationResult.data).toEqual(notificationData.length);
          });
      });
  });
  describe('getNotification', () => {
    it(`should dispatch notificationData to the store
      action when getNotification is called`, () => {
        const store = mockStore({});
        const userId = samples.userId;
        mock.onPost('/api/v1/user/notifications', userId)
          .reply(200, notificationData);
        return store.dispatch(message.getNotification(userId)).then(() => {
          expect(store.getActions()).toEqual([{
            type: types.GET_NOTIFICATION,
            notificationData
          }]);
        });
      });
  });
  describe('updateNotification', () => {
    it(`should make an api call to update notifiaction and
      then dispatch updateNotification to the store`, () => {
        const store = mockStore({});
        const updateNotificationData = samples.updateNotificationData;
        mock
          .onPost(`/api/v1/user/${updateNotificationData.messageId}/notification`,
            updateNotificationData)
          .reply(200, updateNotificationData);
        return store
          .dispatch(message.updateNotification(updateNotificationData.messageId,
            updateNotificationData))
          .then((result) => {
            expect(result.data).toEqual(updateNotificationData);
          });
      });
  });
  describe('updateReadBy', () => {
    it(`should update readBy in the store when
      updateReadBy action is called`, () => {
        const store = mockStore({});
        const newReadBy = samples.newReadBy;
        mock
          .onPost(`/api/v1/groups/${messageData[0].messageId}/updateReadBy`,
            newReadBy)
          .reply(200, messageData[0].readBy = newReadBy);
        return store
          .dispatch(message.updateReadBy(messageData[0].messageId,
            newReadBy))
          .then((result) => {
            expect(result.data).toEqual(messageData[0].readBy);
          });
      });
  });
  describe('getReadBy', () => {
    it(`should dispatch message readers to the store
      when getReadBy is called`, () => {
        const store = mockStore({});
        mock.onPost(`/api/v1/users/${messageData[0].messageId}/read`)
          .reply(200, messageData[0].readBy);
        return store.dispatch(message.getReadBy(messageData[0].messageId))
          .then(() => {
          // return of async actions
            expect(store.getActions()).toEqual([{
              type: types.READ_BY,
              readBy: 'Kene, Francis, Love'
            }]);
          });
      });
  });
});
