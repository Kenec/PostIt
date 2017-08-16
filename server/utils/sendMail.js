import nodemailer from 'nodemailer';
/**
 * sendMail - This function send Mail notifcation for PostIT
 *
 * @param  {array} userArraysOfObj An array of users
 * the group
 * @param  {string} message message to be sent
 * @return {type}                 description
 */
export default function sendMail(userArraysOfObj, message) {
  let emailReceivers = '';
  userArraysOfObj.map((user) => {
    emailReceivers = `${emailReceivers + user.email},`;
  });

  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'nnamani.kenechukwu@gmail.com',
      pass: 'jesus-mary'
    }
  });

    // setup email data with unicode symbols
  const mailOptions = {
    from: 'nnamani.kenechukwu@gmail.com', // sender address
    to: emailReceivers, // list of receivers
    subject: 'PostIT Notification', // Subject line
    html: `<b>It seems you have an urgent message
          from PostIT App</b><hr/><p>${message}</p>`
  };

    // send mail with defined transport object
  transporter.sendMail(mailOptions, (error) => {
    if (error) {
      // return console.log(error);
    }
    // console.log('Message %s sent: %s', info.messageId, info.response);
  });
}
