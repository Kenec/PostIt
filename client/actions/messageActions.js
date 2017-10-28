// import
import axios from 'axios';
import { COMPOSE_MESSAGE, GET_NOTIFICATION,
  RETRIEVE_MESSAGE, READ_BY } from './types';

/**
 * Add message to the store
 * @function composeMessageAction
 * @param {object} messageData - message to be added
 * @return {object} - object of type COMPOSE_MESSAGE and messageData
 */
export const composeMessageAction = messageData => (
  {
    type: COMPOSE_MESSAGE,
    messageData
  }
);

/**
 * get notification from the store
 * @function getNotificationAction
 * @param  {object} notificationData - notification
 * @return {object} return object of type GET_NOTIFICATION and notificationData
 */
export const getNotificationAction = notificationData => (
  {
    type: GET_NOTIFICATION,
    notificationData
  }
);

/**
 * Clear retrieved message from the store
 * @function clearRetrievedMessageAction
 * @param {object} messageData - messageData to be cleared
 * @return {object} - object of type COMPOSE_MESSAGE and messageData
 */
export const clearRetrievedMessageAction = () => (
  {
    type: COMPOSE_MESSAGE,
    messageData: []
  }
);

/**
 * Retrieve message from the store
 * @function retrieveMessageAction
 * @param {object} retrieveMessages - message to retrieved board
 * @return {object} - object of type RETRIEVE_MESSAGE
 */
export const retrieveMessageAction = retrieveMessages => (
  {
    type: RETRIEVE_MESSAGE,
    retrieveMessages
  }
);

/**
 * Add message readBy's to the store
 * @function readByAction
 * @param {integer} readBy - users ids of message readers
 * @return {object} object of type READ_BY and readBy
 */
export const readByAction = readBy => (
  {
    type: READ_BY,
    readBy
  }
);

/**
 * Add message to the database
 * @function composeMessage
 * @param {string} groupId - group Id
 * @param {object} messageData - message to be posted
 * @param {object} prevMessage - previous message and User info
 * @return {json} - axios post respose 
 */
export const composeMessage = (groupId, messageData) => (
  () => axios.post(`/api/v1/groups/${groupId}/message`, messageData)
);

/**
 * Retrieve message from the database
 * @function retrieveMessage
 * @param {string} groupId - group Id
 * @return {json} - axios post response
 */
export const retrieveMessage = groupId => (
  () => axios.get(`/api/v1/groups/${groupId}/messages`)
);

/**
 * Dispatch the clearRetrieveAction
 * @function clearRetrievedMessage
 * @return {object} - returns empty messageData object
 */
export const clearRetrievedMessage = () => (
  (dispatch) => {
    dispatch(clearRetrievedMessageAction());
  }
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
        dispatch(getNotificationAction(res.data));
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
        dispatch(readByAction(res.data));
      })
);
