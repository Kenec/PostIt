const express = require('express');
const router = express.Router();
const models = require('../models/index');

// ** /api/user/signup **
router.post('/api/user/signup', (req, res) => {
  models.signup.create({
      userid: req.body.userid,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
   }).then(signup => {
    res.json(signup);
  });
});

// ** /api/user/signin **
router.post('/api/user/signin', (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  models.signup.findOne({
    where:{
      username:username,
      password:password
    }
   }).then(signup => {
    res.json(signup);
  });
});

// ** /api/group **
router.post('/api/group', (req, res) => {
  models.group.create({
      groupid: req.body.groupid,
      groupname: req.body.groupname,
      createdby: req.body.createdby,
      members: "kene, philip, ronny"
   }).then(group => {
    res.json(group);
  });
});





module.exports = router;
