import axios from 'axios';
import jwt from 'jsonwebtoken';

export function composeMessageAction(messageData) {
  return {
    type: "COMPOSE_MESSAGE",
    messageData: messageData
  }
}


export function composeMessage (groupId, messageData) {
    return dispatch => {
      return axios.post('/api/group/'+groupId+'/message',messageData);
    }
}
