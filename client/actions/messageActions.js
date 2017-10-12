// import
import axios from 'axios';
import { COMPOSE_MESSAGE,
  GET_NOTIFICATION,
  RETRIEVE_MESSAGE,
  READ_BY
} from './types';

/**
 * @function composeMessageAction
 * @param {object} messageData - message to be added
 * @return {object} - object of type COMPOSE_MESSAGE and messageData
 */
export function composeMessageAction(messageData) {
  return {
    type: COMPOSE_MESSAGE,
    messageData
  };
}
/**
 * @function getNotificationAction
 * @param  {object} notificationData - notification
 * @return {object} return object of type GET_NOTIFICATION and notificationData
 */
export function getNotificationAction(notificationData) {
  return {
    type: GET_NOTIFICATION,
    notificationData
  };
}
/**
 * @function clearRetrievedMessageAction
 * @param {object} messageData - messageData of  to be cleared
 * @return {object} - object of type COMPOSE_MESSAGE and messageData
 */
export function clearRetrievedMessageAction() {
  return {
    type: COMPOSE_MESSAGE,
    messageData: []
  };
}
/**
 * @function retrieveMessageAction
 * @param {object} retrieveMessages - message to retrieved board
 * @return {object} - object of type RETRIEVE_MESSAGE
 */
export function retrieveMessageAction(retrieveMessages) {
  return {
    type: RETRIEVE_MESSAGE,
    retrieveMessages
  };
}
/**
 * @function readByAction
 * @param {integer} readBy - users ids of message readers
 * @return {object} object of type READ_BY and readBy
 */
export function readByAction(readBy) {
  return {
    type: READ_BY,
    readBy
  };
}
/**
 * @function composeMessage
 * @param {string} groupId - group Id
 * @param {object} messageData - message to be posted
 * @return {json} - axios post respose 
 */
export function composeMessage(groupId, messageData) {
  return () => axios.post(`/api/v1/groups/${groupId}/message`, messageData);
}
/**
 * @function retrieveMessage
 * @param {string} groupId - group Id
 * @return {json} - axios post response
 */
export function retrieveMessage(groupId) {
  return () => axios.get(`/api/v1/groups/${groupId}/messages`);
}
/**
 * @function clearRetrievedMessage
 * @return {object} - returns empty messageData object
 */
export function clearRetrievedMessage() {
  return (dispatch) => {
    dispatch(clearRetrievedMessageAction());
  };
}
/**
 * @function addNotification
 * @param  {integer} messageId the message id
 * @param  {object} notificationObj notification object
 * @return {type} description
 */
export function addNotification(messageId, notificationObj) {
  return () =>
    // make a post request to add a notification
    axios.post(`/api/v1/groups/${messageId}/notification`, notificationObj);
}
/**
 * @function getNotification
 * @param {userId} userId user id to be used in fetching notification
 * @return {object} notification object
 */
export function getNotification(userId) {
  return dispatch =>
    // make a post request to get current notification
    axios.post('/api/v1/user/notifications', userId)
      .then((res) => {
        // dispatch the notification action to the store
        dispatch(getNotificationAction(res.data));
      });
}
/**
 * @function updateNotification
 * @param  {integer} messageId the message id
 * @param  {object} notificationObj notification object
 * @return {json}  axios post response
 */
export function updateNotification(messageId, notificationObj) {
  return () =>
    // make a post request to update the notification table
    axios.post(`/api/v1/user/${messageId}/notification`, notificationObj);
}
/**
 * @function updateReadBy
 * @param {integer} messageId the message id
 * @param  {object} userAndMessageObj object of user nd message
 * @return {json} axios post response
 */
export function updateReadBy(messageId, userAndMessageObj) {
  return () =>
    axios.post(`/api/v1/groups/${messageId}/updateReadBy`, userAndMessageObj);
}
/**
 * @function getReadBy
 * @param  {integer} messageId the message id
 * @return {object} description
 */
export function getReadBy(messageId) {
  return dispatch =>
    // make a post request to update the notification table
    axios.post(`/api/v1/users/${messageId}/read`)
      .then((res) => {
        dispatch(readByAction(res.data));
      });
}
