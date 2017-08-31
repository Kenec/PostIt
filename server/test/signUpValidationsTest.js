// Require the dev-dependencies
import chai from 'chai';
import chaiHttp from 'chai-http';
import validateInput from '../shared/validations/signup';
// During the test the env variable is set to test
process.env.NODE_ENV = 'test';

const should = chai.should();

chai.use(chaiHttp);

describe('SignupValidation', () => {
  // Test for Signup Validation to be a function
  const data = {
    username: 'Kene',
    phone: '07038550515',
    email: 'mail@email.com',
    password: 'kene',
    repassword: 'kene'
  };
  describe('function', () => {
    it('should accept two params',
      () => {
        validateInput.should.be.a('function');
      }
    );
  });
  // Test if username validation works
  describe('Data input validations', () => {
    it('should return error if password did not match',
      () => {
        data.repassword = 'KeneM';
        validateInput(data).should.have.property('errors')
          .eql({ confirmPassword: 'Password did not match' });
        validateInput(data).should.have.property('isValid')
          .eql(false);
      }
    );
    it('should return error if invalid Email',
      () => {
        data.email = 'kene';
        validateInput(data).should.have.property('errors')
          .eql({ email: 'Email is invalid',
            confirmPassword: 'Password did not match' });
        validateInput(data).should.have.property('isValid')
          .eql(false);
      }
    );
    it('should return error if invalid Phone number',
      () => {
        data.phone = 'kene';
        validateInput(data).should.have.property('errors')
          .eql({ email: 'Email is invalid',
            confirmPassword: 'Password did not match',
            phone: 'Phone number is invalid' });
        validateInput(data).should.have.property('isValid')
          .eql(false);
      }
    );
  });
});
// just before a PR for code review
