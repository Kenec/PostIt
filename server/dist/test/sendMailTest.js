'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _nodemailerMockTransport = require('nodemailer-mock-transport');

var _nodemailerMockTransport2 = _interopRequireDefault(_nodemailerMockTransport);

var _nodemailer = require('nodemailer');

var _nodemailer2 = _interopRequireDefault(_nodemailer);

var _sendMail = require('../utils/sendMail');

var _sendMail2 = _interopRequireDefault(_sendMail);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// During the test the env variable is set to test
process.env.NODE_ENV = 'test'; /* global expect */
// Require the dev-dependencies


var should = _chai2.default.should();

_chai2.default.use(_chaiHttp2.default);

describe('sendMail', function () {
  // Test for SMS
  describe('function', function () {
    it('should be a function', function () {
      _sendMail2.default.should.be.a('function');
    });
    it('should send an email if all conditions are met', function () {
      var receivers = [{ user: 'nnamani.kene@gmail.com' }];
      var message = 'Hello World';
      var subject = 'Email Test';
      var transport = (0, _nodemailerMockTransport2.default)({
        service: 'Gmail',
        auth: {
          user: 'Sample User',
          pass: 'Sample Password'
        }
      });
      var transporter = _nodemailer2.default.createTransport(transport);
      var mailer = (0, _sendMail2.default)(receivers, message, subject);

      mailer.should.be.equal(true);
    });
  });
});