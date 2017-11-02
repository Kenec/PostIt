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

var groupRouter = _express2.default.Router();
var groupController = _controller2.default.group;

groupRouter.post('/api/v1/groups', _jwtAuth2.default, groupController.create);
<<<<<<< HEAD
groupRouter.post('/api/v1/groups/creator', _jwtAuth2.default, groupController.getOwnerGroups);
=======
groupRouter.post('/api/v1/groups/creator', _jwtAuth2.default, groupController.fetchGroupByCreator);
>>>>>>> update master with current head
groupRouter.get('/api/v1/groups/:groupId', _jwtAuth2.default, groupController.retrieve);

exports.default = groupRouter;