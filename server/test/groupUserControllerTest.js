// Require the dev-dependencies
import supertest from 'supertest';
import chai from 'chai';
import chaiHttp from 'chai-http';
import { userGroups } from '../models';
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
      .post('/api/user/signin')
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
            .post(`/api/group/${groupId}/user`)
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
      it('should return status code 400 and res of object on a failure',
        (done) => {
          server
            .post(`/api/group/${groupId}/user`)
            .send({
              token,
              userId: 3
            })
            .end((err, res) => {
              res.should.have.status(400);
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
            .post('/api/users/me')
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
      
      // // Test for retrieving group by its id
      // it(`should return status code 200 and a group array
      //    when retrieving group by its creator id`,
      //   (done) => {
      //     server
      //       .post('/api/group/creator')
      //       .send({
      //         token,
      //         userId: '1'
      //       })
      //       .end((err, res) => {
      //         res.should.have.status(200);
      //         res.body.should.be.a('array');
      //         done();
      //       });
      //   });
      // // Test for retrieving group by its id
      // it(`should return status code 200 and a group array
      //    when retrieving group by its id`,
      //   (done) => {
      //     const groupId = '1';
      //     server
      //       .get(`/api/group/${groupId}`)
      //       .set({ 'x-access-token': token })
      //       .end((err, res) => {
      //         res.should.have.status(200);
      //         res.body.should.be.a('array');
      //         done();
      //       });
      //   });
      // // Test for an 400 status error when group could
      // // not be retrieved by creator
      // it(`should return status code 400 and a group object
      //      when error occurs while retrieving group by its creator id`,
      //   (done) => {
      //     server
      //       .post('/api/group/creator')
      //       .send({
      //         token,
      //         userId: 3
      //       })
      //       .end((err, res) => {
      //         res.should.have.status(400);
      //         done();
      //       });
      //   });
    });
  });
});
