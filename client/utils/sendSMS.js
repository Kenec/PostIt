import Nexmo from 'nexmo';

/**
 * sendSMS - description
 *
 * @param  {array} userArraysOfObj array of users info
 * @param  {string} message message to be sent
 * @return {type}                 description
 */
export default function sendSMS(userArraysOfObj, message) {
  const nexmo = new Nexmo({
    apiKey: '1c60dba3',
    apiSecret: '44c5683af64ddc78'
  });
  userArraysOfObj.map((user) => {
    nexmo.message.sendSms(
      'PostIT', 2347038550515, message,
      (err, responseData) => {
        if (err) {
          console.log(err);
        } else {
          console.dir(responseData);
        }
      }
    );
  });
}
