import should from 'should';
import supertest from 'supertest';
import { User } from '../models';

const server = supertest.agent('http://localhost:3000');

describe('API Route Tests: ', () => {
  describe('User', () => {
    // before(() => { // Before each test we empty the database
    //   User.destroy({});
    // });
  });

  // Test for sign up
  describe('Signup', () => {
    it('should return status code 201', (done) => {
      server
        .post('/api/user/signup')
        .send({
          username: 'kicheal',
          email: 'kene@gmail.com',
          password: 'kene' })
        .expect('Content-type', /json/)
        .expect(201)
        .end((err, res) => {
          res.status.should.equal(400);
          done();
        });
    });
  });

  // Test for signin
  describe('Signin', () => {
    it('should return status code 201', (done) => {
      server
        .post('/api/user/signin')
        .send({
          username: 'Kene',
          password: 'kene'
        })
        .expect('Content-type', /json/)
        .expect(201)
        .end((err, res) => {
          res.status.should.equal(201);
          done();
        });
    });
  });

  // Test for create group
  describe('Create Group', () => {
    it('should return status code 201', (done) => {
      server
        .post('/api/group')
        .send({
          groupname: 'Test',
          createdby: 1
        })
        .expect('Content-type', /json/)
        .expect(400)
        .end((err, res) => {
          res.status.should.equal(400);
          done();
        });
    });
  });

  // Test for create user
  describe('Add User to Group', () => {
    it('should return status code 201', (done) => {
      server
        .post('/api/group/2')
        .send({
          userid: 1,
        })
        .expect('Content-type', /json/)
        .end((err, res) => {
          res.status.should.equal(404);
          done();
        });
    });
  });

  // Test for List group
  describe('List Group', () => {
    it('should return status code 200', (done) => {
      server
        .get('/api/group/1')
        .expect('Content-type', /json/)
        .expect(200)
        .end((err, res) => {
          res.status.should.equal(200);
          done();
        });
    });
  });

  // Test for create message
  describe('Send Message', () => {
    it('should return status code 200', (done) => {
      server
        .post('/api/group/1/message')
        .send({
          message: 'Test',
          priority_level: 'critical',
          sentBy: 2,
        })
        .expect('Content-type', /json/)
        .expect(201)
        .end((err, res) => {
          res.status.should.equal(201);
          done();
        });
    });
  });

  // Test for create message
  describe('Retrieve Message by Group id', () => {
    it('should return status code 200', (done) => {
      server
        .get('/api/group/1/messages')
        .expect('Content-type', /json/)
        .expect(200)
        .end((err, res) => {
          res.status.should.equal(200);
          done();
        });
    });
  });

  // Test for create message
  describe('Retrieve Message by Group id', () => {
    it('should return status code 200', (done) => {
      server
        .get('/api/group/1/messages')
        .expect('Content-type', /json/)
        .expect(200)
        .end((err, res) => {
          res.status.should.equal(200);
          done();
        });
    });
  });

  // Test for create message
  describe('Retrieve all Group', () => {
    it('should return status code 200', (done) => {
      server
        .get('/api/group')
        .expect('Content-type', /json/)
        .expect(200)
        .end((err, res) => {
          res.status.should.equal(200);
          done();
        });
    });
  });


});
