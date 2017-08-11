import axios from 'axios';

/**
 * Add user to a group action.
 * @constructor
 * @param {object} messageData - data of message to be added to the message
 * board
 * .
 *
 */
export function composeMessageAction(messageData) {
  return {
    type: 'COMPOSE_MESSAGE',
    messageData
  };
}
/**
 * Add user to a group action.
 * @constructor
 * @param {object} messageData - data of message to be added to the message
 * board
 * .
 *
 */
export function clearRetrievedMessageAction() {
  return {
    type: 'COMPOSE_MESSAGE',
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
    type: 'RETRIEVE_MESSAGE',
    retrieveMessages
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
