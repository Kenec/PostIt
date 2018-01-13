// import supertest from 'supertest';
// import chai from 'chai';
// import chaiHttp from 'chai-http';
// import { userGroups } from '../../models';
// import mockData from '../mockData.json';
// import app from '../../app';

// process.env.NODE_ENV = 'test';

// const server = supertest.agent(app);
// chai.use(chaiHttp);

// const { group } = mockData.Groups;
// const {
//   validUser,
//   invalidUser,
//   emptyUsername,
//   anotherValidUser,
//   validSigninAccount
// } = mockData.Users;

// describe('GroupsUser', () => {
//   let token = '';
//   before((done) => {
//     server
//       .post('/api/v1/users/signin')
//       .send(validSigninAccount)
//       .end((err, res) => {
//         token = res.body.token;
//       });
//     userGroups.sync({ force: true })
//       .then(() => done())
//       .catch((error) => {
//         done(error);
//       });
//   });

//   describe('API Routes Test: ', () => {
//     const groupId = group.groupId;
//     describe('POST: /api/v1/groups/:groupId/user', () => {
//       it('should add a user to a group',
//         (done) => {
//           server
//             .post(`/api/v1/groups/${groupId}/user`)
//             .send({
//               token,
//               userId: validUser.userId
//             })
//             .end((err, res) => {
//               res.should.have.status(201);
//               res.body.should.be.a('object');
//               res.body.should.have.property('message')
//                 .eql('User Added');
//               res.body.should.have.property('success')
//                 .eql(true);
//               done();
//             });
//         });

//       it('should add another user to a group',
//         (done) => {
//           server
//             .post(`/api/v1/groups/${groupId}/user`)
//             .send({
//               token,
//               userId: anotherValidUser.userId
//             })
//             .end((err, res) => {
//               res.should.have.status(201);
//               res.body.should.be.a('object');
//               res.body.should.have.property('message')
//                 .eql('User Added');
//               res.body.should.have.property('success')
//                 .eql(true);
//               done();
//             });
//         });

//       it('should not add a user to a group if userId is not supplied',
//         (done) => {
//           server
//             .post(`/api/v1/groups/${groupId}/user`)
//             .send({

//               // assuming userId is not supplied
//               token,
//             })
//             .end((err, res) => {
//               res.should.have.status(400);
//               res.body.should.be.a('object');
//               res.body.should.have.property('message')
//                 .eql('Invalid request. Some column(s) are missing');
//               done();
//             });
//         });

//       it('should not add a user who does not exist to a group',
//         (done) => {
//           server
//             .post(`/api/v1/groups/${groupId}/user`)
//             .send({
//               token,
//               userId: invalidUser.userId
//             })
//             .end((err, res) => {
//               res.should.have.status(404);
//               res.body.should.be.a('object');
//               res.body.should.have.property('message')
//                 .eql('Cannot add a user who does not exist to a group');
//               done();
//             });
//         });

//       it('should not add a user who already exist in a group',
//         (done) => {
//           server
//             .post(`/api/v1/groups/${groupId}/user`)
//             .send({
//               token,
//               userId: validUser.userId
//             })
//             .end((err, res) => {
//               res.should.have.status(409);
//               res.body.should.be.a('object');
//               res.body.should.have.property('message')
//                 .eql('User Already Exist');
//               done();
//             });
//         });

//       it(`should throw error when a user cannot be added
//           due to server error`,
//         (done) => {
//           server
//             .post(`/api/v1/groups/${undefined}/user`)
//             .send({
//               token,
//               userId: validUser.userId
//             })
//             .end((err, res) => {
//               res.should.have.status(500);
//               res.body.should.be.a('object');
//               res.body.should.have.property('message')
//                 .eql('Error occured while trying to add user');
//               done();
//             });
//         });
//     });

//     describe('DELETE: /api/v1/groups/:groupId/users', () => {
//       it(`should not remove a user if userId, token and admin parameters
//           required are not supplied`,
//         (done) => {
//           server
//             .delete(`/api/v1/groups/${groupId}/users`)
//             .send({

//               // assuming userId is missing
//               token,
//               admin: group.admin
//             })
//             .end((err, res) => {
//               res.should.have.status(400);
//               res.body.should.be.a('object');
//               res.body.should.have.property('message')
//                 .eql('Incomplete payload');
//               done();
//             });
//         });

//       it(`should not remove a user from a group
//           he created`,
//         (done) => {
//           server
//             .delete(`/api/v1/groups/${groupId}/users?admin=${group.admin}&user=${validUser.userId}`)
//             .set({ 'x-access-token': token })
//             .end((err, res) => {
//               res.should.have.status(401);
//               res.body.should.be.a('object');
//               res.body.should.have.property('message')
//                 .eql('Cannot remove yourself from the Group you created');
//               done();
//             });
//         });

//       it('should not remove a user who does not exist from a group',
//         (done) => {
//           server
//             .delete(`/api/v1/groups/${groupId}/users?admin=${group.admin}&user=${invalidUser.userId}`)
//             .set({ 'x-access-token': token })
//             .end((err, res) => {
//               res.should.have.status(404);
//               res.body.should.be.a('object');
//               res.body.should.have.property('message')
//                 .eql('User not found!');
//               done();
//             });
//         });

