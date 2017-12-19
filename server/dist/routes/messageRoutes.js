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

var _notificationMiddleware = require('../shared/middleware/notificationMiddleware');

var _notificationMiddleware2 = _interopRequireDefault(_notificationMiddleware);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var messageRouter = _express2.default.Router();
var messageController = _controller2.default.message;

messageRouter.post('/api/v1/groups/:groupId/message', _jwtAuth2.default, messageController.create);
messageRouter.get('/api/v1/groups/:groupId/messages', _jwtAuth2.default, messageController.retrieve);
messageRouter.post('/api/v1/groups/:messageId/notification', _jwtAuth2.default, _notificationMiddleware2.default, messageController.addNotification);
messageRouter.post('/api/v1/groups/:messageId/updateReadBy', _jwtAuth2.default, messageController.updateReadBy);
messageRouter.post('/api/v1/user/notifications', _jwtAuth2.default, messageController.getNotification);
messageRouter.post('/api/v1/user/:messageId/notification', _jwtAuth2.default, messageController.updateNotification);
messageRouter.post('/api/v1/users/:messageId/read', _jwtAuth2.default, messageController.getReadBy);

exports.default = messageRouter;