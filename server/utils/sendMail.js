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
    html: message
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error) => {
    if (error) {
      return false;
    }
  });
  return true;
}
