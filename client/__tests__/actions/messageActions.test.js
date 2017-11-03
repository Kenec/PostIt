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

describe('Message Action', () => {
  const messageData = samples.messageData;
  const notificationData = samples.notificationData;
  const retrieveMessages = messageData.push(samples.newMessage);
  const readBy = samples.readBy;

  it('should have composeMessageAction action creator', () => {
    expect((message.composeMessageAction(messageData))).toEqual({
      type: types.COMPOSE_MESSAGE,
      messageData
    });
  });

  it('should have getNotificationAction action creator', () => {
    expect((message.getNotificationAction(notificationData))).toEqual({
      type: types.GET_NOTIFICATION,
      notificationData
    });
  });

  it('should have clearRetrievedMessageAction action creator', () => {
    expect((message.clearRetrievedMessageAction())).toEqual({
      type: types.COMPOSE_MESSAGE,
      messageData: []
    });
  });

  it('should have retrieveMessageAction action creator', () => {
    expect((message.retrieveMessageAction(retrieveMessages))).toEqual({
      type: types.RETRIEVE_MESSAGE,
      retrieveMessages
    });
  });

  it('should have readByAction action creator', () => {
    expect((message.readByAction(readBy))).toEqual({
      type: types.READ_BY,
      readBy
    });
  });

  it('should dispatch an async action when composeMessage is called', () => {
    const store = mockStore({});
    const groupId = samples.groupId;
    mock.onPost(`/api/v1/groups/${groupId}/message`, messageData)
      .reply(200, { message: 'sent!' });
    return store.dispatch(message.composeMessage(groupId, messageData))
      .then((messages) => {
        expect(messages.data).toEqual({
          message: 'sent!'
        });
      });
  });

  it('should have retrieveMessage return result of get request', () => {
    const store = mockStore({});
    const groupId = samples.groupId;
    mock.onGet(`/api/v1/groups/${groupId}/messages`)
      .reply(200, retrieveMessages);
    return store.dispatch(message.retrieveMessage(groupId))
      .then((messagesResult) => {
        expect(messagesResult.data).toEqual(messageData.length);
      });
  });

  it('should have clearRetrievedMessage return async action', () => {
    const store = mockStore({});
    expect(typeof message.clearRetrievedMessage()).toEqual('function');
    expect(store.dispatch(message.clearRetrievedMessage())).toEqual(
      undefined
    );
  });

  it('should have addNotification return result of post request', () => {
    const store = mockStore({});
    const newNotificationData = samples.newNotificationData;
    mock
      .onPost(`/api/v1/groups/${newNotificationData.messageId}/notification`,
        newNotificationData)
      .reply(200, notificationData.push(newNotificationData));
    return store.dispatch(message.addNotification(newNotificationData.messageId,
      newNotificationData))
      .then((notificationResult) => {
        expect(notificationResult.data).toEqual(notificationData.length);
      });
  });

  it('should dispatch an async action when getNotification is called', () => {
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

  it('should dispatch an action when updateNotification is called', () => {
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

  it('should dispatch an async action when updateReadBy is called', () => {
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

  it('should dispatch an async action when getReadBy is called', () => {
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
