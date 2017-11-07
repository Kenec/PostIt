/**
 * @class Helpers
 */
export default class Helpers {
  /**
   * @method getEmailText
   * @param {string} host
   * @param {string} token
   * @return {string} email body
   */
  static getEmailText(host, token) {
    return (`
    <hr/><p>You are receiving this because you
    (or someone else) have requested the reset of the password
    for your account.</p>
    <p> Please click on the reset password below to change your password</p>
    <p style="align: center"> <a
    href="${`http://${host}/recoverpassword/${token}`}">
    <button style="border-radius: 0px; border: 0;
    background: none; box-shadow: none; background-color: #31708f;
    align: center; color: white; font-size: 26px;">
    RESET PASSWORD </button></a></p><hr/>
    <p style="color: black; font-size: 12px;">If you did not request this,
    please ignore this email and your password will remain unchanged.</p><hr/>
    `);
  }
  /**
   * @method getEmailHtml
   * @param {string} message
   * @return {string} email body
   */
  static getEmailHtml(message) {
    return (`
    <div style="width: 100%; height:100%;">
    <div style=" background-color: #d3d3d3;
    padding: 20px 0px 0px 20px; height: 50px">
      <img src="https://postit-lite.herokuapp.com/dist/1c64eafe95f643b0b131e5e2384513d4.png"
      width="40px"; height="40px" style="float: left" />
      <strong style="color:#31708f; font-size: 20px">POSTIT</strong>
    </div>
    <div style="padding: 35px">
      <div style="font-size:18px;  text-align: center; color:#31708f">
        ${message}
      </div>
    </div>
      <div style="position:absolute; background-color: #d3d3d3; 
      height: 40px; width: 100%; bottom: 10px; color:#31708f ">
        <div style="text-align: center; padding-top: 10px">
        Copyright © 2017
        </div>
      </div>
  </div>`);
  }
}
