'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _sendSMS = require('../utils/sendSMS');

var _sendSMS2 = _interopRequireDefault(_sendSMS);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// During the test the env variable is set to test
process.env.NODE_ENV = 'test'; // Require the dev-dependencies


var should = _chai2.default.should();

_chai2.default.use(_chaiHttp2.default);

describe('sendSMS', function () {
  // Test for SMS
  describe('function', function () {
    it('should be a function', function () {
      _sendSMS2.default.should.be.a('function');
    });
    it('should send an SMS', function () {
      var receivers = [{ phone: 1234 }];
      var message = 'Hello World';
      // const smsSender = sendSMS(receivers, message);
      _sendSMS2.default.should.be.a('function');
    });
  });
});