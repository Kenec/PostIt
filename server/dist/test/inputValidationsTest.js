'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _validateInput = require('../shared/validations/validateInput');

var _validateInput2 = _interopRequireDefault(_validateInput);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// During the test the env variable is set to test
process.env.NODE_ENV = 'test'; // Require the dev-dependencies


var should = _chai2.default.should();

_chai2.default.use(_chaiHttp2.default);

describe('inputValidation', function () {
  // Test for Signup Validation to be a function
  var data = {
    username: 'Kene',
    phone: '07038550515',
    email: 'mail@email.com',
    password: 'kene',
    repassword: 'kene',
    readBy: '1',
    sentBy: '1'
  };
  describe('function', function () {
    it('should accept two params', function () {
      _validateInput2.default.should.be.a('function');
    });
  });
  // Test if username validation works
  describe('Data input validations', function () {
    it('should return error if password did not match', function () {
      data.repassword = 'KeneM';
      (0, _validateInput2.default)(data).should.have.property('errors').eql({ confirmPassword: 'Password did not match' });
      (0, _validateInput2.default)(data).should.have.property('isValid').eql(false);
    });
    it('should return error if invalid Email', function () {
      data.email = 'kene';
      (0, _validateInput2.default)(data).should.have.property('errors').eql({ email: 'Email is invalid',
        confirmPassword: 'Password did not match' });
      (0, _validateInput2.default)(data).should.have.property('isValid').eql(false);
    });
    it('should return error if invalid Phone number', function () {
      data.phone = 'kene';
      (0, _validateInput2.default)(data).should.have.property('errors').eql({ email: 'Email is invalid',
        confirmPassword: 'Password did not match',
        phone: 'Phone number is invalid' });
      (0, _validateInput2.default)(data).should.have.property('isValid').eql(false);
    });
  });
});