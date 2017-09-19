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

// protected routes

// ** /api/group **
router.post('/api/group', jwtAuth, groupController.create);

// ** /api/group/<group id>/user **
router.post('/api/group/:groupid/user', jwtAuth, groupUserController.create);

// ** /api/group/<group id>/user **
router.post('/api/group/creator', jwtAuth, groupController.fetchGroupByCreator);

// *** To get the groups of a looged in user
router.post('/api/users/me/', jwtAuth, groupUserController.fetchUserAndGroup);

// *** To get the groups of a looged in user
router.post('/api/users/username', jwtAuth, userController.FetchMemberByName);

// *** api route to get all users *** //
router.post('/api/users/:offset', jwtAuth, groupUserController.searchUser);

// ** /api/group/<group id>/user **
router.get('/api/group/:groupid', jwtAuth, groupController.retrieve);

// *** /api/groups/:id/users
router.get('/api/groups/:id/users', jwtAuth, groupUserController.fetchMembersOfGroup);

// ** /api/group/<group id>/user **
router.get('/api/group', jwtAuth, groupUserController.list);

// ** /api/group/:groupid/messages **
router.post('/api/group/:groupid/message', jwtAuth, messageController.create);

// ** /api/group/:groupid/messages **
router.get('/api/group/:groupid/messages', jwtAuth, messageController.retrieve);

// api route to add notification when a message is sent
router.post('/api/group/:messageid/notification', jwtAuth,
  messageController.addMessageNotification);

// api route to update readBy Column in the message table
router.post('/api/group/:messageid/updateReadBy', jwtAuth,
  messageController.updateReadBy);

// api route to get notification when a message is sent
router.post('/api/user/notifications', jwtAuth,
  messageController.getMessageNotification);

// api route to update notification when a message is sent
router.post('/api/user/:messageid/notification', jwtAuth,
  messageController.updateMessageNotification);

// api route to update notification when a message is sent
router.post('/api/users/:messageid/read', jwtAuth,
  messageController.getUsersWhoReadMessagesInGroup);

// ** /groupInfo **
router.get('*', (req, res) => {
  res.sendFile(path.resolve('./client/index.html'));
});

module.exports = router;
