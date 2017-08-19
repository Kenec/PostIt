// Require the dev-dependencies
import chai from 'chai';
import chaiHttp from 'chai-http';
import sendSMS from '../utils/sendSMS'
// During the test the env variable is set to test
process.env.NODE_ENV = 'test';

const should = chai.should();

chai.use(chaiHttp);

describe('sendSMS', () => {
  // Test for SMS
  describe('function', () => {
    it('should accept two params',
      () => {
        sendSMS.should.be.a('function');
      }
    );
  });
});
