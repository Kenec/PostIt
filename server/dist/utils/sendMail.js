'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = sendMail;

var _nodemailer = require('nodemailer');

var _nodemailer2 = _interopRequireDefault(_nodemailer);

var _Helpers = require('../utils/Helpers');

var _Helpers2 = _interopRequireDefault(_Helpers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * sendMail - This function send Mail notifcation for PostIT
 * @param  {array} receivers An array of email receivers
 * @param  {string} message message to be sent
 * @param {string} subject title of the message to be sent
 * @return {boolean} returns true or false
 */
function sendMail(receivers, message, subject) {
  var emailReceivers = '';
  receivers.map(function (user) {
    emailReceivers = emailReceivers + user.email + ',';
    return emailReceivers;
  });

  // create reusable transporter object using the default SMTP transport
  var transporter = _nodemailer2.default.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_NAME,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  // setup email data with unicode symbols
  var mailOptions = {
    from: process.env.EMAIL_NAME,
    to: emailReceivers,
    subject: subject,
    html: _Helpers2.default.getEmailHtml(message)
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, function (error) {
    if (error) {
      return false;
    }
  });
  return true;
}