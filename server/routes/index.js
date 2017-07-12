const express = require('express');

const router = express.Router();

const userController = require('../controller').user;
const groupController = require('../controller').group;
const groupUserController = require('../controller').groupUser;
const messageController = require('../controller').message;

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

// ** /api/group/:groupid/messages **
router.post('/api/group/:groupid/message', messageController.create);

// ** /api/group/:groupid/messages **
router.get('/api/group/:groupid/messages', messageController.retrieve);


module.exports = router;
