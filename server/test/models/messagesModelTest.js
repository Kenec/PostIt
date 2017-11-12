import chai from 'chai';
import isUUID from 'chai-uuid';
import models from '../../models';
import modelMock from '../modelMock.json';

chai.use(isUUID);
const expect = chai.expect;
const Messages = models.Messages;

const { validMessage, inValidMessage } = modelMock;

describe('Messages Model', () => {
  describe('Properties and Associations:', () => {
    const message = new Messages(validMessage);
    it('should be an instance of Messages model', () => {
      expect(message).to.be.an.instanceof(Messages);
    });

    it('should be an instance of Sequelize.Model', () => {
      expect(message).to.be.an.instanceof(models.Sequelize.Model);
    });

    it('should have a message property', () => {
      expect(message).to.have.property('message');
    });

    it('should have an priorityLevel property', () => {
      expect(message).to.have.property('message');
    });

    it('should have a groupId property', () => {
      expect(message).to.have.property('groupId');
    });

    it('should have a sentBy property', () => {
      expect(message).to.have.property('sentBy');
    });

    it('should have a ReadBy property', () => {
      expect(message).to.have.property('ReadBy');
    });

    it('should have a createdAt property', () => {
      expect(message).to.have.property('createdAt');
    });

    it('should have an updatedAt property', () => {
      expect(message).to.have.property('updatedAt');
    });

    it('should have association methods for `Users` model',
      () => {
        expect(message.createUsers).to.be.a('function');
        expect(message.getUsers).to.be.a('function');
        expect(message.setUsers).to.be.a('function');
      });

    it('should have association methods for `Groups` model',
      () => {
        expect(message.getGroups).to.be.a('function');
        expect(message.addGroups).to.be.a('function');
        expect(message.hasGroups).to.be.a('function');
      });

    it('should have association methods for `MessageReads` model',
      () => {
        expect(message.getMessageReads).to.be.a('function');
        expect(message.addMessageReads).to.be.a('function');
        expect(message.hasMessageReads).to.be.a('function');
      });

    it('should define properties from argument to constructor',
      () => {
        expect(message.message).to.equal(validMessage.message);
        expect(message.priorityLevel).to.equal(validMessage.priorityLevel);
        expect(message.groupId).to.equal(validMessage.groupId);
        expect(message.sentBy).to.equal(validMessage.sentBy);
        expect(message.ReadBy).to.equal(validMessage.ReadBy);
      });
  });

  describe('Creating a message with invalid attributes', () => {
    it('should return validation error if message is not text',
      () => Messages.create({
        message: inValidMessage.message,
        priorityLevel: validMessage.priorityLevel,
        groupId: validMessage.groupId,
        sentBy: validMessage.sentBy,
        ReadBy: validMessage.ReadBy
      })
        .catch((errors) => {
          expect(errors.name).to.equal('SequelizeValidationError');
          const error = errors.errors;
          expect(error[0].type).to
            .equal('string violation');
          expect(error[0].message).to
            .equal('message cannot be an array or an object');
        }));

    it('should return validation error if priorityLevel is not a string',
      () => Messages.create({
        message: validMessage.message,
        priorityLevel: inValidMessage.priorityLevel,
        groupId: validMessage.groupId,
        sentBy: validMessage.sentBy,
        ReadBy: validMessage.ReadBy
      })
        .catch((errors) => {
          expect(errors.name).to.equal('SequelizeValidationError');
          const error = errors.errors;
          expect(error[0].type).to
            .equal('string violation');
          expect(error[0].message).to
            .equal('priorityLevel cannot be an array or an object');
        }));

    it('should return validation error if groupId is invalid',
      () => Messages.create({
        message: validMessage.message,
        priorityLevel: validMessage.priorityLevel,
        groupId: inValidMessage.groupId,
        sentBy: validMessage.sentBy,
        ReadBy: validMessage.ReadBy
      })
        .catch((errors) => {
          expect(errors.name).to.equal('SequelizeValidationError');
          const error = errors.errors;
          expect(error[0].type).to
            .equal('Validation error');
          expect(error[0].message).to
            .equal('GroupId must not be empty');
        }));

    it('should return validation error if sentBy is invalid',
      () => Messages.create({
        message: validMessage.message,
        priorityLevel: validMessage.priorityLevel,
        groupId: validMessage.groupId,
        sentBy: inValidMessage.sentBy,
        ReadBy: validMessage.ReadBy
      })
        .catch((errors) => {
          expect(errors.name).to.equal('SequelizeValidationError');
          const error = errors.errors;
          expect(error[0].type).to
            .equal('Validation error');
          expect(error[0].message).to
            .equal('sentBy must not be empty');
        }));

    it('should return validation error if ReadBy is not a string',
      () => Messages.create({
        message: validMessage.message,
        priorityLevel: validMessage.priorityLevel,
        groupId: validMessage.groupId,
        sentBy: validMessage.sentBy,
        ReadBy: inValidMessage.ReadBy
      })
        .catch((errors) => {
          expect(errors.name).to.equal('SequelizeValidationError');
          const error = errors.errors;
          expect(error[0].type).to
            .equal('string violation');
          expect(error[0].message).to
            .equal('ReadBy cannot be an array or an object');
        }));
  });

  describe('Create a valid User and save to database', () => {
    before((done) => {
      Messages.create(validMessage)
        .then(() => {
          done();
        });
    });

    it('should be written to database without errors',
      () => Messages.findOne({ where: { message: validMessage.message } })
        .then((fromDb) => {
          expect(fromDb.message).to.equal(validMessage.message);
          expect(fromDb.priorityLevel).to.equal(validMessage.priorityLevel);
          expect(fromDb.groupId).to.equal(validMessage.groupId);
          expect(fromDb.sentBy).to.equal(validMessage.sentBy);
          expect(fromDb.ReadBy).to.equal(validMessage.ReadBy);
        }));
  });
});
