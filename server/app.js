const express = require('express');

const app = express();

// Routes

// home
app.get('/', (req, res) => {
  res.send('This is a server response');
});

// post: signup
app.post('/api/user/signup', (req, res) => {
  res.send('This is the sign up page for POST');
});

// post: signin
app.post('/api/user/signin', (req, res) => {
  res.send('This is the signin page for POST');
});

// post: group
app.post('/api/group', (req, res) => {
  res.send('This is the group page for POST');
});

// post: group id
app.post('/api/group/:group_id?/user', (req, res) => {
  res.send(`This user is added to group ${req.params.group_id}`);
});

// post: group message
app.post('/api/group/:group_id?/message', (req, res) => {
  res.send(`This message is added to group ${req.params.group_id}`);
});

// get: group message
app.get('/api/group/:group_id?/message', (req, res) => {
  res.send(`This message seen added to group ${req.params.group_id}`);
});

// Listen
app.listen(3000, () => {
  console.log('The application is running on localhost 3000');
});
