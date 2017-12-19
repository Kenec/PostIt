import chai from 'chai';
import isUUID from 'chai-uuid';
import models from '../../models';
import modelMock from '../modelMock.json';

chai.use(isUUID);
const expect = chai.expect;
const userGroups = models.userGroups;

const { validUserGroup, inValidUserGroup, anotherValidUserGroup } = modelMock;

describe('userGroups Model', () => {
  describe('Properties and Associations:', () => {
    const userGroup = new userGroups(validUserGroup);
    it('should be an instance of userGroups model', () => {
      expect(userGroup).to.be.an.instanceof(userGroups);
    });

    it('should be an instance of Sequelize.Model', () => {
      expect(userGroup).to.be.an.instanceof(models.Sequelize.Model);
    });

    it('should have a userId property', () => {
      expect(userGroup).to.have.property('groupId');
    });

    it('should have an groupId property', () => {
      expect(userGroup).to.have.property('groupId');
    });

    it('should have a id property', () => {
      expect(userGroup).to.have.property('id');
    });

    it('should have a createdAt property', () => {
      expect(userGroup).to.have.property('createdAt');
    });

    it('should have an updatedAt property', () => {
      expect(userGroup).to.have.property('updatedAt');
    });

    it('should define properties from argument to constructor',
      () => {
        expect(userGroup.userId).to.equal(validUserGroup.userId);
        expect(userGroup.groupId).to.equal(validUserGroup.groupId);
      });
  });

  describe('Creating a userGroup with invalid attributes', () => {
    it('should return validation error if userId invalid',
      () => userGroups.create({
        userId: inValidUserGroup.userId,
        groupId: validUserGroup.groupId
      })
        .catch((errors) => {
          expect(errors.name).to.equal('SequelizeValidationError');
          const error = errors.errors;
          expect(error[0].type).to
            .equal('Validation error');
          expect(error[0].message).to
            .equal('UserId Must be an Integer');
        }));

    it('should return validation error if groupId is not valid',
      () => userGroups.create({
        userId: validUserGroup.userId,
        groupId: inValidUserGroup.groupId
      })
        .catch((errors) => {
          expect(errors.name).to.equal('SequelizeValidationError');
          const error = errors.errors;
          expect(error[0].type).to
            .equal('Validation error');
          expect(error[0].message).to
            .equal('GroupId Must be an Integer');
        }));
  });

  describe('Create new groupUser and save to database', () => {
    before((done) => {
      userGroups.create(anotherValidUserGroup)
        .then(() => {
          done();
        });
    });

    it('should be written to database without errors',
      () => userGroups.findOne({ where: { userId: validUserGroup.userId } })
        .then((fromDb) => {
          expect(fromDb.userId).to.equal(validUserGroup.userId);
          expect(fromDb.groupId).to.equal(validUserGroup.groupId);
        }));
  });
});
