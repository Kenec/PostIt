'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _controller = require('../controller');

var _controller2 = _interopRequireDefault(_controller);

var _jwtAuth = require('../shared/middleware/jwtAuth');

var _jwtAuth2 = _interopRequireDefault(_jwtAuth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var userRouter = _express2.default.Router();
var userController = _controller2.default.user;

userRouter.post('/api/v1/users/signup', userController.create);
userRouter.post('/api/v1/users/signin', userController.signin);
userRouter.post('/api/v1/users/resetpassword', userController.resetPassword);
userRouter.get('/api/v1/users/resetpassword/:token', userController.isTokenValid);
userRouter.post('/api/v1/users/resetpassword/:token', userController.updatePassword);
userRouter.post('/api/v1/users/username', _jwtAuth2.default, userController.fetchUserByName);

exports.default = userRouter;