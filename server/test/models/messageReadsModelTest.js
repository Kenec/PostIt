// import chai from 'chai';
// import isUUID from 'chai-uuid';
// import models from '../../models';
// import modelMock from '../modelMock.json';

// chai.use(isUUID);
// const expect = chai.expect;
// const MessageReads = models.MessageReads;

// const { validMessageReads, inValidMessageReads } = modelMock;

// describe('MessageReads Model', () => {
//   describe('Properties and Associations:', () => {
//     const messageRead = new MessageReads(validMessageReads);
//     it('should be an instance of MessageReads model', () => {
//       expect(messageRead).to.be.an.instanceof(MessageReads);
//     });

//     it('should be an instance of Sequelize.Model', () => {
//       expect(messageRead).to.be.an.instanceof(models.Sequelize.Model);
//     });

//     it('should have a messageId property', () => {
//       expect(messageRead).to.have.property('messageId');
//     });

//     it('should have an userId property', () => {
//       expect(messageRead).to.have.property('userId');
//     });

//     it('should have a senderId property', () => {
//       expect(messageRead).to.have.property('senderId');
//     });

//     it('should have a groupId property', () => {
//       expect(messageRead).to.have.property('groupId');
//     });

//     it('should have a read property', () => {
//       expect(messageRead).to.have.property('read');
//     });

//     it('should have a createdAt property', () => {
//       expect(messageRead).to.have.property('createdAt');
//     });

//     it('should have an updatedAt property', () => {
//       expect(messageRead).to.have.property('updatedAt');
//     });

//     it('should have association methods for `Messages` model',
//       () => {
//         expect(messageRead.createMessages).to.be.a('function');
//         expect(messageRead.getMessages).to.be.a('function');
//       });

//     it('should define properties from argument to constructor',
//       () => {
//         expect(messageRead.messageId).to.equal(validMessageReads.messageId);
//         expect(messageRead.userId).to.equal(validMessageReads.userId);
//         expect(messageRead.senderId).to.equal(validMessageReads.senderId);
//         expect(messageRead.groupId).to.equal(validMessageReads.groupId);
//         expect(messageRead.read).to.equal(validMessageReads.read);
//       });
//   });

//   describe('Creating a messageReads with invalid attributes', () => {
//     it('should return validation error if messageId is not valid',
//       () => MessageReads.create({
//         messageId: inValidMessageReads.messageId,
//         userId: validMessageReads.userId,
//         senderId: validMessageReads.senderId,
//         groupId: validMessageReads.groupId,
//         read: validMessageReads.read
//       })
//         .catch((errors) => {
//           expect(errors.name).to.equal('SequelizeDatabaseError');
//         }));

//     it('should return database error if userId is not valid',
//       () => MessageReads.create({
//         messageId: validMessageReads.messageId,
//         userId: inValidMessageReads.userId,
//         senderId: validMessageReads.senderId,
//         groupId: validMessageReads.groupId,
//         read: validMessageReads.read
//       })
//         .catch((errors) => {
//           expect(errors.name).to.equal('SequelizeDatabaseError');
//         }));

//     it('should return database error if senderId is not valid',
//       () => MessageReads.create({
//         messageId: validMessageReads.messageId,
//         userId: validMessageReads.userId,
//         senderId: inValidMessageReads.senderId,
//         groupId: validMessageReads.groupId,
//         read: validMessageReads.read
//       })
//         .catch((errors) => {
//           expect(errors.name).to.equal('SequelizeDatabaseError');
//         }));

//     it('should return validation error if groupId is not valid',
//       () => MessageReads.create({
//         messageId: validMessageReads.messageId,
//         userId: validMessageReads.userId,
//         senderId: validMessageReads.senderId,
//         groupId: inValidMessageReads.groupId,
//         read: validMessageReads.read
//       })
//         .catch((errors) => {
//           expect(errors.name).to.equal('SequelizeDatabaseError');
//         }));

//     it('should return database error if read is not valid',
//       () => MessageReads.create({
//         messageId: validMessageReads.messageId,
//         userId: validMessageReads.userId,
//         senderId: validMessageReads.senderId,
//         groupId: validMessageReads.groupId,
//         read: inValidMessageReads.read
//       })
//         .catch((errors) => {
//           expect(errors.name).to.equal('SequelizeDatabaseError');
//         }));
//   });

//   describe('Create a messageRead and save to database', () => {
//     before((done) => {
//       MessageReads.create(validMessageReads)
//         .then(() => {
//           done();
//         });
//     });

//     it('should be written to database without errors',
//       () => MessageReads.findOne({ where:
//         { messageId: validMessageReads.messageId } })
//         .then((fromDb) => {
//           expect(fromDb.messageId).to.equal(validMessageReads.messageId);
//           expect(fromDb.userId).to.equal(validMessageReads.userId);
//           expect(fromDb.senderId).to.equal(validMessageReads.senderId);
//           expect(fromDb.groupId).to.equal(validMessageReads.groupId);
//           expect(fromDb.read).to.equal(validMessageReads.read);
//         }));
//   });
// });

