import express from 'express';
import path from 'path';
import jwt from 'jsonwebtoken';
import controller from '../controller';
import config from '../config';

const router = express.Router();
const userController = controller.user;
const groupController = controller.group;
const groupUserController = controller.groupUser;
const messageController = controller.message;

// This is the general route for the react components //
router.get('/', (req, res) => {
  res.sendFile(path.resolve('./client/index.html'));
});

// ** /signup **
router.get('/signup', (req, res) => {
  res.sendFile(path.resolve('./client/index.html'));
});

// routes to change password
router.get('/recoverpassword/:token', (req, res) => {
  res.sendFile(path.resolve('./client/index.html'));
});

// ** /recoverpassword **
router.get('/recoverpassword', (req, res) => {
  res.sendFile(path.resolve('./client/index.html'));
});

// ** /message **
router.get('/message', (req, res) => {
  res.sendFile(path.resolve('./client/index.html'));
});

// ** /composeMessage **
router.get('/composeMessage', (req, res) => {
  res.sendFile(path.resolve('./client/index.html'));
});

// ** /sentMessage **
router.get('/sentMessage', (req, res) => {
  res.sendFile(path.resolve('./client/index.html'));
});

// ** /archiveMessage **
router.get('/archiveMessage', (req, res) => {
  res.sendFile(path.resolve('./client/index.html'));
});
// ** /detailMessage **
router.get('/detailMessage', (req, res) => {
  res.sendFile(path.resolve('./client/index.html'));
});

// ** /createGroup **
router.get('/createGroup', (req, res) => {
  res.sendFile(path.resolve('./client/index.html'));
});
// ** /dashboard **
router.get('/dashboard', (req, res) => {
  res.sendFile(path.resolve('./client/index.html'));
});
// ** /groups **
router.get('/group/:groupid', (req, res) => {
  res.sendFile(path.resolve('./client/index.html'));
});
// ** /groups **
router.get('/group/:groupid/:messageid', (req, res) => {
  res.sendFile(path.resolve('./client/index.html'));
});
// ** /addUser **
router.get('/addUser', (req, res) => {
  res.sendFile(path.resolve('./client/index.html'));
});

// ** /groupInfo **
router.get('/groupInfo', (req, res) => {
  res.sendFile(path.resolve('./client/index.html'));
});

// ************************************************************************* //
// ******************************* api routes ****************************** //
// ************************************************************************* //

// ** /api/user/signup **
router.post('/api/user/signup', userController.create);

// ** /api/user/signin **
router.post('/api/user/signin', userController.list);

// routes for request password reset mail
router.post('/api/user/resetpassword', userController.resetPassword);

// api route to check for valid token for resetting password
router.get('/api/user/resetpassword/:token',
  userController.checkValidTokenForPasswordReset);

// routes to reset password od a user
router.post('/api/user/resetpassword/:token', userController.updatePassword);


let token;
// setting a middleware to protect all other routes
router.use((req, res, next) => {
  token = req.body.token || req.query.token ||
      req.headers.Authorization || req.headers['x-access-token'];
  jwt.verify(token, config.jwtSecret, (err, authToken) => {
    if (err) {
      res.status(401)
        .send({
          message: 'Sorry, user not authenticated, invalid access token'
        });
      return;
    }
    // if authenticated with auth token,
    // save auth token and to request for use in other routes
    req.authToken = authToken;
    authToken = JSON.stringify(authToken);
    // testing for saving user data
    // res.cookie("userid", decoded.id);
    res.append('user', authToken);
    next();
  });
});

// protected routes
// set after the above middleware to prevent access to unathourized

// ** /api/group **
router.post('/api/group', groupController.create);

// ** /api/group/<group id>/user **
router.post('/api/group/:groupid/user', groupUserController.create);

// ** /api/group/<group id>/user **
router.post('/api/group/creator', groupController.fetchGroupByCreator);

// *** To get the groups of a looged in user
router.post('/api/users/me/', groupUserController.fetchUserAndGroup);

// *** To get the groups of a looged in user
router.post('/api/users/username', userController.FetchMemberByName);

// *** api route to get all users *** //
router.post('/api/users', groupUserController.searchUser);

// ** /api/group/<group id>/user **
router.get('/api/group/:groupid', groupController.retrieve);

// *** /api/groups/:id/users
router.get('/api/groups/:id/users', groupUserController.fetchMembersOfGroup);

// ** /api/group/<group id>/user **
router.get('/api/group', groupUserController.list);

// ** /api/group/:groupid/messages **
router.post('/api/group/:groupid/message', messageController.create);

// ** /api/group/:groupid/messages **
router.get('/api/group/:groupid/messages', messageController.retrieve);

// api route to add notification when a message is sent
router.post('/api/group/:messageid/notification',
  messageController.addMessageNotification);

// api route to get notification when a message is sent
router.post('/api/user/notifications',
  messageController.getMessageNotification);

// api route to update notification when a message is sent
router.post('/api/user/:messageid/notification',
  messageController.updateMessageNotification);

// api route to update notification when a message is sent
router.post('/api/users/:messageid/read',
  messageController.getUsersWhoReadMessagesInGroup);

module.exports = router;
