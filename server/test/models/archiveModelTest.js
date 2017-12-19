import chai from 'chai';
import isUUID from 'chai-uuid';
import models from '../../models';
import modelMock from '../modelMock.json';

chai.use(isUUID);
const expect = chai.expect;
const Archives = models.Archives;

const { validArchive, inValidArchive } = modelMock;

describe('Archive Model', () => {
  describe('Properties and Associations:', () => {
    const archive = new Archives(validArchive);
    it('should be an instance of Archives model', () => {
      expect(archive).to.be.an.instanceof(Archives);
    });

    it('should be an instance of Sequelize.Model', () => {
      expect(archive).to.be.an.instanceof(models.Sequelize.Model);
    });

    it('should have a messageId property', () => {
      expect(archive).to.have.property('messageId');
    });

    it('should have an userId property', () => {
      expect(archive).to.have.property('userId');
    });

    it('should have a createdAt property', () => {
      expect(archive).to.have.property('createdAt');
    });

    it('should have an updatedAt property', () => {
      expect(archive).to.have.property('updatedAt');
    });

    it('should define properties from argument to constructor',
      () => {
        expect(archive.userId).to.equal(validArchive.userId);
        expect(archive.messageId).to.equal(validArchive.messageId);
      });
  });

  describe('Creating an Archive with invalid attributes', () => {
    it('should return database error if userId invalid',
      () => Archives.create({
        userId: inValidArchive.userId,
        messageId: validArchive.messageId
      })
        .catch((errors) => {
          expect(errors.name).to.equal('SequelizeDatabaseError');
        }));

    it('should return database error if messageId is not valid',
      () => Archives.create({
        userId: validArchive.userId,
        messageId: inValidArchive.messageId
      })
        .catch((errors) => {
          expect(errors.name).to.equal('SequelizeDatabaseError');
        }));
  });

  describe('Create new Archive and save to database', () => {
    before((done) => {
      Archives.create(validArchive)
        .then(() => {
          done();
        });
    });

    it('should be written to database without errors',
      () => Archives.findOne({ where: { userId: validArchive.userId } })
        .then((fromDb) => {
          expect(fromDb.userId).to.equal(validArchive.userId);
          expect(fromDb.messageId).to.equal(validArchive.messageId);
        }));
  });
});
