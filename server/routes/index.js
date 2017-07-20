import express from 'express';
import path from 'path';
import controller from '../controller';
import jwt from "jsonwebtoken";

const router = express.Router();
const userController = controller.user;
const groupController = controller.group;
const groupUserController = controller.groupUser;
const messageController = controller.message;

// ** /api/user/signup **
router.get('/', (req, res) => {
  res.sendFile(path.resolve('../client/index.html'));
});

// ** /api/user/signup **
router.post('/api/user/signup', userController.create);

// ** /api/user/signin **
router.post('/api/user/signin', userController.list);

let token;
// setting a middleware to protect all other routes
  router.use((req, res, next) => {
    token = req.body.token || req.query.token ||
      req.headers["x-access-token"];
    jwt.verify(token, "kenechukwu", (err, authToken) => {
      if (err) {
        res.status(401)
          .send({
            message: "sorry, user not authenticated, invalid access token"
          });
        return;
      }
      // if authenticated with auth token,
      // save auth token and to request for use in other routes
      req.authToken = authToken;
      authToken = JSON.stringify(authToken);
      // testing for saving user data
      // res.cookie("userid", decoded.id);
      res.append("user", authToken);
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
router.get('/api/group/:groupid', groupUserController.retrieve);

// ** /api/group/<group id>/user **
router.get('/api/group', groupUserController.list);

// ** /api/group/:groupid/messages **
router.post('/api/group/:groupid/message', messageController.create);

// ** /api/group/:groupid/messages **
router.get('/api/group/:groupid/messages', messageController.retrieve);


module.exports = router;
