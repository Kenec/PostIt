// import supertest from 'supertest';
// import chai from 'chai';
// import chaiHttp from 'chai-http';
// import { Messages, MessageReads } from '../../models';
// import app from '../../app';
// import mockData from '../mockData.json';

// process.env.NODE_ENV = 'test';

// const server = supertest.agent(app);
// chai.use(chaiHttp);

// const { validUser } = mockData.Users;
// const {
//   validMessage,
//   invalidMessage,
//   notification,
//   invalidNotification,
//   updateNotification,
//   messageReaders
// } = mockData.Messages;

// describe('Messages', () => {
//   let token = '';
//   before((done) => {
//     server
//       .post('/api/v1/users/signin')
//       .send(validUser)
//       .end((err, res) => {
//         token = res.body.token;
//       });
//     Messages.sync({ force: true })
//       .then(() => {
//         MessageReads.sync({ force: true });
//         done();
//       })
//       .catch((error) => {
//         done(error);
//       });
//   });

//   describe('API Route Tests: ', () => {
//     const groupId = validMessage.groupId;
//     let messageId = notification.messageId;
//     describe('GET: /api/v1/groups/:groupId/messages ', () => {
//       it('should display no message when a group does not have message',
//         (done) => {
//           server
//             .get(`/api/v1/groups/${groupId}/messages`)
//             .set({ 'x-access-token': token })
//             .end((err, res) => {
//               res.should.have.status(404);
//               res.body.should.be.a('object');
//               res.body.should.have.property('message')
//                 .eql('This is the start of messaging in this group!');
//               done();
//             });
//         });
//     });

//     describe('POST: /api/v1/groups/:groupId/message ', () => {
//       it('should send message',
//         (done) => {
//           server
//             .post(`/api/v1/groups/${groupId}/message`)
//             .send({
//               token,
//               groupId,
//               sentBy: validMessage.sentBy,
//               readBy: validMessage.readBy,
//               message: validMessage.message,
//               priorityLevel: validMessage.priorityLevel
//             })
//             .end((err, res) => {
//               res.should.have.status(201);
//               res.body.should.be.a('object');
//               res.body.should.have.property('status')
//                 .eql('Message sent successfully');
//               done();
//             });
//         });

//       it('should not send a message if message paramter is missing',
//         (done) => {
//           server
//             .post(`/api/v1/groups/${groupId}/message`)
//             .send({
//               token,
//               groupId,

//               // assuming the message field is empty
//               sentBy: validMessage.sentBy,
//               readBy: validMessage.readBy,
//               priorityLevel: validMessage.priorityLevel
//             })
//             .end((err, res) => {
//               res.should.have.status(400);
//               res.body.should.be.a('object');
//               res.body.should.have.property('message')
//                 .eql('Invalid request. Some column(s) are missing');
//               done();
//             });
//         });

//       it('should not send a message if message paramter is empty',
//         (done) => {
//           server
//             .post(`/api/v1/groups/${groupId}/message`)
//             .send({
//               token,
//               groupId,
//               sentBy: validMessage.sentBy,
//               readBy: validMessage.readBy,
//               message: invalidMessage.message,
//               priorityLevel: validMessage.priorityLevel,
//             })
//             .end((err, res) => {
//               res.should.have.status(400);
//               res.body.should.be.a('object');
//               res.body.should.have.property('message')
//                 .eql('Invalid request. Some column(s) are missing');
//               done();
//             });
//         });

//       it('should display message when a group have message',
//         (done) => {
//           server
//             .get(`/api/v1/groups/${groupId}/messages`)
//             .set({ 'x-access-token': token })
//             .end((err, res) => {
//               res.should.have.status(200);
//               res.body.should.be.a('array');
//               res.body[0].should.have.property('message')
//                 .eql('This is a sample message');
//               res.body[0].should.have.property('priorityLevel')
//                 .eql('Normal');
//               done();
//             });
//         });
//     });

//     describe('POST: /api/v1/groups/:messageId/notification ', () => {
//       it(`should add notification when a message
//           is sent`,
//         (done) => {
//           server
//             .post(`/api/v1/groups/${messageId}/notification`)
//             .send({
//               token,
//               groupId,
//               messageReaders,
//               senderId: notification.senderId,
//             })
//             .end((err, res) => {
//               res.should.have.status(200);
//               res.body.should.be.a('object');
//               res.body.should.have.property('message')
//                 .eql('Notification Added');
//               done();
//             });
//         });

