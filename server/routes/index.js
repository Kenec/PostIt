const express = require('express');

const router = express.Router();
const models = require('../models/index');

// ** render /api/user/signup **
router.get('/api/user/signup', (req, res) => {
  res.send('Ok this is working');
});


// ** /api/user/signup **
router.post('/api/user/signup', (req, res) => {
  models.signup.create({
    userid: req.body.userid,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  }).then((signup) => {
    res.json(signup);
  });
});

// ** /api/user/signin **
router.post('/api/user/signin', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  models.signup.findOne({
    where: {
      username,
      password
    }
  }).then((signup) => {
    res.json(signup);
  });
});

// ** /api/group **
router.post('/api/group', (req, res) => {
  models.group.create({
    groupid: req.body.groupid,
    groupname: req.body.groupname,
    createdby: req.body.createdby,
    members: ''
  }).then((group) => {
    res.json(group);
  });
});

// ** /api/group/<group id>/user **
router.post('/api/group/:groupid/user', (req, res) => {
  const groupid = req.params.groupid;
  const newMember = req.body.new_member;
  models.group.findOne({
    where: { groupid }
  })
    .then(group => group.updateAttributes({
      members: `${group.dataValues.members}, ${newMember}`
    }))
    .then((updatedGroup) => {
      res.json(updatedGroup);
    });
});

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
