'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _userRoutes = require('./userRoutes');

var _userRoutes2 = _interopRequireDefault(_userRoutes);

var _groupRoutes = require('./groupRoutes');

var _groupRoutes2 = _interopRequireDefault(_groupRoutes);

var _messageRoutes = require('./messageRoutes');

var _messageRoutes2 = _interopRequireDefault(_messageRoutes);

var _groupUserRoutes = require('./groupUserRoutes');

var _groupUserRoutes2 = _interopRequireDefault(_groupUserRoutes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.use('/', _userRoutes2.default);
router.use('/', _groupRoutes2.default);
router.use('/', _messageRoutes2.default);
router.use('/', _groupUserRoutes2.default);

exports.default = router;