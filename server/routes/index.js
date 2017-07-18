import express from 'express';
import controller from '../controller';

const router = express.Router();
const userController = controller.user;
const groupController = controller.group;
const groupUserController = controller.groupUser;
const messageController = controller.message;

// ** /api/user/signup **
router.get('/', (req, res) => {
  res.send('<h1>This is the Home Page</h2>');
});

// ** /api/user/signup **
router.post('/api/user/signup', userController.create);

// ** /api/user/signin **
router.post('/api/user/signin', userController.list);

// ** /api/group **
router.post('/api/group', groupController.create);

// ** /api/group/<group id>/user **
router.post('/api/group/:groupid/user', groupUserController.create);

// ** /api/group/<group id>/user **
router.get('/api/group/:groupid', groupUserController.retrieve);

// ** /api/group/<group id>/user **
router.get('/api/group', groupUserController.list);

// ** /api/group/:groupid/messages **
router.post('/api/group/:groupid/message', messageController.create);

// ** /api/group/:groupid/messages **
router.get('/api/group/:groupid/messages', messageController.retrieve);


module.exports = router;
