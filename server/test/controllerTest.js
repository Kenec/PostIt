import should from 'should';
import supertest from 'supertest';
import models from '../models';

const server = supertest.agent('http://localhost:3000');

describe('API Route Tests: ', () => {
  describe('User', () => {
    before(() => { // Before each test we empty the database
      // models.User.destroy({});
    });
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
          res.status.should.equal(201);
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
        .expect(201)
        .end((err, res) => {
          res.status.should.equal(201);
          done();
        });
    });
  });
});
