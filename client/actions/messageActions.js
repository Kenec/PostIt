// import
import axios from 'axios';
import { COMPOSE_MESSAGE, GET_NOTIFICATION,
  RETRIEVE_MESSAGE, READ_BY, COMPOSE_MESSAGE_ERROR,
  COMPOSE_MESSAGE_SUCCESS, RETRIEVE_MESSAGE_ERROR } from './types';

/**
 * Retrieve message from the database
 * @function retrieveMessage
 * @param {string} groupId - group Id
 * @return {json} - axios post response
 */
export const retrieveMessage = groupId => (
  dispatch => axios.get(`/api/v1/groups/${groupId}/messages`)
    .then(
      (message) => {
        dispatch({ type: RETRIEVE_MESSAGE, retrieveMessages: message.data });
        dispatch({ type: RETRIEVE_MESSAGE_ERROR, error: '' });
      },
      ({ response }) => {
        dispatch({ type: RETRIEVE_MESSAGE_ERROR,
          error: response.data.message });
      }
    )
    .catch(() => {})
);

/**
 * Add notification to the database
 * @function addNotification
 * @param  {integer} messageId the message id
 * @param  {object} notificationObj notification object
 * @return {type} description
 */
export const addNotification = (messageId, notificationObj) => (
  () =>
    // make a post request to add a notification
    axios.post(`/api/v1/groups/${messageId}/notification`, notificationObj)
);

/**
 * Add message to the database
 * @function composeMessage
 * @param {string} groupId - group Id
 * @param {object} messageData - message to be posted
 * @param  {array} messageReaders array of users in a group
 * @return {json} - axios post respose
 */
export const composeMessage = (groupId, messageData, messageReaders) => (
  dispatch => axios.post(`/api/v1/groups/${groupId}/message`, messageData)
    .then(
      ({ data }) => {
        const { id, sentBy } = data;
        dispatch(retrieveMessage(groupId));
        dispatch(addNotification(id,
          { messageReaders, senderId: sentBy, groupId }));
        dispatch({ type: COMPOSE_MESSAGE_ERROR, error: '' });
        dispatch({ type: COMPOSE_MESSAGE_SUCCESS, success: 'Sent!' });
      },
      ({ response }) => {
        dispatch({ type: COMPOSE_MESSAGE_ERROR, error: response.data });
        dispatch({ type: COMPOSE_MESSAGE_SUCCESS, success: '' });
      }
    )
    .catch(() => {})
);

/**
 * Dispatch the clearRetrieveAction
 * @function clearRetrievedMessage
 * @return {object} - returns empty messageData object
 */
export const clearRetrievedMessage = () => (
  (dispatch) => {
    dispatch({ type: COMPOSE_MESSAGE, messageData: [] });
  }
);

/**
 * Get notification from the database
 * @function getNotification
 * @param {userId} userId user id to be used in fetching notification
 * @return {object} notification object
 */
export const getNotification = userId => (
  dispatch =>
    // make a post request to get current notification
    axios.post('/api/v1/user/notifications', userId)
      .then((res) => {
        // dispatch the notification action to the store
        dispatch({ type: GET_NOTIFICATION, notificationData: res.data });
      })
);

/**
 * Update notification in the table
 * @function updateNotification
 * @param  {integer} messageId the message id
 * @param  {object} notificationObj notification object
 * @return {json}  axios post response
 */
export const updateNotification = (messageId, notificationObj) => (
  () =>
    // make a post request to update the notification table
    axios.post(`/api/v1/user/${messageId}/notification`, notificationObj)
);

/**
 * Update readBy in the database
 * @function updateReadBy
 * @param {integer} messageId the message id
 * @param  {object} userAndMessageObj object of user nd message
 * @return {json} axios post response
 */
export const updateReadBy = (messageId, userAndMessageObj) => (
  () =>
    axios.post(`/api/v1/groups/${messageId}/updateReadBy`, userAndMessageObj)
);

/**
 * Get readBy from the database
 * @function getReadBy
 * @param  {integer} messageId the message id
 * @return {object} description
 */
export const getReadBy = messageId => (
  dispatch =>
    // make a post request to update the notification table
    axios.post(`/api/v1/users/${messageId}/read`)
      .then((res) => {
        dispatch({ type: READ_BY, readBy: res.data });
      })
);
