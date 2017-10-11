import Nexmo from 'nexmo';

/**
 * sendSMS - function to send SMS to users
 *
 * @param  {array} userArraysOfObj array of users info
 * @param  {string} message message to be sent
 * @return {type}                 description
 */
export default function sendSMS(userArraysOfObj, message) {
  const nexmo = new Nexmo({
    apiKey: process.env.SMS_API_KEY,
    apiSecret: process.env.SMS_API_SECRET
  });
  userArraysOfObj.map((user) => {
    nexmo.message.sendSms('PostIT', user.phone, message, () => {});
  });
}
