
export function sendSMS (userArraysOfObj) {
  userArraysOfObj.map((user) => {
    console.log(user.phone + " received notification");
  });
}
