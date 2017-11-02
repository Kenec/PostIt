'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _user = require('./user');

var _user2 = _interopRequireDefault(_user);

var _group = require('./group');

var _group2 = _interopRequireDefault(_group);

var _groupUser = require('./groupUser');

var _groupUser2 = _interopRequireDefault(_groupUser);

var _message = require('./message');

var _message2 = _interopRequireDefault(_message);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// combine all the models file and export them
exports.default = {
  user: _user2.default,
  group: _group2.default,
  groupUser: _groupUser2.default,
  message: _message2.default
};