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

describe('GroupsUser', function () {
  var token = '';
  before(function (done) {
    // Before each test we empty the database
    server.post('/api/v1/users/signin').send({
      username: 'kene',
      password: 'kene' }).end(function (err, res) {
      token = res.body.token;
    });
    _models.userGroups.sync({ force: true }).then(function () {
      return done();
    }).catch(function (error) {
      done(error);
    });
  });

  describe('Controller Tests: ', function () {
    // Test for succesful group creation
    describe('Group', function () {
      var groupId = 1;
      it('should add a user to a group', function (done) {
        server.post('/api/v1/groups/' + groupId + '/user').send({
          token: token,
          userId: '1'
        }).end(function (err, res) {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('User Added');
          res.body.should.have.property('success').eql(true);
          done();
        });
      });
      it('should add another user to a group', function (done) {
        server.post('/api/v1/groups/' + groupId + '/user').send({
          token: token,
          userId: '2'
        }).end(function (err, res) {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('User Added');
          res.body.should.have.property('success').eql(true);
          done();
        });
      });
      it('should not add a user to a group if userId is not supplied', function (done) {
        server.post('/api/v1/groups/' + groupId + '/user').send({
          token: token
          // userId: '1'
        }).end(function (err, res) {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Invalid request. Some column(s) are missing');
          done();
        });
      });
      it('should not add a user who does not exist to a group', function (done) {
        server.post('/api/v1/groups/' + groupId + '/user').send({
          token: token,
          userId: '100' // this userId does not exist
        }).end(function (err, res) {
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Cannot add a user who does not exist to a group');
          done();
        });
      });
      it('should not add a user who already exist in a group', function (done) {
        server.post('/api/v1/groups/' + groupId + '/user').send({
          token: token,
          userId: '1' // this userId already exist in a group
        }).end(function (err, res) {
          res.should.have.status(409);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('User Already Exist');
          done();
        });
      });
      it('should throw internal server error when a user cannot be added', function (done) {
        server.post('/api/v1/groups/' + undefined + '/user').send({
          token: token,
          userId: '1'
        }).end(function (err, res) {
          res.should.have.status(500);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Error occured while trying to add user');
          done();
        });
      });
      it('should not remove a user if all parameter required is\n          not supplied', function (done) {
        server.post('/api/v1/groups/' + groupId + '/users').send({
          token: token,
          admin: 1
          // user: 6 // user is missing
        }).end(function (err, res) {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Incomplete payload');
          done();
        });
      });
      it('should not remove a user from a group\n          he created', function (done) {
        server.post('/api/v1/groups/' + groupId + '/users').send({
          token: token,
          admin: '1',
          user: '1'
        }).end(function (err, res) {
          res.should.have.status(401);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Cannot remove yourself from the Group you created');
          done();
        });
      });
      it('should not remove a user who does not exist from a group', function (done) {
        server.post('/api/v1/groups/' + groupId + '/users').send({
          token: token,
          admin: '1',
          user: '100' // this user does not exist/belong to group 1
        }).end(function (err, res) {
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('User not found!');
          done();
        });
      });
      it('should remove a user from a group', function (done) {
        server.post('/api/v1/groups/' + groupId + '/users').send({
          token: token,
          admin: '1',
          user: '2'
        }).end(function (err, res) {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('User Removed From Group');
          done();
        });
      });

      it('should return groups a user belonged to\n      by username', function (done) {
        server.post('/api/v1/user/groups').send({
          token: token,
          username: 'kene'
        }).end(function (err, res) {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('id').eql(1);
          res.body.should.have.property('groups').eql([{ id: 1, groupName: 'Group' }]);
          done();
        });
      });
      it('should not return groups a user belonged to\n      by username if username is not supplied', function (done) {
        server.post('/api/v1/user/groups').send({
          token: token
          // username: 'kene',
        }).end(function (err, res) {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Invalid request. Username is missing');
          done();
        });
      });
      it('should not return groups a user belonged to\n      by username if username is empty', function (done) {
        server.post('/api/v1/user/groups').send({
          token: token,
          username: ''
        }).end(function (err, res) {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Invalid request. Username is missing');
          done();
        });
      });

      it('should search a user', function (done) {
        server.post('/api/v1/users/0').send({
          token: token,
          username: 'k'
        }).end(function (err, res) {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('count').eql(2);
          res.body.should.have.property('rows');
          done();
        });
      });
      it('should not search a user if username field is not available', function (done) {
        server.post('/api/v1/users/0').send({
          token: token
          // username: 'k',
        }).end(function (err, res) {
          res.should.have.status(400);
          res.body.should.have.property('message').eql('Invalid request. Some column(s) are missing');
          done();
        });
      });
      it('should not search a user if username field is not empty', function (done) {
        server.post('/api/v1/users/0').send({
          token: token,
          username: ''
        }).end(function (err, res) {
          res.should.have.status(400);
          res.body.should.have.property('message').eql('Invalid request. Some column(s) are missing');
          done();
        });
      });

      it('should unauthorized status code when trying \n        calling the endpoint without toke', function (done) {
        server.post('/api/v1/users/0').send({
          // token, // token is not available
          username: '3'
        }).end(function (err, res) {
          res.should.have.status(403);
          res.body.should.be.a('object');
          done();
        });
      });
      it('should return all groups', function (done) {
        server.get('/api/v1/groups').send({
          token: token
        }).end(function (err, res) {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body[0].should.have.property('id').eql(1);
          res.body[0].should.have.property('groupName').eql('Group');
          done();
        });
      });
      it('should fetch members of a group', function (done) {
        server.get('/api/v1/groups/' + groupId + '/users').set({ 'x-access-token': token }).end(function (err, res) {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('id').eql(1);
          res.body.should.have.property('groupName').eql('Group');
          res.body.should.have.property('createdby').eql('1');
          done();
        });
      });
      it('should return not found for a groupId with no Group', function (done) {
        server.get('/api/v1/groups/100/users').set({ 'x-access-token': token }).end(function (err, res) {
          res.should.have.status(500);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Error occured while fetching members in a Group');
          done();
        });
      });
    });
  });
});