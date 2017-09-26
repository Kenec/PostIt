// Require the dev-dependencies
import chai from 'chai';
import chaiHttp from 'chai-http';
import sendMail from '../utils/sendMail';
// During the test the env variable is set to test
process.env.NODE_ENV = 'test';

const should = chai.should();

chai.use(chaiHttp);

describe('sendMail', () => {
  // Test for SMS
  describe('function', () => {
    it('should accept two params',
      () => {
        sendMail.should.be.a('function');
      }
    );
  });
});
// just before a PR for code review
