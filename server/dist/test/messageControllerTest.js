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

describe('Messages', function () {
  var token = '';
  before(function (done) {
    // Before each test we empty the database
    server.post('/api/v1/users/signin').send({
      username: 'kene',
      password: 'kene' }).end(function (err, res) {
      token = res.body.token;
    });
    _models.Messages.sync({ force: true }).then(function () {
      _models.MessageReads.sync({ force: true });
      done();
    }).catch(function (error) {
      done(error);
    });
  });

  describe('Controller Tests: ', function () {
    // Test for messages
    describe('Message Controller: ', function () {
      var groupId = 1;
      it('should display no message when a group does not have message', function (done) {
        server.get('/api/v1/groups/' + groupId + '/messages').set({ 'x-access-token': token }).end(function (err, res) {
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('This is the start of messaging in this group!');
          done();
        });
      });
      it('should send message', function (done) {
        server.post('/api/v1/groups/' + groupId + '/message').send({
          token: token,
          message: 'This is a sample message',
          priorityLevel: 'Normal',
          groupId: groupId,
          sentBy: 1,
          readBy: '1'
        }).end(function (err, res) {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql('Message sent successfully');
          done();
        });
      });
      it('should not send a message if any paramter is missing', function (done) {
        server.post('/api/v1/groups/' + groupId + '/message').send({
          token: token,
          // message: 'This is a sample message',
          priorityLevel: 'Normal',
          groupId: groupId,
          sentBy: 1,
          readBy: '1'
        }).end(function (err, res) {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Invalid request. Some column(s) are missing');
          done();
        });
      });
      it('should not send a message if any paramter is empty', function (done) {
        server.post('/api/v1/groups/' + groupId + '/message').send({
          token: token,
          message: '',
          priorityLevel: 'Normal',
          groupId: groupId,
          sentBy: 1,
          readBy: '1'
        }).end(function (err, res) {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Invalid request. Some column(s) are missing');
          done();
        });
      });
      it('should display message when a group have message', function (done) {
        server.get('/api/v1/groups/' + groupId + '/messages').set({ 'x-access-token': token }).end(function (err, res) {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body[0].should.have.property('message').eql('This is a sample message');
          res.body[0].should.have.property('priorityLevel').eql('Normal');
          done();
        });
      });
      it('should add notification when a message\n          is sent', function (done) {
        var messageId = 1;
        server.post('/api/v1/groups/' + messageId + '/notification').send({
          token: token,
          userId: 1,
          readStatus: 0,
          senderId: 1,
          groupId: groupId
        }).end(function (err, res) {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Notification Added');
          res.body.should.have.property('success').eql(true);
          done();
        });
      });
      it('should not add notification when a all required \n        parameter is not available', function (done) {
        var messageId = 1;
        server.post('/api/v1/groups/' + messageId + '/notification').send({
          token: token,
          // userId: 1,
          readStatus: 0,
          senderId: 1,
          groupId: groupId
        }).end(function (err, res) {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Invalid request.Some column(s) column are missing');
          done();
        });
      });
      it('should not add a duplicate notification', function (done) {
        var messageId = 1;
        server.post('/api/v1/groups/' + messageId + '/notification').send({
          token: token,
          userId: 1,
          readStatus: 0,
          senderId: 1,
          groupId: groupId
        }).end(function (err, res) {
          res.should.have.status(409);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Notification already exist');
          res.body.should.have.property('success').eql(false);
          done();
        });
      });
      it('should not add a notification when message\n        with messageId is not found', function (done) {
        var messageId = 10;
        server.post('/api/v1/groups/' + messageId + '/notification').send({
          token: token,
          userId: 1,
          readStatus: 0,
          senderId: 1,
          groupId: groupId
        }).end(function (err, res) {
          res.should.have.status(500);
          res.body.should.be.a('object');
          done();
        });
      });
      it('should retrieve notifications', function (done) {
        server.post('/api/v1/user/notifications').send({
          token: token,
          userId: 1
        }).end(function (err, res) {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
      });
      it('should return empty array when\n          retrieving a notification of user who has no notification', function (done) {
        server.post('/api/v1/user/notifications').send({
          token: token,
          userId: 3
        }).end(function (err, res) {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('messageRes').eql([]);
          done();
        });
      });
      it('should return empty array if message readers are empty', function (done) {
        var messageId = 1;
        server.post('/api/v1/users/' + messageId + '/read').send({
          token: token
        }).end(function (err, res) {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('messageReadUsers').eql([]);
          done();
        });
      });
      it('should update notification', function (done) {
        var messageId = 1;
        server.post('/api/v1/user/' + messageId + '/notification').send({
          token: token,
          userId: 1,
          readStatus: 1
        }).end(function (err, res) {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Notification Updated');
          res.body.should.have.property('success').eql(true);
          done();
        });
      });
      it('should throw not found error when attempting\n          to update a notification that does not exist', function (done) {
        var messageId = 1;
        server.post('/api/v1/user/' + messageId + '/notification').send({
          token: token,
          userId: 2,
          readStatus: 1
        }).end(function (err, res) {
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Notification does not exist');
          done();
        });
      });
      it('should not update the notification of a user\n        if userId is not found', function (done) {
        var messageId = 1;
        server.post('/api/v1/user/' + messageId + '/notification').send({
          token: token,
          // userId: 2,
          readStatus: 1
        }).end(function (err, res) {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Invalid request.Some column are missing');
          done();
        });
      });

      it('should return status code 200 and  res\n          of object when getting all users that read\n          a message', function (done) {
        var messageId = 1;
        server.post('/api/v1/users/' + messageId + '/read').send({
          token: token
        }).end(function (err, res) {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('messageReadUsers');
          done();
        });
      });
    });
  });
});