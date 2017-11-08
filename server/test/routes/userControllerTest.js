import supertest from 'supertest';
import chai from 'chai';
import chaiHttp from 'chai-http';
import { Users } from '../../models';
import app from '../../app';
import mockData from '../mockData.json';

process.env.NODE_ENV = 'test';

const server = supertest.agent(app);
chai.use(chaiHttp);

const {
  validUser,
  anotherValidUser,
  invalidEmail,
  missingUsername,
  emptyUsername,
  missingSigninUsername,
  emptySigninUsername,
  validSigninAccount,
  invalidSigninAccount,
  validToken,
  invalidPassword,
  validPassword,
  inValidToken,
  invalidResetPassword
} = mockData.Users;

describe('Users', () => {
  before((done) => {
    Users.sync({ force: true })
      .then(() => {
        done();
      })
      .catch((error) => {
        done(error);
      });
  });

  describe('API Route Test: ', () => {
    let token = '';
    describe('POST: /api/v1/users/signup', () => {
      it('should create a new user account when all conditions are met',
        (done) => {
          server
            .post('/api/v1/users/signup')
            .send(validUser)
            .end((err, res) => {
              res.should.have.status(201);
              res.body.should.be.a('object');
              res.should.have.status(201);
              res.body.should.have.property('message')
                .eql('User Created successfully');
              done();
            });
        });
      it('should create another new user account with different account',
        (done) => {
          server
            .post('/api/v1/users/signup')
            .send(anotherValidUser)
            .end((err, res) => {
              res.should.have.status(201);
              res.body.should.be.a('object');
              res.should.have.status(201);
              res.body.should.have.property('message')
                .eql('User Created successfully');
              done();
            });
        });
      it('should throw error when a duplicate account wants to be created',
        (done) => {
          server
            .post('/api/v1/users/signup')
            .send(validUser)
            .end((err, res) => {
              res.should.have.status(409);
              res.body.should.have.property('message')
                .eql('User already exist');
              done();
            });
        });
      it('should not allow user to be created when any field is invalid',
        (done) => {
          server
            .post('/api/v1/users/signup')
            .send(invalidEmail)
            .end((err, res) => {
              res.should.have.status(400);
              res.body.should.have.property('message')
                .eql('Email is invalid');
              done();
            });
        });
      it('should not create a new user when all field is not available',
        (done) => {
          server
            .post('/api/v1/users/signup')
            .send(missingUsername)
            .end((err, res) => {
              res.should.have.status(400);
              res.body.should.have.property('message')
                .eql('Invalid request. Some column(s) are missing');
              done();
            });
        });
      it('should not create a new user when any field is empty',
        (done) => {
          server
            .post('/api/v1/users/signup')
            .send(emptyUsername)
            .end((err, res) => {
              res.should.have.status(400);
              res.body.should.have.property('message')
                .eql('Invalid request. Some column(s) are missing');
              done();
            });
        });
    });
    describe('POST: /api/v1/users/signin', () => {
      it('should not signin when any field is missing', (done) => {
        server
          .post('/api/v1/users/signin')
          .send(missingSigninUsername)
          .end((err, res) => {
            token = res.body.token;
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('message')
              .eql('Invalid request. Some column(s) are missing');
            done();
          });
      });
      it('should not signin when any field is empty', (done) => {
        server
          .post('/api/v1/users/signin')
          .send(emptySigninUsername)
          .end((err, res) => {
            token = res.body.token;
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('message')
              .eql('Invalid request. Some column(s) are missing');
            done();
          });
      });
      it('should expect parameter of object returned on successful signin',
        (done) => {
          server
            .post('/api/v1/users/signin')
            .send(validSigninAccount)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.have.property('token');
              res.body.should.have.property('message')
                .eql('Successfully logged in');
              res.body.should.have.property('username')
                .eql('kene');
              done();
            });
        });
      it('should signin a user with correct credentials', (done) => {
        server
          .post('/api/v1/users/signin')
          .send(validSigninAccount)
          .end((err, res) => {
            token = res.body.token;
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('message')
              .eql('Successfully logged in');
            done();
          });
      });
      it(`should return not found error
        if a user attempts to login with invalid username and passowrd`,
        (done) => {
          server
            .post('/api/v1/users/signin')
            .send(invalidSigninAccount)
            .end((err, res) => {
              res.should.have.status(401);
              res.body.should.have.property('message')
                .eql('Invalid username or password');
              done();
            });
        });
    });
    describe('POST: /api/v1/users/username', () => {
      it('should return user details when searched by username',
        (done) => {
          server
            .post('/api/v1/users/username')
            .send({
              token,
              username: validUser.username
            })
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.have.property('userid');
              res.body.should.have.property('username');
              res.body.should.have.property('phone');
              res.body.should.have.property('email');
              done();
            });
        });
      it(`should return not found error when user
        details is not found when searched by username`,
        (done) => {
          server
            .post('/api/v1/users/username')
            .send({
              token,
              username: invalidSigninAccount.username
            })
            .end((err, res) => {
              res.should.have.status(404);
              res.body.should.have.property('message')
                .eql('User not found');
              done();
            });
        });
      it(`should return error when search user by
        username query errored`,
        (done) => {
          server
            .post('/api/v1/users/username')
            .send({

            // assuming the request is made without valid token
              username: validUser.username
            })
            .end((err, res) => {
              res.should.have.status(403);
              done();
            });
        });
      it(`should throw an error for search by
        username if username is not supplied`,
        (done) => {
          server
            .post('/api/v1/users/username')
            .send({
              token,

            // the username parameter is missing
            })
            .end((err, res) => {
              res.should.have.status(400);
              res.body.should.have.property('message')
                .eql('Invalid request. Username column is missing');
              done();
            });
        });
      it('should not search a user by username if username is empty',
        (done) => {
          server
            .post('/api/v1/users/username')
            .send({
              token,
              username: emptyUsername.username
            })
            .end((err, res) => {
              res.should.have.status(400);
              res.body.should.have.property('message')
                .eql('Invalid request. Username column is missing');
              done();
            });
        });
    });
    describe('POST: /api/v1/users/resetpassword/:token', () => {
      token = validToken;
      it('should not update password if new password is not available',
        (done) => {
          server
            .post(`/api/v1/users/resetpassword/${token}`)
            .send({

            // the username parameter is missing
              password: validUser.password
            })
            .end((err, res) => {
              res.should.have.status(400);
              res.body.should.be.a('object');
              res.body.should.have.property('message')
                .eql('Invalid request. Some column(s) are missing');
              done();
            });
        });
      it(`should not update password if any parameter
          violates validation rule`,
        (done) => {
          server
            .post(`/api/v1/users/resetpassword/${token}`)
            .send(invalidPassword)
            .end((err, res) => {
              res.should.have.status(400);
              res.body.should.be.a('object');
              res.body.should.have.property('message')
                .eql('Email is invalid');
              done();
            });
        });
      it('should update password when all conditions are met',
        (done) => {
          server
            .post(`/api/v1/users/resetpassword/${token}`)
            .send(validPassword)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('message')
                .eql('Password reset successfully!');
              done();
            });
        });
      it('should throw error when token does not exists',
        (done) => {
          server
            .get(`/api/v1/users/resetpassword/${inValidToken}`)
            .end((err, res) => {
              res.should.have.status(404);
              res.body.should.be.a('object');
              res.body.should.have.property('message')
                .eql('Token not found');
              done();
            });
        });
    });
    describe('GET: /api/v1/users/resetpassword/:token', () => {
      token = validToken;
      it('should check if token exist',
        (done) => {
          server
            .get(`/api/v1/users/resetpassword/${token}`)
            .set({ 'x-access-token': token })
            .end((err, res) => {
              res.should.have.status(404);
              res.body.should.be.a('object');
              res.body.should.have.property('message')
                .eql('Token not found');
              done();
            });
        });
    });
    describe('POST: /api/v1/users/resetpassword', () => {
      it('should not reset password if any parameter violates validation rules',
        (done) => {
          server
            .post('/api/v1/users/resetpassword')
            .send(invalidPassword)
            .end((err, res) => {
              res.should.have.status(400);
              res.body.should.be.a('object');
              res.body.should.have.property('message')
                .eql('Email is invalid');
              done();
            });
        });
      it('should not update password when any field is empty',
        (done) => {
          server
            .post('/api/v1/users/resetpassword')
            .send(invalidResetPassword)
            .end((err, res) => {
              res.should.have.status(400);
              res.body.should.be.a('object');
              res.body.should.have.property('message')
                .eql('Invalid request. Email column is missing');
              done();
            });
        });
    });
  });
});
