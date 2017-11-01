const componentMocks = {
  messages: [{
    id: '1',
    text: 'Hello'
  }],
  groupSelectedId: '1',
  message: {
    messageData: [{
      id: 1,
      ReadBy: '1,2,3',
      createdAt: '2-10-2019',
      message: 'Hello World',
      priorityLevel: 'Normal',
      Users: { username: 'Kene' }
    }],
    readBy: { messageReadUsers: [{ Reader: { username: 'Kene' } }] }
  },
  groupId: '1',
  groupName: 'Random',
  auth: {
    user: {
      id: 1,
      username: 'Kene'
    }
  },
  group: {
    groups: { groups: [{ id: '1', groupName: 'Random' }] },
    groupsBelonged: [{ id: '1', groupName: 'Random' }],
    searchedUsers: { rows: [
      {
        id: 1,
        username: 'Kene',
        email: 'kene@email.com',
        phone: '234'
      },
      {
        id: 2,
        username: 'Obi',
        email: 'obi@email.com',
        phone: '234'
      }
    ] },
    usersInGroup: [{ id: '1', username: 'Kene' }]
  },
  params: { groupid: 1, token: 'thisistoken' }
};

export default componentMocks;
