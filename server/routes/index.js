const express = require('express');

const router = express.Router();
const models = require('../models/index');

const userController = require("../controller").user;
const groupController = require("../controller").group;
const groupUserController = require("../controller").groupUser;

// ** /api/user/signup **
router.post('/api/user/signup', userController.create);

// ** /api/user/signin **
router.post('/api/user/signin', userController.list);

// ** /api/group **
router.post('/api/group', groupController.create);

// ** /api/group/<group id>/user **
router.post('/api/group/:groupid/user',groupUserController.create);

// ** /api/group/<group id>/user **
router.get('/api/group/:groupid',groupUserController.retrieve);


// ** /api/group/:groupid/messages **
router.post('/api/group/:groupid/messages', (req, res) => {
  models.message.create({
    groupid: req.params.groupid,
    message: req.body.message,
    priority: req.body.priority
  }).then((message) => {
    res.json(message);
  });
});

// ** /api/group/:groupid/messages **
router.get('/api/group/:groupid/messages', (req, res) => {
  const groupid = req.params.groupid;
  models.message.findAll({
    where: {
      groupid
    }
  }).then((message) => {
    res.json(message);
  });
});


module.exports = router;
