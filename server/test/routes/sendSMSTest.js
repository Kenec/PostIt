import chai from 'chai';
import chaiHttp from 'chai-http';
import sendSMS from '../../utils/sendSMS';

process.env.NODE_ENV = 'test';
chai.use(chaiHttp);

describe('sendSMS', () => {
  describe('function', () => {
    it('should be a function',
      () => {
        sendSMS.should.be.a('function');
      }
    );
  });
});

