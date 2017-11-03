import nodemailer from 'nodemailer';

/**
 * sendMail - This function send Mail notifcation for PostIT
 * @param  {array} receivers An array of email receivers
 * @param  {string} message message to be sent
 * @param {string} subject title of the message to be sent
 * @return {boolean} returns true or false
 */
export default function sendMail(receivers, message, subject) {
  let emailReceivers = '';
  receivers.map((user) => {
    emailReceivers = `${emailReceivers + user.email},`;
    return emailReceivers;
  });

  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_NAME,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  // setup email data with unicode symbols
  const mailOptions = {
    from: process.env.EMAIL_NAME,
    to: emailReceivers,
    subject,
    html: `
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
    </div>`
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error) => {
    if (error) {
      return false;
    }
  });
  return true;
}
