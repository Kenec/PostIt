import express from 'express';
import path from 'path';
import controller from '../controller';
import jwtAuth from '../shared/middleware/jwtAuth';

const router = express.Router();
const userController = controller.user;
const groupController = controller.group;
const groupUserController = controller.groupUser;
const messageController = controller.message;

router.get('/', (req, res) => {
  res.sendFile(path.resolve('./client/index.html'));
});

// ************************************************************************* //
// ******************************* api routes ****************************** //
// ************************************************************************* //

// signup a new user
router.post('/api/v1/users/signup', userController.create);

// signin an existing user
router.post('/api/v1/users/signin', userController.list);

// existing user request for password reset
router.post('/api/v1/users/resetpassword', userController.resetPassword);

// api route to check for valid token for resetting password
router.get('/api/v1/users/resetpassword/:token',
  userController.isTokenValid);

// routes to reset password of a user
router.post('/api/v1/users/resetpassword/:token',
  userController.updatePassword);

// ****  protected routes ***** //

// create group
router.post('/api/v1/groups', jwtAuth, groupController.create);

// add user to a group
router.post('/api/v1/groups/:groupid/user',
  jwtAuth, groupUserController.create);

// api route to remove user from the group
router.post('/api/v1/groups/:id/users', jwtAuth,
  groupUserController.removeUserFromGroup);

// fetch all group created by a user
router.post('/api/v1/groups/creator', jwtAuth,
  groupController.fetchGroupByCreator);

// retrieve all groups a user belonged to
router.post('/api/v1/user/groups', jwtAuth,
  groupUserController.fetchUsersGroup);

// retrieve a user by username
router.post('/api/v1/users/username', jwtAuth,
  userController.FetchMemberByName);

// search users
router.post('/api/v1/users/:offset', jwtAuth,
  groupUserController.searchUser);

// fetch a group by group id
router.get('/api/v1/groups/:groupid', jwtAuth,
  groupController.retrieve);

// fetch members of a group
router.get('/api/v1/groups/:id/users', jwtAuth,
  groupUserController.fetchMembersOfGroup);

// get all groups
router.get('/api/v1/groups', jwtAuth,
  groupUserController.list);

// create new message
router.post('/api/v1/groups/:groupid/message',
  jwtAuth, messageController.create);

// get messages in a group
router.get('/api/v1/groups/:groupid/messages',
  jwtAuth, messageController.retrieve);

// api route to add notification when a message is sent
router.post('/api/v1/groups/:messageid/notification', jwtAuth,
  messageController.addMessageNotification);

// api route to update readBy Column in the message table
router.post('/api/v1/groups/:messageid/updateReadBy', jwtAuth,
  messageController.updateReadBy);

// api route to get notification when a message is sent
router.post('/api/v1/user/notifications', jwtAuth,
  messageController.getMessageNotification);

// api route to update notification when a message is sent
router.post('/api/v1/user/:messageid/notification', jwtAuth,
  messageController.updateMessageNotification);

// api route to update notification when a message is sent
router.post('/api/v1/users/:messageid/read', jwtAuth,
  messageController.getReadBysInGroup);


// ** /groupInfo **
router.get('*', (req, res) => {
  res.sendFile(path.resolve('./client/index.html'));
});

module.exports = router;
