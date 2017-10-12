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

describe('userGroups', () => {
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
    userGroups.sync({ force: true })
      .then(() => done())
      .catch((error) => {
        done(error);
      });
  });

  describe('API Route Tests: ', () => {
    // Test for succesful group creation
    describe('Add Member to a Group', () => {
      const groupId = 1;
      it('should return status code 201 and  res of object on sucess',
        (done) => {
          server
            .post(`/api/v1/groups/${groupId}/user`)
            .send({
              token,
              userId: '1'
            })
            .end((err, res) => {
              res.should.have.status(201);
              res.body.should.be.a('object');
              res.body.should.have.property('message')
                .eql('User Added');
              res.body.should.have.property('success')
                .eql(true);
              done();
            });
        });

      it(`should return status code 400 and res
      an object of error message when payload
      is not complete for removing a user`,
        (done) => {
          server
            .post(`/api/v1/groups/${groupId}/users`)
            .send({
              token, // token is not available
              admin: 1,
              // user: 6
            })
            .end((err, res) => {
              res.should.have.status(400);
              res.body.should.be.a('object');
              res.body.should.have.property('message')
                .eql('Incomplete payload');
              done();
            });
        });
      it('should return status code 404 and res of object on a failure',
        (done) => {
          server
            .post(`/api/v1/groups/${groupId}/user`)
            .send({
              token,
              userId: 3
            })
            .end((err, res) => {
              res.should.have.status(404);
              res.body.should.be.a('object');
              done();
            });
        });
      // Return 200 status code and an object when
      // a request for all groups created by a user is made
      it(`should return status code 200 and  res
         of object on for a request of all groups created
         by a user`,
        (done) => {
          server
            .post('/api/v1/user/groups')
            .send({
              token,
              username: 'kene',
            })
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              done();
            });
        });
      it(`should return status code 200 and  res
           of object of users from the DB when a request
           is made`,
        (done) => {
          server
            .post('/api/v1/users/0')
            .send({
              token,
              username: 'k',
            })
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              done();
            });
        });
      it(`should return status code 401 and  res
             of object of users cannot be fetched from the DB`,
        (done) => {
          server
            .post('/api/v1/users/0')
            .send({
              // token, // token is not available
              username: '3',
            })
            .end((err, res) => {
              res.should.have.status(401);
              res.body.should.be.a('object');
              done();
            });
        });
      it(`should return status code 200 and  res
            an array of objects of all groups`,
        (done) => {
          server
            .get('/api/v1/groups')
            .send({
              token,
            })
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('array');
              done();
            });
        });
      it(`should return status code 200 and  res
              an object of users in a group by groupId`,
        (done) => {
          server
            .get(`/api/v1/groupss/${groupId}/users`)
            .set({ 'x-access-token': token })
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              done();
            });
        });
      it(`should return status code 404 and  res
          an object of error message when an invalid groupId is passed`,
        (done) => {
          server
            .get('/api/v1/groups/100/users')
            .set({ 'x-access-token': token })
            .end((err, res) => {
              res.should.have.status(400);
              res.body.should.be.a('object');
              res.body.should.have.property('message')
                .eql('Error occured while fetching members in a Group');
              done();
            });
        });
    });
  });
});
