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

describe('GroupsUser', () => {
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

  describe('Controller Tests: ', () => {
    // Test for succesful group creation
    describe('Group', () => {
      const groupId = 1;
      it('should add a user to a group',
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
      it('should add another user to a group',
        (done) => {
          server
            .post(`/api/v1/groups/${groupId}/user`)
            .send({
              token,
              userId: '2'
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
      it('should not add a user to a group if userId is not supplied',
        (done) => {
          server
            .post(`/api/v1/groups/${groupId}/user`)
            .send({
              token,
              // userId: '1'
            })
            .end((err, res) => {
              res.should.have.status(400);
              res.body.should.be.a('object');
              res.body.should.have.property('message')
                .eql('Invalid request. Some column(s) are missing');
              done();
            });
        });
      it('should not add a user who does not exist to a group',
        (done) => {
          server
            .post(`/api/v1/groups/${groupId}/user`)
            .send({
              token,
              userId: '100' // this userId does not exist
            })
            .end((err, res) => {
              res.should.have.status(404);
              res.body.should.be.a('object');
              res.body.should.have.property('message')
                .eql('Cannot add a user who does not exist to a group');
              done();
            });
        });
      it('should not add a user who already exist in a group',
        (done) => {
          server
            .post(`/api/v1/groups/${groupId}/user`)
            .send({
              token,
              userId: '1' // this userId already exist in a group
            })
            .end((err, res) => {
              res.should.have.status(409);
              res.body.should.be.a('object');
              res.body.should.have.property('message')
                .eql('User Already Exist');
              done();
            });
        });
      it('should throw internal server error when a user cannot be added',
        (done) => {
          server
            .post(`/api/v1/groups/${undefined}/user`)
            .send({
              token,
              userId: '1'
            })
            .end((err, res) => {
              res.should.have.status(500);
              res.body.should.be.a('object');
              res.body.should.have.property('message')
                .eql('Error occured while trying to add user');
              done();
            });
        });
      it(`should not remove a user if all parameter required is
          not supplied`,
        (done) => {
          server
            .post(`/api/v1/groups/${groupId}/users`)
            .send({
              token,
              admin: 1,
              // user: 6 // user is missing
            })
            .end((err, res) => {
              res.should.have.status(400);
              res.body.should.be.a('object');
              res.body.should.have.property('message')
                .eql('Incomplete payload');
              done();
            });
        });
      it(`should not remove a user from a group
          he created`,
        (done) => {
          server
            .post(`/api/v1/groups/${groupId}/users`)
            .send({
              token,
              admin: '1',
              user: '1',
            })
            .end((err, res) => {
              res.should.have.status(401);
              res.body.should.be.a('object');
              res.body.should.have.property('message')
                .eql('Cannot remove yourself from the Group you created');
              done();
            });
        });
      it('should not remove a user who does not exist from a group',
        (done) => {
          server
            .post(`/api/v1/groups/${groupId}/users`)
            .send({
              token,
              admin: '1',
              user: '100', // this user does not exist/belong to group 1
            })
            .end((err, res) => {
              res.should.have.status(404);
              res.body.should.be.a('object');
              res.body.should.have.property('message')
                .eql('User not found!');
              done();
            });
        });
      it('should remove a user from a group',
        (done) => {
          server
            .post(`/api/v1/groups/${groupId}/users`)
            .send({
              token,
              admin: '1',
              user: '2',
            })
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('message')
                .eql('User Removed From Group');
              done();
            });
        });

      it(`should return groups a user belonged to
      by username`,
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
              res.body.should.have.property('id')
                .eql(1);
              res.body.should.have.property('groups')
                .eql([{ id: 1, groupName: 'Group' }]);
              done();
            });
        });
      it(`should not return groups a user belonged to
      by username if username is not supplied`,
        (done) => {
          server
            .post('/api/v1/user/groups')
            .send({
              token,
              // username: 'kene',
            })
            .end((err, res) => {
              res.should.have.status(400);
              res.body.should.be.a('object');
              res.body.should.have.property('message')
                .eql('Invalid request. Username is missing');
              done();
            });
        });
      it(`should not return groups a user belonged to
      by username if username is empty`,
        (done) => {
          server
            .post('/api/v1/user/groups')
            .send({
              token,
              username: '',
            })
            .end((err, res) => {
              res.should.have.status(400);
              res.body.should.be.a('object');
              res.body.should.have.property('message')
                .eql('Invalid request. Username is missing');
              done();
            });
        });

      it('should search a user',
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
              res.body.should.have.property('count')
                .eql(2);
              res.body.should.have.property('rows');
              done();
            });
        });
      it('should not search a user if username field is not available',
        (done) => {
          server
            .post('/api/v1/users/0')
            .send({
              token,
              // username: 'k',
            })
            .end((err, res) => {
              res.should.have.status(400);
              res.body.should.have.property('message')
                .eql('Invalid request. Some column(s) are missing');
              done();
            });
        });
      it('should not search a user if username field is not empty',
        (done) => {
          server
            .post('/api/v1/users/0')
            .send({
              token,
              username: '',
            })
            .end((err, res) => {
              res.should.have.status(400);
              res.body.should.have.property('message')
                .eql('Invalid request. Some column(s) are missing');
              done();
            });
        });
      
      it(`should unauthorized status code when trying 
        calling the endpoint without toke`,
        (done) => {
          server
            .post('/api/v1/users/0')
            .send({
              // token, // token is not available
              username: '3',
            })
            .end((err, res) => {
              res.should.have.status(403);
              res.body.should.be.a('object');
              done();
            });
        });
      it('should return all groups',
        (done) => {
          server
            .get('/api/v1/groups')
            .send({
              token,
            })
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('array');
              res.body[0].should.have.property('id')
                .eql(1);
              res.body[0].should.have.property('groupName')
                .eql('Group');
              done();
            });
        });
      it('should fetch members of a group',
        (done) => {
          server
            .get(`/api/v1/groups/${groupId}/users`)
            .set({ 'x-access-token': token })
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('id')
                .eql(1);
              res.body.should.have.property('groupName')
                .eql('Group');
              res.body.should.have.property('createdby')
                .eql('1');
              done();
            });
        });
      it('should return not found for a groupId with no Group',
        (done) => {
          server
            .get('/api/v1/groups/100/users')
            .set({ 'x-access-token': token })
            .end((err, res) => {
              res.should.have.status(500);
              res.body.should.be.a('object');
              res.body.should.have.property('message')
                .eql('Error occured while fetching members in a Group');
              done();
            });
        });
    });
  });
});
