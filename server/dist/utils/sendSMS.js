'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = sendSMS;

var _nexmo = require('nexmo');

var _nexmo2 = _interopRequireDefault(_nexmo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * sendSMS - function to send SMS to users
 * @param  {array} receivers array of SMS receivers
 * @param  {string} message message to be sent
 * @return {void}
 */
function sendSMS(receivers, message) {
  var nexmo = new _nexmo2.default({
    apiKey: process.env.SMS_API_KEY,
    apiSecret: process.env.SMS_API_SECRET
  });
  receivers.map(function (user) {
    return nexmo.message.sendSms('PostIT', user.phone, message, function () {});
  });
}