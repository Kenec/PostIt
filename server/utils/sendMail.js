// import nodemailer from 'nodemailer';
/**
 * sendMail - This function send Mail notifcation for PostIT
 *
 * @param  {type} userArraysOfObj An array of users info
 * @return {type}                 description
 */
export default function sendMail(userArraysOfObj) {
  let emailReceivers = '';
  userArraysOfObj.map((user) => {
    emailReceivers = `${emailReceivers + user.email},`;
  });
console.log(emailReceivers);

  // // create reusable transporter object using the default SMTP transport
  // const transporter = nodemailer.createTransport({
  //   // service: 'Gmail',
  //   host: 'smtp.example.com',
  //   port: 465,
  //   secure: true, // secure:true for port 465, secure:false for port 587
  //   auth: {
  //     user: 'nnamani.kenechukwu@andela.com',
  //     pass: 'jesus-mary'
  //   }
  // });
  //
  // // setup email data with unicode symbols
  // const mailOptions = {
  //   from: 'nnamani.kenechukwu@andela.com', // sender address
  //   to: emailReceivers, // list of receivers
  //   subject: 'PostIT Notification', // Subject line
  //   text: 'Hello world ?', // plain text body
  //   html: '<b>Hello world ?</b>' // html body
  // };
  //
  // // send mail with defined transport object
  // transporter.sendMail(mailOptions, (error, info) => {
  //   if (error) {
  //     return console.log(error);
  //   }
  //   console.log('Message %s sent: %s', info.messageId, info.response);
  // });
}
