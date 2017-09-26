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
      .post('/api/v1/user/signin')
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

  describe('API Route Tests: ', () => {
    // Test for messages
    describe('Add Message to Group', () => {
      const groupId = 1;
      it(`should return status code 404 and when there is no message
          in the group`,
        (done) => {
          server
            .get(`/api/v1/group/${groupId}/messages`)
            .set({ 'x-access-token': token })
            .end((err, res) => {
              res.should.have.status(404);
              res.body.should.be.a('object');
              res.body.should.have.property('message')
                .eql('This is the start of messaging in this group!');
              done();
            });
        });
      it(`should return status code of 201 when a message is
          sent and an object return`,
        (done) => {
          server
            .post(`/api/v1/group/${groupId}/message`)
            .send({
              token,
              message: 'This is a sample message',
              priority_level: 'Normal',
              groupId,
              sentBy: 1
            })
            .end((err, res) => {
              res.should.have.status(201);
              res.body.should.be.a('object');
              res.body.should.have.property('status')
                .eql('Message sent successfully');

              done();
            });
        });
      it(`should return status code 200 and when a message
          is sent successfully to a group`,
        (done) => {
          server
            .get(`/api/v1/group/${groupId}/messages`)
            .set({ 'x-access-token': token })
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('array');
              done();
            });
        });
      // Return status code 200 for adding message
      // notification
      //
      it(`should return status code 200 and  res
         of object when a notification is added`,
        (done) => {
          const messageId = 1;
          server
            .post(`/api/v1/group/${messageId}/notification`)
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
      it(`should return status code 400 and  res
           of object when attempting to add a notification
           that already exists`,
        (done) => {
          const messageId = 1;
          server
            .post(`/api/v1/group/${messageId}/notification`)
            .send({
              token,
              userId: 1,
              readStatus: 0,
              senderId: 1,
              groupId
            })
            .end((err, res) => {
              res.should.have.status(400);
              res.body.should.be.a('object');
              res.body.should.have.property('message')
                .eql('Notification already exist');
              res.body.should.have.property('success')
                .eql(false);
              done();
            });
        });
      it(`should return status code 200 and  res
          of object when retrieving a notification
          that exists`,
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
      it(`should return status code 200 and  res
            of object of an empty array when retrieving
            message notifications of user with no message
            notification`,
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
      it(`should return status code 200 and  res
          of empty array no notification is found`,
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
      it(`should return status code 201 and  res
           of object when a message notification
           table is updated successfully`,
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
      it(`should return status code 400 and  res
         of object when a message notification
         table cannot be updated`,
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
              res.should.have.status(400);
              res.body.should.be.a('object');
              res.body.should.have.property('message')
                .eql('Notification does not exist');
              done();
            });
        });
      it(`should return status code 200 and  res
          of object when getting all users that read
          a message`,
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
              res.should.have.status(400);
              res.body.should.be.a('object');
              res.body.should.have.property('message')
                .eql('Notification does not exist');
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
