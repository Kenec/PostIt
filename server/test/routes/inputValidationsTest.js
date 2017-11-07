import chai from 'chai';
import chaiHttp from 'chai-http';
import mockData from '../mockData.json';
import validateInput from '../../shared/validations/validateInput';

process.env.NODE_ENV = 'test';

chai.use(chaiHttp);

describe('inputValidation', () => {
  const { validInput, invalidInput } = mockData.inputData;
  const data = {
    email: validInput.email,
    phone: validInput.phone,
    sentBy: validInput.sentBy,
    readBy: validInput.readBy,
    username: validInput.username,
    password: validInput.password,
    repassword: validInput.repassword,
  };
  describe('function', () => {
    it('should accept two params',
      () => {
        validateInput.should.be.a('function');
      }
    );
  });
  describe('Data input validations', () => {
    it('should return error if password did not match',
      () => {
        data.repassword = invalidInput.repassword;
        validateInput(data).should.have.property('errors')
          .eql({ confirmPassword: 'Password did not match' });
        validateInput(data).should.have.property('isValid')
          .eql(false);
      }
    );
    it('should return error if invalid Email',
      () => {
        data.email = invalidInput.email;
        validateInput(data).should.have.property('errors')
          .eql({ email: 'Email is invalid',
            confirmPassword: 'Password did not match' });
        validateInput(data).should.have.property('isValid')
          .eql(false);
      }
    );
    it('should return error if invalid Phone number',
      () => {
        data.phone = invalidInput.phone;
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
