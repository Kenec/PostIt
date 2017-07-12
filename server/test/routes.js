// var assert = require('assert');
import { assert } from 'assert';
import { should } from 'should';
import supertest from 'supertest';

const server = supertest.agent('http://localhost:3000');

describe('API Route Tests: ', () => {
  describe('Signup', () => {
    it('should return signup route', (done) => {
      server
        .post('/api/user/signup')
        .send({username:'pene', email:'kene@gmail.com', password:'kene'})
        .expect('Content-type', /json/)
        .expect(201)
        .end((err, res) => {
          res.status.should.equal(201);
          res.body.error.should.equal(false);
          done();
        });
    });
  });
});
