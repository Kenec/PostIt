// Require the dev-dependencies
import supertest from 'supertest';
import chai from 'chai';
import chaiHttp from 'chai-http';
import { Messages, MessageReads } from '../models';
import app from '../app';

// During the test the env variable is set to test
process.env.NODE_ENV = 'test';

const server = supertest.agent(app);
const should = chai.should();

chai.use(chaiHttp);

describe('Messages', () => {
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
    Messages.sync({ force: true })
      .then(() => {
        MessageReads.sync({ force: true });
        done();
      })
      .catch((error) => {
        done(error);
      });
  });

  describe('Controller Tests: ', () => {
    // Test for messages
    describe('Message Controller: ', () => {
      const groupId = 1;
      it('should display no message when a group does not have message',
        (done) => {
          server
            .get(`/api/v1/groups/${groupId}/messages`)
            .set({ 'x-access-token': token })
            .end((err, res) => {
              res.should.have.status(404);
              res.body.should.be.a('object');
              res.body.should.have.property('message')
                .eql('This is the start of messaging in this group!');
              done();
            });
        });
      it('should send message',
        (done) => {
          server
            .post(`/api/v1/groups/${groupId}/message`)
            .send({
              token,
              message: 'This is a sample message',
              priorityLevel: 'Normal',
              groupId,
              sentBy: 1,
              readBy: '1'
            })
            .end((err, res) => {
              res.should.have.status(201);
              res.body.should.be.a('object');
              res.body.should.have.property('status')
                .eql('Message sent successfully');
              done();
            });
        });
      it('should not send a message if any paramter is missing',
        (done) => {
          server
            .post(`/api/v1/groups/${groupId}/message`)
            .send({
              token,
              // message: 'This is a sample message',
              priorityLevel: 'Normal',
              groupId,
              sentBy: 1,
              readBy: '1'
            })
            .end((err, res) => {
              res.should.have.status(400);
              res.body.should.be.a('object');
              res.body.should.have.property('message')
                .eql('Invalid request. Some column(s) are missing');
              done();
            });
        });
      it('should not send a message if any paramter is empty',
        (done) => {
          server
            .post(`/api/v1/groups/${groupId}/message`)
            .send({
              token,
              message: '',
              priorityLevel: 'Normal',
              groupId,
              sentBy: 1,
              readBy: '1'
            })
            .end((err, res) => {
              res.should.have.status(400);
              res.body.should.be.a('object');
              res.body.should.have.property('message')
                .eql('Invalid request. Some column(s) are missing');
              done();
            });
        });
      it('should display message when a group have message',
        (done) => {
          server
            .get(`/api/v1/groups/${groupId}/messages`)
            .set({ 'x-access-token': token })
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('array');
              res.body[0].should.have.property('message')
                .eql('This is a sample message');
              res.body[0].should.have.property('priorityLevel')
                .eql('Normal');
              done();
            });
        });
      it(`should add notification when a message
          is sent`,
        (done) => {
          const messageId = 1;
          server
            .post(`/api/v1/groups/${messageId}/notification`)
            .send({
              token,
              userId: 1,
              readStatus: 0,
              senderId: 1,
              groupId
            })
            .end((err, res) => {
              res.should.have.status(201);
              res.body.should.be.a('object');
              res.body.should.have.property('message')
                .eql('Notification Added');
              res.body.should.have.property('success')
                .eql(true);
              done();
            });
        });
      it(`should not add notification when a all required 
        parameter is not available`,
        (done) => {
          const messageId = 1;
          server
            .post(`/api/v1/groups/${messageId}/notification`)
            .send({
              token,
              // userId: 1,
              readStatus: 0,
              senderId: 1,
              groupId
            })
            .end((err, res) => {
              res.should.have.status(400);
              res.body.should.be.a('object');
              res.body.should.have.property('message')
                .eql('Invalid request.Some column(s) column are missing');
              done();
            });
        });
      it('should not add a duplicate notification',
        (done) => {
          const messageId = 1;
          server
            .post(`/api/v1/groups/${messageId}/notification`)
            .send({
              token,
              userId: 1,
              readStatus: 0,
              senderId: 1,
              groupId
            })
            .end((err, res) => {
              res.should.have.status(409);
              res.body.should.be.a('object');
              res.body.should.have.property('message')
                .eql('Notification already exist');
              res.body.should.have.property('success')
                .eql(false);
              done();
            });
        });
      it(`should not add a notification when message
        with messageId is not found`,
        (done) => {
          const messageId = 10;
          server
            .post(`/api/v1/groups/${messageId}/notification`)
            .send({
              token,
              userId: 1,
              readStatus: 0,
              senderId: 1,
              groupId
            })
            .end((err, res) => {
              res.should.have.status(500);
              res.body.should.be.a('object');
              done();
            });
        });
      it('should retrieve notifications',
        (done) => {
          server
            .post('/api/v1/user/notifications')
            .send({
              token,
              userId: 1,
            })
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              done();
            });
        });
      it(`should return empty array when
          retrieving a notification of user who has no notification`,
        (done) => {
          server
            .post('/api/v1/user/notifications')
            .send({
              token,
              userId: 3,
            })
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('messageRes')
                .eql([]);
              done();
            });
        });
      it('should return empty array if message readers are empty',
        (done) => {
          const messageId = 1;
          server
            .post(`/api/v1/users/${messageId}/read`)
            .send({
              token,
            })
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('messageReadUsers')
                .eql([]);
              done();
            });
        });
      it('should update notification',
        (done) => {
          const messageId = 1;
          server
            .post(`/api/v1/user/${messageId}/notification`)
            .send({
              token,
              userId: 1,
              readStatus: 1,
            })
            .end((err, res) => {
              res.should.have.status(201);
              res.body.should.be.a('object');
              res.body.should.have.property('message')
                .eql('Notification Updated');
              res.body.should.have.property('success')
                .eql(true);
              done();
            });
        });
      it(`should throw not found error when attempting
          to update a notification that does not exist`,
        (done) => {
          const messageId = 1;
          server
            .post(`/api/v1/user/${messageId}/notification`)
            .send({
              token,
              userId: 2,
              readStatus: 1,
            })
            .end((err, res) => {
              res.should.have.status(404);
              res.body.should.be.a('object');
              res.body.should.have.property('message')
                .eql('Notification does not exist');
              done();
            });
        });
      it(`should not update the notification of a user
        if userId is not found`,
        (done) => {
          const messageId = 1;
          server
            .post(`/api/v1/user/${messageId}/notification`)
            .send({
              token,
              // userId: 2,
              readStatus: 1,
            })
            .end((err, res) => {
              res.should.have.status(400);
              res.body.should.be.a('object');
              res.body.should.have.property('message')
                .eql('Invalid request.Some column are missing');
              done();
            });
        });

      it(`should return status code 200 and  res
          of object when getting all users that read
          a message`,
        (done) => {
          const messageId = 1;
          server
            .post(`/api/v1/users/${messageId}/read`)
            .send({
              token,
            })
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('messageReadUsers');
              done();
            });
        });
    });
  });
});
