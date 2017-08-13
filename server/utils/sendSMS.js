
/**
 * sendSMS - description
 *
 * @param  {type} userArraysOfObj array of users info
 * @return {type}                 description
 */
export default function sendSMS(userArraysOfObj) {
  userArraysOfObj.map((user) => {
    console.log(`${user.phone} received notification`);
  });
}
