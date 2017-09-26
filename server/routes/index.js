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

// ** /api/user/signup **
router.post('/api/v1/user/signup', userController.create);

// ** /api/user/signin **
router.post('/api/v1/user/signin', userController.list);

// routes for request password reset mail
router.post('/api/v1/user/resetpassword', userController.resetPassword);

// api route to check for valid token for resetting password
router.get('/api/v1/user/resetpassword/:token',
  userController.checkValidTokenForPasswordReset);

// routes to reset password od a user
router.post('/api/v1/user/resetpassword/:token',
  userController.updatePassword);

// protected routes

// ** /api/group **
router.post('/api/v1/group', jwtAuth, groupController.create);

// ** /api/group/<group id>/user **
router.post('/api/v1/group/:groupid/user',
  jwtAuth, groupUserController.create);

// ** /api/group/<group id>/user **
router.post('/api/v1/group/creator', jwtAuth,
  groupController.fetchGroupByCreator);

// *** To get the groups of a looged in user
router.post('/api/v1/users/me/', jwtAuth,
  groupUserController.fetchUserAndGroup);

// *** To get the groups of a looged in user
router.post('/api/v1/users/username', jwtAuth,
  userController.FetchMemberByName);

// *** api route to get all users *** //
router.post('/api/v1/users/:offset', jwtAuth,
  groupUserController.searchUser);

// ** /api/group/:groupid **
router.get('/api/v1/group/:groupid', jwtAuth,
  groupController.retrieve);

// *** /api/groups/:id/users
router.get('/api/v1/groups/:id/users', jwtAuth,
  groupUserController.fetchMembersOfGroup);

// ** /api/group **
router.get('/api/v1/group', jwtAuth,
  groupUserController.list);

// api route to remove user from the group
router.post('/api/v1/group/:id/removeuser', jwtAuth,
  groupUserController.removeUserFromGroup);

// ** /api/group/:groupid/messages **
router.post('/api/v1/group/:groupid/message',
  jwtAuth, messageController.create);

// ** /api/group/:groupid/messages **
router.get('/api/v1/group/:groupid/messages',
  jwtAuth, messageController.retrieve);

// api route to add notification when a message is sent
router.post('/api/v1/group/:messageid/notification', jwtAuth,
  messageController.addMessageNotification);

// api route to update readBy Column in the message table
router.post('/api/v1/group/:messageid/updateReadBy', jwtAuth,
  messageController.updateReadBy);

// api route to get notification when a message is sent
router.post('/api/v1/user/notifications', jwtAuth,
  messageController.getMessageNotification);

// api route to update notification when a message is sent
router.post('/api/v1/user/:messageid/notification', jwtAuth,
  messageController.updateMessageNotification);

// api route to update notification when a message is sent
router.post('/api/v1/users/:messageid/read', jwtAuth,
  messageController.getUsersWhoReadMessagesInGroup);

// ** /groupInfo **
router.get('*', (req, res) => {
  res.sendFile(path.resolve('./client/index.html'));
});

module.exports = router;
