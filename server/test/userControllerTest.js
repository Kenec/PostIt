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
    describe('Signup', () => {
      it('should create a new user account when all conditions are met',
        (done) => {
          server
            .post('/api/v1/users/signup')
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
              done();
            });
        });
      it('should another a new user account',
        (done) => {
          server
            .post('/api/v1/users/signup')
            .send({
              username: 'Mike',
              email: 'mike@gmail.com',
              phone: '07038550515',
              password: 'kene' })
            .end((err, res) => {
              res.should.have.status(201);
              res.body.should.be.a('object');
              res.should.have.status(201);
              res.body.should.have.property('message')
                .eql('User Created successfully');
              done();
            });
        });
      it('should throw 409 error when a duplicate account wants to be created',
        (done) => {
          server
            .post('/api/v1/users/signup')
            .send({
              username: 'kene',
              email: 'kene@gmail.com',
              phone: '07038550515',
              password: 'kene' })
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
            .send({
              username: 'Miene',
              email: 'email',
              phone: '07038550515',
              password: 'kene' })
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
            .send({
              // username: 'kene', // ie if the validate input fails
              email: 'kene@gmail.com',
              phone: '07038550515',
              password: 'kene' })
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
            .send({
              username: '',
              email: 'kene@gmail.com',
              phone: '07038550515',
              password: 'kene' })
            .end((err, res) => {
              res.should.have.status(400);
              res.body.should.have.property('message')
                .eql('Invalid request. Some column(s) are missing');
              done();
            });
        });
    });
  });
  describe('Signin', () => {
    let token = '';
    it('should not signin when any field is missing', (done) => {
      server
        .post('/api/v1/users/signin')
        .send({
          // username: 'kene',
          password: 'kene' })
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
        .send({
          username: '',
          password: 'kene' })
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
          .send({
            username: 'kene',
            password: 'kene' })
          .end((err, res) => {
            res.should.have.status(202);
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
        .send({
          username: 'kene',
          password: 'kene' })
        .end((err, res) => {
          token = res.body.token;
          res.should.have.status(202);
          res.body.should.be.a('object');
          res.body.should.have.property('message')
            .eql('Successfully logged in');
          done();
        });
    });
    it('should return 404 if a user is not found',
      (done) => {
        server
          .post('/api/v1/users/signin')
          .send({
            username: 'paul',
            password: 'kene' })
          .end((err, res) => {
            res.should.have.status(404);
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
            res.should.have.status(200);
            res.body.should.have.property('userid');
            res.body.should.have.property('username');
            res.body.should.have.property('phone');
            res.body.should.have.property('email');
            done();
          });
      });
    it(`should return 404 error when user
        details is not found when searched by username`,
      (done) => {
        server
          .post('/api/v1/users/username')
          .send({
            token,
            username: 'keneM' })
          .end((err, res) => {
            res.should.have.status(404);
            res.body.should.have.property('message')
              .eql('User not found');
            done();
          });
      });
    it(`should return 403 error when search user by
        username query errored`,
      (done) => {
        server
          .post('/api/v1/users/username')
          .send({
            // token, // when token is not available
            username: 'kene' })
          .end((err, res) => {
            res.should.have.status(403);
            done();
          });
      });
    it('should not search a user by username if username is not supplied',
      (done) => {
        server
          .post('/api/v1/users/username')
          .send({
            token,
            // username: 'kene' 
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
            username: ''
          })
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.have.property('message')
              .eql('Invalid request. Username column is missing');
            done();
          });
      });
  });
  describe('Update Password', () => {
    const token = 'thisisagibrishtoken';
    it('should not update password if new password is not available',
      (done) => {
        server
          .post(`/api/v1/users/resetpassword/${token}`)
          .send({
            // password: 'kene',
            email: 'kene@gmail.com' })
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('message')
              .eql('Invalid request. Some column(s) are missing');
            done();
          });
      });
    it('should not update password if any parameter violates validation rules',
      (done) => {
        server
          .post(`/api/v1/users/resetpassword/${token}`)
          .send({
            password: 'kene',
            confirmPassword: 'kene',
            email: 'kene' })
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
          .send({
            password: 'kene',
            confirmPassword: 'kene',
            email: 'kene@gmail.com' })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('message')
              .eql('Password reset successfully!');
            done();
          });
      });
    it('should 404 when token does not exists',
      (done) => {
        const inValidToken = 'thisisaninvalidtoken';
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
  describe('Valid Token', () => {
    const token = 'thisisagibrishtoken';
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
  describe('Reset password', () => {
    it('should not reset password if any parameter violates validation rules',
      (done) => {
        server
          .post('/api/v1/users/resetpassword')
          .send({
            password: 'kene',
            confirmPassword: 'kene',
            email: 'kene' })
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
          .send({
            password: 'kene',
            confirmPassword: 'kene',
            email: '' })
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
