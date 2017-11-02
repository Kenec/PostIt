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

describe('Groups', function () {
  var token = '';
  before(function (done) {
    // Before each test we empty the database
    server.post('/api/v1/users/signin').send({
      username: 'kene',
      password: 'kene' }).end(function (err, res) {
      token = res.body.token;
    });
    _models.Groups.sync({ force: true }).then(function () {
      _models.userGroups.sync({ force: true });
      done();
    }).catch(function (error) {
      done(error);
    });
  });

  describe('Controller Tests: ', function () {
    // Test for succesful group creation
    describe('Group', function () {
      it('should create a group when all parameters are supplied', function (done) {
        server.post('/api/v1/groups').send({
          token: token,
          groupName: 'Group',
          createdby: 1
        }).end(function (err, res) {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Group group created successfully');
          res.body.should.have.property('success').eql(true);
          done();
        });
      });
      it('should not create a group if any field is empty', function (done) {
        server.post('/api/v1/groups').send({
          token: token,
          groupName: '',
          createdby: 1
        }).end(function (err, res) {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Invalid request. Some column(s) are missing');
          done();
        });
      });
      it('should not create a group when any \n      of the required field is not available', function (done) {
        server.post('/api/v1/groups').send({
          token: token,
          groupName: 'Group'
          // createdby: 1, // missing parameter
        }).end(function (err, res) {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Invalid request. Some column(s) are missing');
          done();
        });
      });
      // Test for uniquness of a group
      it('should not create a group with a\n          group name that already exists', function (done) {
        server.post('/api/v1/groups').send({
          token: token,
          groupName: 'Group',
          createdby: 1
        }).end(function (err, res) {
          res.should.have.status(409);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('groupName must be unique');
          res.body.should.have.property('success').eql(false);
          done();
        });
      });
      it('should fetch a groups by its creator id', function (done) {
        server.post('/api/v1/groups/creator').send({
          token: token,
          userId: '1'
        }).end(function (err, res) {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body[0].should.have.property('id').eql(1);
          res.body[0].should.have.property('groupName').eql('Group');
          res.body[0].should.have.property('createdAt');
          done();
        });
      });
      // Test for retrieving group by its id
      it('should return groups by its id', function (done) {
        var groupId = '1';
        server.get('/api/v1/groups/' + groupId).set({ 'x-access-token': token }).end(function (err, res) {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body[0].should.have.property('id').eql(1);
          res.body[0].should.have.property('groupName').eql('Group');
          res.body[0].should.have.property('createdAt');
          done();
        });
      });
      it('should return 404 for group not found', function (done) {
        var groupId = null;
        server.get('/api/v1/groups/' + groupId).set({ 'x-access-token': token }).end(function (err, res) {
          res.should.have.status(404);
          res.body.should.have.property('message').eql('Group selected not found');
          done();
        });
      });
      it('should not return a group when a userId passed is\n        not the creator\'s id', function (done) {
        server.post('/api/v1/groups/creator').send({
          token: token,
          userId: 3
        }).end(function (err, res) {
          res.should.have.status(500);
          res.body.should.have.property('message').eql('Error retrieving Groups');
          done();
        });
      });
      it('should not fetch group by creator when userId is not passed', function (done) {
        server.post('/api/v1/groups/creator').send({
          token: token
          // userId: 1 // userId not passed
        }).end(function (err, res) {
          res.should.have.status(400);
          res.body.should.have.property('message').eql('Invalid request. userId is missing');
          done();
        });
      });
    });
  });
});