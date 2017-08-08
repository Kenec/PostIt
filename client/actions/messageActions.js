import axios from 'axios';
import jwt from 'jsonwebtoken';

export function composeMessageAction(messageData) {
  return {
    type: "COMPOSE_MESSAGE",
    messageData: messageData
  }
}
export function retrieveMessageAction(retrieveMessages) {
  return {
    type: "RETRIEVE_MESSAGE",
    retrieveMessages: retrieveMessages
  }
}

export function composeMessage (groupId, messageData) {
    return dispatch => {
      return axios.post('/api/group/'+groupId+'/message',messageData);
    }
}

export function retrieveMessage (groupId) {
    return dispatch => {
      return axios.get('/api/group/'+groupId+'/messages').then( res => {
          dispatch(retrieveMessageAction(res.data));
        });
    }
}