//       it(`should not add notification when userId 
//         parameter is not available`,
//         (done) => {
//           server
//             .post(`/api/v1/groups/${messageId}/notification`)
//             .send({
//               token,
//               groupId,

//               // assuming userId is missing
//               senderId: notification.senderId,
//               readStatus: notification.readStatus,
//             })
//             .end((err, res) => {
//               res.should.have.status(400);
//               res.body.should.be.a('object');
//               res.body.should.have.property('message')
//                 .eql('Invalid request.Some column(s) column are missing');
//               done();
//             });
//         });

//       it(`should not add a notification when message
//           with messageId is not found`,
//         (done) => {
//           messageId = invalidNotification.messageId;
//           server
//             .post(`/api/v1/groups/${messageId}/notification`)
//             .send({
//               token,
//               groupId,
//               userId: notification.userId,
//               senderId: notification.senderId,
//               readStatus: notification.readStatus
//             })
//             .end((err, res) => {
//               res.should.have.status(400);
//               res.body.should.be.a('object');
//               done();
//             });
//         });
//     });

//     describe('POST: /api/v1/user/notifications ', () => {
//       it('should retrieve notifications',
//         (done) => {
//           server
//             .post('/api/v1/user/notifications')
//             .send({
//               token,
//               userId: notification.userId,
//             })
//             .end((err, res) => {
//               res.should.have.status(200);
//               res.body.should.be.a('object');
//               done();
//             });
//         });

//       it(`should return empty result when
//           retrieving a notification of user who has no notification`,
//         (done) => {
//           server
//             .post('/api/v1/user/notifications')
//             .send({
//               token,
//               userId: notification.invalidUserId,
//             })
//             .end((err, res) => {
//               res.should.have.status(200);
//               res.body.should.be.a('object');
//               res.body.should.have.property('messageRes')
//                 .eql([]);
//               done();
//             });
//         });
//     });

//     describe('POST: /api/v1/users/:messageId/read', () => {
//       it('should return empty result if message readers are empty',
//         (done) => {
//           messageId = notification.messageId;
//           server
//             .post(`/api/v1/users/${messageId}/read`)
//             .send({
//               token,
//             })
//             .end((err, res) => {
//               res.should.have.status(200);
//               res.body.should.be.a('object');
//               res.body.should.have.property('messageReadUsers')
//                 .eql([]);
//               done();
//             });
//         });
//     });

//     describe('POST: /api/v1/user/:messageId/notification', () => {
//       it('should update notification',
//         (done) => {
//           server
//             .post(`/api/v1/user/${messageId}/notification`)
//             .send({
//               token,
//               userId: updateNotification.userId,
//               readStatus: updateNotification.readStatus,
//             })
//             .end((err, res) => {
//               res.should.have.status(201);
//               res.body.should.be.a('object');
//               res.body.should.have.property('message')
//                 .eql('Notification Updated');
//               res.body.should.have.property('success')
//                 .eql(true);
//               done();
//             });
//         });

//       it(`should throw not found error when attempting
//           to update a notification that does not exist`,
//         (done) => {
//           server
//             .post(`/api/v1/user/${messageId}/notification`)
//             .send({
//               token,
//               userId: invalidNotification.userId,
//               readStatus: updateNotification.readStatus,
//             })
//             .end((err, res) => {
//               res.should.have.status(404);
//               res.body.should.be.a('object');
//               res.body.should.have.property('message')
//                 .eql('Notification does not exist');
//               done();
//             });
//         });

//       it(`should not update the notification of a user
//           if userId is not found`,
//         (done) => {
//           server
//             .post(`/api/v1/user/${messageId}/notification`)
//             .send({
//               token,

//               // assuming userId is missing
//               readStatus: updateNotification.readStatus,
//             })
//             .end((err, res) => {
//               res.should.have.status(400);
//               res.body.should.be.a('object');
//               res.body.should.have.property('message')
//                 .eql('Invalid request.Some column are missing');
//               done();
//             });
//         });
//     });

//     describe('POST: /api/v1/users/:messageId/read', () => {
//       it('should get all users that read a message',
//         (done) => {
//           server
//             .post(`/api/v1/users/${messageId}/read`)
//             .send({
//               token,
//             })
//             .end((err, res) => {
//               res.should.have.status(200);
//               res.body.should.be.a('object');
//               res.body.should.have.property('messageReadUsers');
//               done();
//             });
//         });
//     });
//   });
// });
