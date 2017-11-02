'use strict';

var _supertest = require('supertest');

var _supertest2 = _interopRequireDefault(_supertest);

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _models = require('../models');

var _app = require('../app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// During the test the env variable is set to test
process.env.NODE_ENV = 'test'; // Require the dev-dependencies


var server = _supertest2.default.agent(_app2.default);
var should = _chai2.default.should();

_chai2.default.use(_chaiHttp2.default);

describe('Users', function () {
  before(function (done) {
    // Before each test we empty the database
    _models.Users.sync({ force: true }).then(function () {
      done();
    }).catch(function (error) {
      done(error);
    });
  });

  describe('API Route Tests: ', function () {
    describe('Signup', function () {
      it('should create a new user account when all conditions are met', function (done) {
        server.post('/api/v1/users/signup').send({
          username: 'kene',
          email: 'kene@gmail.com',
          phone: '07038550515',
          password: 'kene' }).end(function (err, res) {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.should.have.status(201);
          res.body.should.have.property('message').eql('User Created successfully');
          done();
        });
      });
      it('should another a new user account', function (done) {
        server.post('/api/v1/users/signup').send({
          username: 'Mike',
          email: 'mike@gmail.com',
          phone: '07038550515',
          password: 'kene' }).end(function (err, res) {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.should.have.status(201);
          res.body.should.have.property('message').eql('User Created successfully');
          done();
        });
      });
      it('should throw 409 error when a duplicate account wants to be created', function (done) {
        server.post('/api/v1/users/signup').send({
          username: 'kene',
          email: 'kene@gmail.com',
          phone: '07038550515',
          password: 'kene' }).end(function (err, res) {
          res.should.have.status(409);
          res.body.should.have.property('message').eql('User already exist');
          done();
        });
      });
      it('should not allow user to be created when any field is invalid', function (done) {
        server.post('/api/v1/users/signup').send({
          username: 'Miene',
          email: 'email',
          phone: '07038550515',
          password: 'kene' }).end(function (err, res) {
          res.should.have.status(400);
          res.body.should.have.property('message').eql('Email is invalid');
          done();
        });
      });
      it('should not create a new user when all field is not available', function (done) {
        server.post('/api/v1/users/signup').send({
          // username: 'kene', // ie if the validate input fails
          email: 'kene@gmail.com',
          phone: '07038550515',
          password: 'kene' }).end(function (err, res) {
          res.should.have.status(400);
          res.body.should.have.property('message').eql('Invalid request. Some column(s) are missing');
          done();
        });
      });
      it('should not create a new user when any field is empty', function (done) {
        server.post('/api/v1/users/signup').send({
          username: '',
          email: 'kene@gmail.com',
          phone: '07038550515',
          password: 'kene' }).end(function (err, res) {
          res.should.have.status(400);
          res.body.should.have.property('message').eql('Invalid request. Some column(s) are missing');
          done();
        });
      });
    });
  });
  describe('Signin', function () {
    var token = '';
    it('should not signin when any field is missing', function (done) {
      server.post('/api/v1/users/signin').send({
        // username: 'kene',
        password: 'kene' }).end(function (err, res) {
        token = res.body.token;
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('Invalid request. Some column(s) are missing');
        done();
      });
    });
    it('should not signin when any field is empty', function (done) {
      server.post('/api/v1/users/signin').send({
        username: '',
        password: 'kene' }).end(function (err, res) {
        token = res.body.token;
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('Invalid request. Some column(s) are missing');
        done();
      });
    });
    it('should expect parameter of object returned on successful signin', function (done) {
      server.post('/api/v1/users/signin').send({
        username: 'kene',
        password: 'kene' }).end(function (err, res) {
        res.should.have.status(202);
        res.body.should.have.property('token');
        res.body.should.have.property('message').eql('Successfully logged in');
        res.body.should.have.property('username').eql('kene');
        done();
      });
    });
    it('should signin a user with correct credentials', function (done) {
      server.post('/api/v1/users/signin').send({
        username: 'kene',
        password: 'kene' }).end(function (err, res) {
        token = res.body.token;
        res.should.have.status(202);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('Successfully logged in');
        done();
      });
    });
    it('should return 404 if a user is not found', function (done) {
      server.post('/api/v1/users/signin').send({
        username: 'paul',
        password: 'kene' }).end(function (err, res) {
        res.should.have.status(404);
        res.body.should.have.property('message').eql('Username not found, please register');
        done();
      });
    });
    it('should return user details when searched by username', function (done) {
      server.post('/api/v1/users/username').send({
        token: token,
        username: 'kene' }).end(function (err, res) {
        res.should.have.status(200);
        res.body.should.have.property('userid');
        res.body.should.have.property('username');
        res.body.should.have.property('phone');
        res.body.should.have.property('email');
        done();
      });
    });
    it('should return 404 error when user\n        details is not found when searched by username', function (done) {
      server.post('/api/v1/users/username').send({
        token: token,
        username: 'keneM' }).end(function (err, res) {
        res.should.have.status(404);
        res.body.should.have.property('message').eql('User not found');
        done();
      });
    });
    it('should return 403 error when search user by\n        username query errored', function (done) {
      server.post('/api/v1/users/username').send({
        // token, // when token is not available
        username: 'kene' }).end(function (err, res) {
        res.should.have.status(403);
        done();
      });
    });
    it('should not search a user by username if username is not supplied', function (done) {
      server.post('/api/v1/users/username').send({
        token: token
        // username: 'kene' 
      }).end(function (err, res) {
        res.should.have.status(400);
        res.body.should.have.property('message').eql('Invalid request. Username column is missing');
        done();
      });
    });
    it('should not search a user by username if username is empty', function (done) {
      server.post('/api/v1/users/username').send({
        token: token,
        username: ''
      }).end(function (err, res) {
        res.should.have.status(400);
        res.body.should.have.property('message').eql('Invalid request. Username column is missing');
        done();
      });
    });
  });
  describe('Update Password', function () {
    var token = 'thisisagibrishtoken';
    it('should not update password if new password is not available', function (done) {
      server.post('/api/v1/users/resetpassword/' + token).send({
        // password: 'kene',
        email: 'kene@gmail.com' }).end(function (err, res) {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('Invalid request. Some column(s) are missing');
        done();
      });
    });
    it('should not update password if any parameter violates validation rules', function (done) {
      server.post('/api/v1/users/resetpassword/' + token).send({
        password: 'kene',
        confirmPassword: 'kene',
        email: 'kene' }).end(function (err, res) {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('Email is invalid');
        done();
      });
    });
    it('should update password when all conditions are met', function (done) {
      server.post('/api/v1/users/resetpassword/' + token).send({
        password: 'kene',
        confirmPassword: 'kene',
        email: 'kene@gmail.com' }).end(function (err, res) {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('Password reset successfully!');
        done();
      });
    });
    it('should 404 when token does not exists', function (done) {
      var inValidToken = 'thisisaninvalidtoken';
      server.get('/api/v1/users/resetpassword/' + inValidToken).end(function (err, res) {
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('Token not found');
        done();
      });
    });
  });
  describe('Valid Token', function () {
    var token = 'thisisagibrishtoken';
    it('should check if token exist', function (done) {
      server.get('/api/v1/users/resetpassword/' + token).set({ 'x-access-token': token }).end(function (err, res) {
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('Token not found');
        done();
      });
    });
  });
  describe('Reset password', function () {
    it('should not reset password if any parameter violates validation rules', function (done) {
      server.post('/api/v1/users/resetpassword').send({
        password: 'kene',
        confirmPassword: 'kene',
        email: 'kene' }).end(function (err, res) {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('Email is invalid');
        done();
      });
    });
    it('should not update password when any field is empty', function (done) {
      server.post('/api/v1/users/resetpassword').send({
        password: 'kene',
        confirmPassword: 'kene',
        email: '' }).end(function (err, res) {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('Invalid request. Email column is missing');
        done();
      });
    });
  });
});