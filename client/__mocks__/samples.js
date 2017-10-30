
import jwt from 'jsonwebtoken';

const samples = {
  id: 1,
  offset: 1,
  groupId: 1,
  userId: 1,
  username: 'Kene',
  email: 'email@email.com',
  token: 'gibrishastoken',
  password: 'newpassword',
  newPassword: 'this is a new password',
  validToken:
    jwt.sign({
      id: 1,
      username: 'Kene'
    }, 'mynameiskenechukwu', { expiresIn: '2h' }), // token expires in 2h
  user: {
    id: 1,
    username: 'Kene'
  },
  userDetail: {
    username: 'Kene',
    password: 'kene'
  },
  userData: {
    username: 'LordLugard',
    email: 'lordlougard@email.com',
    password: 'Kene',
    phone: 123
  },
  newGroup: {
    groupId: 1,
    groupName: 'Random',
    createdBy: 'Kene'
  },
  groupData: {
    groupId: 1,
    groupName: 'Random',
    createdBy: 'Kene',
  },
  newUser: {
    id: 3,
    username: 'john'
  },
  usersData: [
    { id: 1, username: 'kene' },
    { id: 2, username: 'obi' },
  ],
  myMessage: {
    type: 'success',
    message: 'This is a success message'
  },
  usersGroup: {
    username: 'Kene',
    groups: [{ groupId: 1, groupName: 'Random', createdBy: 'Kene' }]
  },
  messageData: [{
    messageId: 1,
    message: 'Random message',
    sentBy: 'Kene',
    readBy: 'Kene',
  }],
  newMessage: {
    messageId: 2,
    message: 'Random message2',
    sentBy: 'Kene',
    readBy: 'Kene',
  },
  notificationData: [{
    messageId: 1,
    sentBy: 'Kene',
    readStatus: 1
  }],
  readBy: 'Kene, Obi',
  newReadBy: 'Kene, Francis, Love',
  newNotificationData: {
    messageId: 3,
    sentBy: 'Kene',
    readStatus: 1
  },
  updateNotificationData: {
    messageId: 1,
    sentBy: 'Kene',
    readStatus: 0
  }
};

export default samples;
