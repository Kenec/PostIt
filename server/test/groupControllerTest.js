// Require the dev-dependencies
import supertest from 'supertest';
import chai from 'chai';
import chaiHttp from 'chai-http';
import { Groups, userGroups } from '../models';
import app from '../app';

// During the test the env variable is set to test
process.env.NODE_ENV = 'test';

const server = supertest.agent(app);
const should = chai.should();

chai.use(chaiHttp);

describe('Groups', () => {
  let token = '';
  before((done) => { // Before each test we empty the database
    server
      .post('/api/v1/users/signin')
      .send({
        username: 'kene',
        password: 'kene' })
      .end((err, res) => {
        token = res.body.token;
      });
    Groups.sync({ force: true })
      .then(() => {
        userGroups.sync({ force: true });
        done();
      })
      .catch((error) => {
        done(error);
      });
  });

  describe('Controller Tests: ', () => {
    // Test for succesful group creation
    describe('Group', () => {
      it('should create a group when all parameters are supplied',
        (done) => {
          server
            .post('/api/v1/groups')
            .send({
              token,
              groupName: 'Group',
              createdby: 1,
            })
            .end((err, res) => {
              res.should.have.status(201);
              res.body.should.be.a('object');
              res.body.should.have.property('message')
                .eql('Group group created successfully');
              res.body.should.have.property('success')
                .eql(true);
              done();
            });
        });
      it('should not create a group if any field is empty',
        (done) => {
          server
            .post('/api/v1/groups')
            .send({
              token,
              groupName: '',
              createdby: 1,
            })
            .end((err, res) => {
              res.should.have.status(400);
              res.body.should.be.a('object');
              res.body.should.have.property('message')
                .eql('Invalid request. Some column(s) are missing');
              done();
            });
        });
      it(`should not create a group when any 
      of the required field is not available`,
        (done) => {
          server
            .post('/api/v1/groups')
            .send({
              token,
              groupName: 'Group',
              // createdby: 1, // missing parameter
            })
            .end((err, res) => {
              res.should.have.status(400);
              res.body.should.be.a('object');
              res.body.should.have.property('message')
                .eql('Invalid request. Some column(s) are missing');
              done();
            });
        });
      // Test for uniquness of a group
      it(`should not create a group with a
          group name that already exists`,
        (done) => {
          server
            .post('/api/v1/groups')
            .send({
              token,
              groupName: 'Group',
              createdby: 1,
            })
            .end((err, res) => {
              res.should.have.status(409);
              res.body.should.be.a('object');
              res.body.should.have.property('message')
                .eql('groupName must be unique');
              res.body.should.have.property('success')
                .eql(false);
              done();
            });
        });
      it('should fetch a groups by its creator id',
        (done) => {
          server
            .post('/api/v1/groups/creator')
            .send({
              token,
              userId: '1'
            })
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('array');
              res.body[0].should.have.property('id')
                .eql(1);
              res.body[0].should.have.property('groupName')
                .eql('Group');
              res.body[0].should.have.property('createdAt');
              done();
            });
        });
      // Test for retrieving group by its id
      it('should return groups by its id',
        (done) => {
          const groupId = '1';
          server
            .get(`/api/v1/groups/${groupId}`)
            .set({ 'x-access-token': token })
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('array');
              res.body[0].should.have.property('id')
                .eql(1);
              res.body[0].should.have.property('groupName')
                .eql('Group');
              res.body[0].should.have.property('createdAt');
              done();
            });
        });
      it('should return 404 for group not found',
        (done) => {
          const groupId = null;
          server
            .get(`/api/v1/groups/${groupId}`)
            .set({ 'x-access-token': token })
            .end((err, res) => {
              res.should.have.status(404);
              res.body.should.have.property('message')
                .eql('Group selected not found');
              done();
            });
        });
      it(`should not return a group when a userId passed is
        not the creator's id`,
        (done) => {
          server
            .post('/api/v1/groups/creator')
            .send({
              token,
              userId: 3
            })
            .end((err, res) => {
              res.should.have.status(500);
              res.body.should.have.property('message')
                .eql('Error retrieving Groups');
              done();
            });
        });
      it('should not fetch group by creator when userId is not passed',
        (done) => {
          server
            .post('/api/v1/groups/creator')
            .send({
              token,
              // userId: 1 // userId not passed
            })
            .end((err, res) => {
              res.should.have.status(400);
              res.body.should.have.property('message')
                .eql('Invalid request. userId is missing');
              done();
            });
        });
    });
  });
});
