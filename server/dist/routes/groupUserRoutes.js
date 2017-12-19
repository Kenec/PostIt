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

var groupUserRouter = _express2.default.Router();
var groupUserController = _controller2.default.groupUser;

groupUserRouter.post('/api/v1/groups/:groupId/user', _jwtAuth2.default, groupUserController.create);
groupUserRouter.post('/api/v1/groups/:id/users', _jwtAuth2.default, groupUserController.removeUser);
groupUserRouter.post('/api/v1/user/groups', _jwtAuth2.default, groupUserController.fetchUsersGroup);
groupUserRouter.post('/api/v1/users/:offset', _jwtAuth2.default, groupUserController.searchUser);
groupUserRouter.get('/api/v1/groups/:id/users', _jwtAuth2.default, groupUserController.getGroupMembers);
groupUserRouter.get('/api/v1/groups', _jwtAuth2.default, groupUserController.list);

exports.default = groupUserRouter;