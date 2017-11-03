import Nexmo from 'nexmo';

/**
 * sendSMS - function to send SMS to users
 * @param  {array} receivers array of SMS receivers
 * @param  {string} message message to be sent
 * @return {void}
 */
export default function sendSMS(receivers, message) {
  const nexmo = new Nexmo({
    apiKey: process.env.SMS_API_KEY,
    apiSecret: process.env.SMS_API_SECRET
  });
  receivers.map(user =>
    nexmo.message.sendSms('PostIT', user.phone, message, () => {})
  );
}
