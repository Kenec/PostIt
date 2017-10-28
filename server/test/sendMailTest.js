/* global expect */
// Require the dev-dependencies
import chai from 'chai';
import chaiHttp from 'chai-http';
import mockTransport from 'nodemailer-mock-transport';
import nodemailer from 'nodemailer';
import sendMail from '../utils/sendMail';

// During the test the env variable is set to test
process.env.NODE_ENV = 'test';

const should = chai.should();

chai.use(chaiHttp);

describe('sendMail', () => {
  // Test for SMS
  describe('function', () => {
    it('should be a function',
      () => {
        sendMail.should.be.a('function');
      }
    );
    it('should send an email if all conditions are met', () => {
      const receivers = [{ user: 'nnamani.kene@gmail.com' }];
      const message = 'Hello World';
      const subject = 'Email Test';
      const transport = mockTransport({
        service: 'Gmail',
        auth: {
          user: 'Sample User',
          pass: 'Sample Password'
        }
      });
      const transporter = nodemailer.createTransport(transport);
      const mailer = sendMail(receivers, message, subject);

      mailer.should.be.equal(true);
    });
  });
});
