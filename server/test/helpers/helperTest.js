import chai from 'chai';
import chaiHttp from 'chai-http';
import Helpers from '../../utils/Helpers';

process.env.NODE_ENV = 'test';

chai.use(chaiHttp);

describe('Helper Class', () => {
  describe('getEmailText', () => {
    it('should be a function',
      () => {
        Helpers.getEmailText.should.be.a('function');
      }
    );

    it('should return Email string', () => {
      Helpers.getEmailText('http://test:3000', 'token').should.be.a('string');
    });
  });

  describe('getEmailHTML', () => {
    it('should return string', () => {
      Helpers.getEmailHtml('message').should.be.a('string');
    });
  });
});
