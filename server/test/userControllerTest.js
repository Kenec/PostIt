// Require the dev-dependencies
import supertest from 'supertest';
import chai from 'chai';
import chaiHttp from 'chai-http';
import { Users } from '../models';
import app from '../app';

// During the test the env variable is set to test
process.env.NODE_ENV = 'test';

const server = supertest.agent(app);
const should = chai.should();

chai.use(chaiHttp);

describe('Users', () => {
  before((done) => { // Before each test we empty the database
    Users.sync({ force: true })
      .then(() => {
        done();
      })
      .catch((error) => {
        done(error);
      });
  });

  describe('API Route Tests: ', () => {
    // Test for sign up staus code to be 201 and res to be object
    describe('Signup', () => {
      it('should return status code 201 and  res of object on signup',
        (done) => {
          server
            .post('/api/v1/user/signup')
            .send({
              username: 'kene',
              email: 'kene@gmail.com',
              phone: '07038550515',
              password: 'kene' })
            .end((err, res) => {
              res.should.have.status(201);
              res.body.should.be.a('object');
              res.should.have.status(201);
              res.body.should.have.property('message')
                .eql('User Created successfully');
              res.body.should.have.property('success')
                .eql(true);
              done();
            });
        });
      // Test if sigup function throws an error
      it('should expect error status to be 400',
        (done) => {
          server
            .post('/api/v1/user/signup')
            .send({
              email: 'kene@gmail.com',
              phone: '07038550515',
              password: 'kene' })
            .end((err, res) => {
              res.should.have.status(400);
              res.body.should.have.property('message')
                .eql('Account Already Exists!');
              res.body.should.have.property('success')
                .eql(false);
              done();
            });
        });
    });
  });
  // Test for signin code to be 202 and res object to be an object
  describe('Signin', () => {
    let token = '';
    it('should return status code 201 and  res to be object', (done) => {
      server
        .post('/api/v1/user/signin')
        .send({
          username: 'kene',
          password: 'kene' })
        .end((err, res) => {
          token = res.body.token;
          res.should.have.status(202);
          res.body.should.be.a('object');
          done();
        });
    });
    // Test if the parameter returned have an object of message
    it('should expect parameter of object returned on successful signin',
      (done) => {
        server
          .post('/api/v1/user/signin')
          .send({
            username: 'kene',
            password: 'kene' })
          .end((err, res) => {
            res.should.have.status(202);
            res.body.should.have.property('token');
            res.body.should.have.property('success')
              .eql(true);
            res.body.should.have.property('message')
              .eql('Successfully logged in');
            res.body.should.have.property('username')
              .eql('kene');
            done();
          });
      });
    // Test if sigin function throws an error when an invalid credential
    // is provided
    it('should expect error status to be 401',
      (done) => {
        server
          .post('/api/v1/user/signin')
          .send({
            username: 'paul',
            password: 'kene' })
          .end((err, res) => {
            res.should.have.status(401);
            res.body.should.have.property('message')
              .eql('Username not found, please register');
            done();
          });
      });
    it('should return user details when searched by username',
      (done) => {
        server
          .post('/api/v1/users/username')
          .send({
            token,
            username: 'kene' })
          .end((err, res) => {
            res.should.have.status(202);
            res.body.should.have.property('userid');
            res.body.should.have.property('username');
            res.body.should.have.property('phone');
            res.body.should.have.property('email');
            done();
          });
      });
    it(`should return 400 error when user
        details is not found when searched by username`,
      (done) => {
        server
          .post('/api/v1/users/username')
          .send({
            token,
            username: 'keneM' })
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.have.property('message')
              .eql('User not found');
            done();
          });
      });
    it(`should return 400 error when search user by
        username query errored`,
      (done) => {
        server
          .post('/api/v1/users/username')
          .send({
            // token, // when token is not available
            username: 'kene' })
          .end((err, res) => {
            res.should.have.status(401);
            done();
          });
      });
  });
  // Test for signin code to be 202 and res object to be an object
  describe('Update Password', () => {
    let token = 'thisisagibrishtoken';
    it(`should return status code 200 and res of an object
        when password is updated`,
      (done) => {
        server
          .post(`/api/v1/user/resetpassword/${token}`)
          .send({
            password: 'kene',
            email: 'kene@gmail.com' })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('message')
              .eql('Password reset successfully!');
            done();
          });
      });
    it(`should return status code 400 and res of an object
          for invalid token`,
      (done) => {
        const inValidToken = 'thisisaninvalidtoken';
        server
          .get(`/api/v1/user/resetpassword/${inValidToken}`)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('message')
              .eql('Token not found');
            done();
          });
      });
  });
});