//       it('should remove a user from a group',
//         (done) => {
//           server
//             .delete(`/api/v1/groups/${groupId}/users?admin=${group.admin}&user=${anotherValidUser.userId}`)
//             .set({ 'x-access-token': token })
//             .end((err, res) => {
//               res.should.have.status(200);
//               res.body.should.be.a('object');
//               res.body.should.have.property('message')
//                 .eql('User Removed From Group');
//               done();
//             });
//         });
//     });

//     describe('POST: /api/v1/user/groups', () => {
//       it(`should return groups a user belonged to
//           by username`,
//         (done) => {
//           server
//             .post('/api/v1/user/groups')
//             .send({
//               token,
//               username: validUser.username,
//             })
//             .end((err, res) => {
//               res.should.have.status(200);
//               res.body.should.be.a('object');
//               res.body.should.have.property('id')
//                 .eql(1);
//               res.body.should.have.property('groups')
//                 .eql([{ id: 1, groupName: 'Group' }]);
//               done();
//             });
//         });

//       it(`should not return groups a user belonged to
//           by username if username is not supplied`,
//         (done) => {
//           server
//             .post('/api/v1/user/groups')
//             .send({

//               // assuming the username is not supplied
//               token,
//             })
//             .end((err, res) => {
//               res.should.have.status(400);
//               res.body.should.be.a('object');
//               res.body.should.have.property('message')
//                 .eql('Invalid request. Username is missing');
//               done();
//             });
//         });

//       it(`should not return groups a user belonged to
//          by username if username is empty`,
//         (done) => {
//           server
//             .post('/api/v1/user/groups')
//             .send({
//               token,
//               username: emptyUsername.username,
//             })
//             .end((err, res) => {
//               res.should.have.status(400);
//               res.body.should.be.a('object');
//               res.body.should.have.property('message')
//                 .eql('Invalid request. Username is missing');
//               done();
//             });
//         });
//     });

//     describe('POST: /api/v1/users/:id', () => {
//       it('should search a user',
//         (done) => {
//           server
//             .post('/api/v1/users/0')
//             .send({
//               token,
//               username: validUser.username,
//             })
//             .end((err, res) => {
//               res.should.have.status(200);
//               res.body.should.be.a('object');
//               res.body.should.have.property('count')
//                 .eql(1);
//               res.body.should.have.property('rows');
//               done();
//             });
//         });

//       it('should not search a user if username field is not available',
//         (done) => {
//           server
//             .post('/api/v1/users/0')
//             .send({

//               // assuming username is not supplied
//               token
//             })
//             .end((err, res) => {
//               res.should.have.status(400);
//               res.body.should.have.property('message')
//                 .eql('Invalid request. Some column(s) are missing');
//               done();
//             });
//         });

//       it('should not search a user if username field is empty',
//         (done) => {
//           server
//             .post('/api/v1/users/0')
//             .send({
//               token,
//               username: emptyUsername.username,
//             })
//             .end((err, res) => {
//               res.should.have.status(400);
//               res.body.should.have.property('message')
//                 .eql('Invalid request. Some column(s) are missing');
//               done();
//             });
//         });

//       it(`should throw an error when unauthenticated user
//           attempts to add another user to a group`,
//         (done) => {
//           server
//             .post('/api/v1/users/0')
//             .send({

//               // token is not available
//               username: validUser.username,
//             })
//             .end((err, res) => {
//               res.should.have.status(403);
//               res.body.should.be.a('object');
//               res.body.should.have.property('message')
//                 .eql('No token provided.');
//               done();
//             });
//         });
//     });

//     describe('GET: /api/v1/groups', () => {
//       it('should return all groups',
//         (done) => {
//           server
//             .get('/api/v1/groups')
//             .send({
//               token,
//             })
//             .end((err, res) => {
//               res.should.have.status(200);
//               res.body.should.be.a('array');
//               res.body[0].should.have.property('id')
//                 .eql(1);
//               res.body[0].should.have.property('groupName')
//                 .eql('Group');
//               done();
//             });
//         });
//     });

//     describe('GET: /api/v1/groups/:groupId/users', () => {
//       it('should fetch members of a group',
//         (done) => {
//           server
//             .get(`/api/v1/groups/${groupId}/users`)
//             .set({ 'x-access-token': token })
//             .end((err, res) => {
//               res.should.have.status(200);
//               res.body.should.be.a('object');
//               res.body.should.have.property('id')
//                 .eql(1);
//               res.body.should.have.property('groupName')
//                 .eql('Group');
//               res.body.should.have.property('createdby')
//                 .eql('1');
//               done();
//             });
//         });

//       it('should return not found for a groupId with no Group',
//         (done) => {
//           server
//             .get('/api/v1/groups/100/users')
//             .set({ 'x-access-token': token })
//             .end((err, res) => {
//               res.should.have.status(500);
//               res.body.should.be.a('object');
//               res.body.should.have.property('message')
//                 .eql('Error occured while fetching members in a Group');
//               done();
//             });
//         });
//     });
//   });
// });
