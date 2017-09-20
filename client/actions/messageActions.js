// import
import axios from 'axios';
import { COMPOSE_MESSAGE,
  GET_NOTIFICATION, RETRIEVE_MESSAGE,
  USERS_WHO_HAVE_READ_MESSAGE
} from './types';
/**
 * compose message action.
 * @constructor
 * @param {object} messageData - data of message to be added to the message
 * board
 * .
 *
 */
export function composeMessageAction(messageData) {
  return {
    type: COMPOSE_MESSAGE,
    messageData
  };
}

/**
 * addNotificationAction - description
 *
 * @param  {object} notificationData description
 * @return {type}                  description
 */
export function getNotificationAction(notificationData) {
  return {
    type: GET_NOTIFICATION,
    notificationData
  };
}

/**
 * clear retrieved message.
 * @constructor
 * @param {object} messageData - data of message to be added to the message
 * board
 * .
 *
 */
export function clearRetrievedMessageAction() {
  return {
    type: COMPOSE_MESSAGE,
    messageData: []
  };
}
/**
 * retrieve message action.
 * @constructor
 * @param {object} retrieveMessages - data of message to retrieved
 * board
 * .
 *
 */
export function retrieveMessageAction(retrieveMessages) {
  return {
    type: RETRIEVE_MESSAGE,
    retrieveMessages
  };
}
/**
 * get users who have read message action.
 * @constructor
 * @param {INTEGER} usersWhoHaveReadMessage - users id of those who have
 * read messages
 * .
 *
 */
export function getUsersWhoReadMessageAction(usersWhoHaveReadMessage) {
  return {
    type: USERS_WHO_HAVE_READ_MESSAGE,
    usersWhoHaveReadMessage
  };
}

/**
 * compose messge action.
 * @constructor
 * @param {string} groupId - group Id
 * @param {object} messageData - message data from the UI
 * board
 * .
 *
 */
export function composeMessage(groupId, messageData) {
  return () => axios.post(`/api/group/${groupId}/message`, messageData);
}

/**
 * compose messge action.
 * @constructor
 * @param {string} groupId - group Id
 * board
 * .
 *
 */
export function retrieveMessage(groupId) {
  return () => axios.get(`/api/group/${groupId}/messages`);
}


/**
 * clearRetrievedMessage - description
 *
 * @return {function}  description
 */
export function clearRetrievedMessage() {
  return (dispatch) => {
    dispatch(clearRetrievedMessageAction());
  };
}

/**
 * addNotification - description
 *@param  {INTEGER} messageId the message id
 * @param  {object} notificationObj notification object
 * @return {type}                  description
 */
export function addNotification(messageId, notificationObj) {
  return () =>
    // make a post request to add a notification
    axios.post(`/api/group/${messageId}/notification`, notificationObj);
}

/**
 * getNotification - description
 * @param {userId} userId user id to be used in fetching notification
 * @return {type} description
 */
export function getNotification(userId) {
  return dispatch =>
    // make a post request to get current notification
    axios.post('/api/user/notifications', userId)
      .then((res) => {
        // dispatch the notification action to the store
        dispatch(getNotificationAction(res.data));
      });
}

/**
 * addNotification - description
 *@param  {INTEGER} messageId the message id
 * @param  {object} notificationObj notification object
 * @return {type}                  description
 */
export function updateNotification(messageId, notificationObj) {
  return () =>
    // make a post request to update the notification table
    axios.post(`/api/user/${messageId}/notification`, notificationObj);
}


/**
 * updateReadBy - this method updates the readby column in the message table
 * @param {INTEGER} messageId the message id
 * @param  {object} userAndMessageObj description
 * @return {type}                   description
 */
export function updateReadBy(messageId, userAndMessageObj) {
  return () =>
    axios.post(`/api/group/${messageId}/updateReadBy`, userAndMessageObj);
}

/**
 * getUsersWhoReadMessage - description
 *@param  {INTEGER} messageId the message id
 * @return {type}                  description
 */
export function getUsersWhoReadMessage(messageId) {
  return dispatch =>
    // make a post request to update the notification table
    axios.post(`/api/users/${messageId}/read`)
      .then((res) => {
        dispatch(getUsersWhoReadMessageAction(res.data));
      });
}
