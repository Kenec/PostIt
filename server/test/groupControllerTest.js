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
      .post('/api/user/signin')
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

  describe('API Route Tests: ', () => {
    // Test for succesful group creation
    describe('Create Group', () => {
      it('should return status code 201 and  res of object on success',
        (done) => {
          server
            .post('/api/group')
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
      // Return 400 status code if while creating a group
      // the creator was not added to the groupUser Table
      it(`should return status code 409 and  res
         of object on failure to add Group creator to its create
         Group`,
        (done) => {
          server
            .post('/api/group')
            .send({
              token,
              groupName: 'Group',
            })
            .end((err, res) => {
              res.should.have.status(409);
              res.body.should.be.a('object');
              done();
            });
        });
      // Test for uniquness of a group
      it(`should return status code 409 for
          attempting to create a group that exists`,
        (done) => {
          server
            .post('/api/group')
            .send({
              token,
              groupName: 'Group',
              createdby: 1,
            })
            .end((err, res) => {
              res.should.have.status(409);
              res.body.should.be.a('object');
              res.body.should.have.property('groupName')
                .eql('groupName must be unique');
              res.body.should.have.property('message')
                .eql('Group Already Exists');
              res.body.should.have.property('success')
                .eql(false);
              done();
            });
        });
      // Test for retrieving group by its id
      it(`should return status code 200 and a group array
         when retrieving group by its creator id`,
        (done) => {
          server
            .post('/api/group/creator')
            .send({
              token,
              userId: '1'
            })
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('array');
              done();
            });
        });
      // Test for retrieving group by its id
      it(`should return status code 200 and a group array
         when retrieving group by its id`,
        (done) => {
          const groupId = '1';
          server
            .get(`/api/group/${groupId}`)
            .set({ 'x-access-token': token })
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('array');
              done();
            });
        });
      // Test for an 400 status error when group could
      // not be retrieved by creator
      it(`should return status code 400 and a group object
           when error occurs while retrieving group by its creator id`,
        (done) => {
          server
            .post('/api/group/creator')
            .send({
              token,
              userId: 3
            })
            .end((err, res) => {
              res.should.have.status(400);
              done();
            });
        });
    });
  });
});
