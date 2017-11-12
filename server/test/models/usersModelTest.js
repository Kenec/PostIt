import chai from 'chai';
import isUUID from 'chai-uuid';
import models from '../../models';
import modelMock from '../modelMock.json';

chai.use(isUUID);
const expect = chai.expect;
const Users = models.Users;

const { validUser, inValidUser } = modelMock;

describe('Users Model', () => {
  describe('Properties and Associations:', () => {
    const user = new Users(validUser);
    it('should be an instance of Users model', () => {
      expect(user).to.be.an.instanceof(Users);
    });

    it('should be an instance of Sequelize.Model', () => {
      expect(user).to.be.an.instanceof(models.Sequelize.Model);
    });

    it('should have a username property', () => {
      expect(user).to.have.property('username');
    });

    it('should have an email property', () => {
      expect(user).to.have.property('email');
    });

    it('should have a password property', () => {
      expect(user).to.have.property('password');
    });

    it('should have a phone property', () => {
      expect(user).to.have.property('phone');
    });

    it('should have a createdAt property', () => {
      expect(user).to.have.property('createdAt');
    });

    it('should have an updatedAt property', () => {
      expect(user).to.have.property('updatedAt');
    });

    it('should have association methods for `Groups` model',
      () => {
        expect(user.createGroup).to.be.a('function');
        expect(user.getGroups).to.be.a('function');
        expect(user.hasGroups).to.be.a('function');
        expect(user.addGroups).to.be.a('function');
      });

    it('should have association methods for `Messages` model',
      () => {
        expect(user.createMessage).to.be.a('function');
        expect(user.getMessages).to.be.a('function');
      });

    it('should define properties from argument to constructor',
      () => {
        expect(user.username).to.equal(validUser.username);
        expect(user.email).to.equal(validUser.email);
        expect(user.password).to.equal(validUser.password);
        expect(user.phone).to.equal(validUser.phone);
      });
  });

  describe('Creating a user with invalid attributes', () => {
    it('should return validation error if username is not aphanumeric',
      () => Users.create({
        username: inValidUser.username,
        email: validUser.email,
        password: validUser.email,
        phone: validUser.phone
      })
        .catch((errors) => {
          expect(errors.name).to.equal('SequelizeValidationError');
          const error = errors.errors;
          expect(error[0].type).to
            .equal('string violation');
          expect(error[0].message).to
            .equal('username cannot be an array or an object');
        }));

    it('should return validation error if username is empty string',
      () => Users.create({
        username: '',
        email: validUser.email,
        password: validUser.email,
        phone: validUser.phone
      })
        .catch((errors) => {
          expect(errors.name).to.equal('SequelizeValidationError');
          const error = errors.errors;
          expect(error[0].type).to
            .equal('Validation error');
          expect(error[0].message).to
            .equal('Must be an Valid String');
        }));

    it('should return validation error if email has invalid syntax',
      () => Users.create({
        username: validUser.username,
        email: inValidUser.email,
        password: validUser.email,
        phone: validUser.phone
      })
        .catch((errors) => {
          expect(errors.name).to.equal('SequelizeValidationError');
          const error = errors.errors;
          expect(error[0].type).to
            .equal('Validation error');
          expect(error[0].message).to
            .equal('Must be an Valid String');
        }));

    it('should return validation error if phone is not numeric',
      () => Users.create({
        username: validUser.username,
        email: validUser.email,
        password: validUser.email,
        phone: inValidUser.phone
      })
        .catch((errors) => {
          expect(errors.name).to.equal('SequelizeValidationError');
          const error = errors.errors;
          expect(error[0].type).to
            .equal('Validation error');
          expect(error[0].message).to
            .equal('Validation not on phone failed');
        }));

    it('should return validation error if phone is empty string',
      () => Users.create({
        username: validUser.username,
        email: validUser.email,
        password: validUser.email,
        phone: ''
      })
        .catch((errors) => {
          expect(errors.name).to.equal('SequelizeValidationError');
          const error = errors.errors;
          expect(error[0].type).to
            .equal('Validation error');
          expect(error[0].message).to
            .equal('Must be an Valid String');
        }));
  });

  describe('Create a valid User and save to database', () => {
    before((done) => {
      Users.create(validUser)
        .then(() => {
          done();
        });
    });

    it('should be written to database without errors',
      () => Users.findOne({ where: { username: validUser.username } })
        .then((fromDb) => {
          expect(fromDb.email).to.equal(validUser.email);
          expect(fromDb.phone).to.equal(validUser.phone);
        }));

    it('should return error if `username or password` already exists',
      () => Users.create(validUser)
        .catch((errors) => {
          expect(errors.name).to.equal('SequelizeUniqueConstraintError');
          const error = errors.get('username');
          expect(error[0].type).to.equal('unique violation');
          expect(error[0].message).to
            .equal('username must be unique');
        }));
  });
});

