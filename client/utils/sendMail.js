// import nodemailer from 'nodemailer';

export function sendMail(userArraysOfObj) {
  let emailReceivers = '';
  userArraysOfObj.map((user) => {
    emailReceivers = `${emailReceivers + user.email},`;
  });

  // create reusable transporter object using the default SMTP transport
  // let transporter = nodemailer.createTransport({
  //     //service: 'Gmail',
  //     host: 'smtp.example.com',
  //     port: 465,
  //     secure: true, // secure:true for port 465, secure:false for port 587
  //     auth: {
  //         user: 'nnamani.kenechukwu@gmail.com',
  //         pass: 'jesus-mary'
  //     }
  // });
  //
  // // setup email data with unicode symbols
  // let mailOptions = {
  //     from: 'nnamani.kenechukwu@gmail.com', // sender address
  //     to: emailReceivers, // list of receivers
  //     subject: 'PostIT Notification', // Subject line
  //     text: 'Hello world ?', // plain text body
  //     html: '<b>Hello world ?</b>' // html body
  // };
  //
  // // send mail with defined transport object
  // transporter.sendMail(mailOptions, (error, info) => {
  //     if (error) {
  //         return console.log(error);
  //     }
  //     console.log('Message %s sent: %s', info.messageId, info.response);
  // });
}
