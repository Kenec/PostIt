// Require the dev-dependencies
import supertest from 'supertest';
import chai from 'chai';
import chaiHttp from 'chai-http';
import { Users } from '../models';
import server from '../app';

// During the test the env variable is set to test
process.env.NODE_ENV = 'test';

// const server = supertest.agent(app);
let should = chai.should();

chai.use(chaiHttp);

describe('Users', () => {
  beforeEach((done) => { // Before each test we empty the database
    Users.sync({ force: true })
      .then(() => done())
      .catch((error) => {
        done(error);
      });
  });

  describe('API Route Tests: ', () => {
  // Test for sign up staus code to be 201 and res to be object
    describe('Signup', () => {
      it('should return status code 201 and  res to be object', (done) => {
        chai.request(server)
          .post('/api/user/signup')
          .send({
            username: 'kene',
            email: 'kene@gmail.com',
            phone: '07038550515',
            password: 'kene' })
          .end((err, res) => {
            res.should.have.status(201);
            res.body.should.be.a('object');
            done();
          });
      });
      // Test if the parameter returned have an object of message
      it('should expect parameter of object on successful signup', (done) => {
        chai.request(server)
          .post('/api/user/signup')
          .send({
            username: 'kene',
            email: 'kene@gmail.com',
            phone: '07038550515',
            password: 'kene' })
          .end((err, res) => {
            res.should.have.status(201);
            res.body.should.have.property('message')
              .eql('User Created successfully');
            res.body.should.have.property('success')
              .eql(true);
            done();
          });
      });
    });
  });
  // // Test for signin
  // describe('Signin', () => {
  //   it('should return status code 201', (done) => {
  //     server
  //       .post('/api/user/signin')
  //       .send({
  //         username: 'Kene',
  //         password: 'kene'
  //       })
  //       .expect('Content-type', /json/)
  //       .expect(201)
  //       .end((err, res) => {
  //         res.status.should.equal(201);
  //         done();
  //       });
  //   });
  // });
  //
  // // Test for create group
  // describe('Create Group', () => {
  //   it('should return status code 201', (done) => {
  //     server
  //       .post('/api/group')
  //       .send({
  //         groupname: 'Test',
  //         createdby: 1
  //       })
  //       .expect('Content-type', /json/)
  //       .expect(400)
  //       .end((err, res) => {
  //         res.status.should.equal(400);
  //         done();
  //       });
  //   });
  // });
  //
  // // Test for create user
  // describe('Add User to Group', () => {
  //   it('should return status code 201', (done) => {
  //     server
  //       .post('/api/group/2')
  //       .send({
  //         userid: 1,
  //       })
  //       .expect('Content-type', /json/)
  //       .end((err, res) => {
  //         res.status.should.equal(404);
  //         done();
  //       });
  //   });
  // });

  // // Test for List group
  // describe('List Group', () => {
  //   it('should return status code 200', (done) => {
  //     server
  //       .get('/api/group/1')
  //       .expect('Content-type', /json/)
  //       .expect(200)
  //       .end((err, res) => {
  //         res.status.should.equal(200);
  //         done();
  //       });
  //   });
  // });
  //
  // // Test for create message
  // describe('Send Message', () => {
  //   it('should return status code 200', (done) => {
  //     server
  //       .post('/api/group/1/message')
  //       .send({
  //         message: 'Test',
  //         priority_level: 'critical',
  //         sentBy: 2,
  //       })
  //       .expect('Content-type', /json/)
  //       .expect(201)
  //       .end((err, res) => {
  //         res.status.should.equal(201);
  //         done();
  //       });
  //   });
  // });
  //
  // // Test for create message
  // describe('Retrieve Message by Group id', () => {
  //   it('should return status code 200', (done) => {
  //     server
  //       .get('/api/group/1/messages')
  //       .expect('Content-type', /json/)
  //       .expect(200)
  //       .end((err, res) => {
  //         res.status.should.equal(200);
  //         done();
  //       });
  //   });
  // });

  // // Test for create message
  // describe('Retrieve Message by Group id', () => {
  //   it('should return status code 200', (done) => {
  //     server
  //       .get('/api/group/1/messages')
  //       .expect('Content-type', /json/)
  //       .expect(200)
  //       .end((err, res) => {
  //         res.status.should.equal(200);
  //         done();
  //       });
  //   });
  // });
  //
  // // Test for create message
  // describe('Retrieve all Group', () => {
  //   it('should return status code 200', (done) => {
  //     server
  //       .get('/api/group')
  //       .expect('Content-type', /json/)
  //       .expect(200)
  //       .end((err, res) => {
  //         res.status.should.equal(200);
  //         done();
  //       });
  //   });
  // });
});
