'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = sendMail;

var _nodemailer = require('nodemailer');

var _nodemailer2 = _interopRequireDefault(_nodemailer);

<<<<<<< HEAD
var _Helpers = require('../utils/Helpers');

var _Helpers2 = _interopRequireDefault(_Helpers);

=======
>>>>>>> update master with current head
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * sendMail - This function send Mail notifcation for PostIT
<<<<<<< HEAD
 * @param  {array} receivers An array of email receivers
 * @param  {string} message message to be sent
 * @param {string} subject title of the message to be sent
 * @return {boolean} returns true or false
=======
 * @param  {array} receivers An array of users
 * the group
 * @param  {string} message message to be sent
 * @param {string} subject title of the message to be sent
 * @return {boolean} returns true or false                  
>>>>>>> update master with current head
 */
function sendMail(receivers, message, subject) {
  var emailReceivers = '';
  receivers.map(function (user) {
    emailReceivers = emailReceivers + user.email + ',';
<<<<<<< HEAD
    return emailReceivers;
=======
>>>>>>> update master with current head
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
<<<<<<< HEAD
    from: process.env.EMAIL_NAME,
    to: emailReceivers,
    subject: subject,
    html: _Helpers2.default.getEmailHtml(message)
=======
    from: process.env.EMAIL_NAME, // sender address
    to: emailReceivers, // list of receivers
    subject: subject, // Subject line
    html: message
>>>>>>> update master with current head
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, function (error) {
    if (error) {
      return false;
    }
  });
  return true;
}