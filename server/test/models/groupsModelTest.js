import chai from 'chai';
import isUUID from 'chai-uuid';
import models from '../../models';
import modelMock from '../modelMock.json';

chai.use(isUUID);
const expect = chai.expect;
const Groups = models.Groups;

const { validGroup, anotherValidGroup, inValidGroup } = modelMock;

describe('Groups Model', () => {
  describe('Properties and Associations:', () => {
    const group = new Groups(validGroup);
    it('should be an instance of Groups model', () => {
      expect(group).to.be.an.instanceof(Groups);
    });

    it('should be an instance of Sequelize.Model', () => {
      expect(group).to.be.an.instanceof(models.Sequelize.Model);
    });

    it('should have a groupName property', () => {
      expect(group).to.have.property('groupName');
    });

    it('should have an createdby property', () => {
      expect(group).to.have.property('createdby');
    });

    it('should have a createdAt property', () => {
      expect(group).to.have.property('createdAt');
    });

    it('should have an updatedAt property', () => {
      expect(group).to.have.property('updatedAt');
    });
  });

  describe('Creating a Group with invalid attributes', () => {
    it('should return violation error if groupName is not string',
      () => Groups.create({
        groupName: inValidGroup.groupName,
        createdby: validGroup.createdby,
      })
        .catch((errors) => {
          expect(errors.name).to.equal('SequelizeValidationError');
          const error = errors.errors;
          expect(error[0].type).to
            .equal('string violation');
          expect(error[0].message).to
            .equal('groupName cannot be an array or an object');
        }));

    it('should return violation error if username is empty string',
      () => Groups.create({
        groupName: validGroup.groupName,
        createdby: inValidGroup.createdby,
      })
        .catch((errors) => {
          expect(errors.name).to.equal('SequelizeValidationError');
          const error = errors.errors;
          expect(error[0].type).to
            .equal('string violation');
          expect(error[0].message).to
            .equal('createdby cannot be an array or an object');
        }));
  });

  describe('Create a valid Group and save to database', () => {
    before((done) => {
      Groups.create(anotherValidGroup)
        .then(() => {
          done();
        });
    });

    it('should be written to database without errors',
      () => Groups.findOne({ where: { groupName: validGroup.groupName } })
        .then((fromDb) => {
          expect(fromDb.groupName).to.equal(validGroup.groupName);
          expect(fromDb.createdby).to.equal(validGroup.createdby);
        }));

    it('should return error if `groupName` already exists',
      () => Groups.create(anotherValidGroup)
        .catch((errors) => {
          expect(errors.name).to.equal('SequelizeUniqueConstraintError');
          const error = errors.errors;
          expect(error[0].type).to.equal('unique violation');
          expect(error[0].message).to
            .equal('groupName must be unique');
        }));
  });
});

