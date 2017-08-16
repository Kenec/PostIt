import jwt from 'jsonwebtoken';
import md5 from 'md5';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import { Users } from '../models';
import config from '../config';
import validateInput from '../shared/validations/signup';

export default {
  // function to create a new user
  create(req, res) {
    // call the validateInput input function for validations
    const { errors, isValid } = validateInput(req.body);

    if (!isValid) {
      res.status(400).json(errors);
    }
    return Users
      .create({
        username: req.body.username,
        phone: req.body.phone,
        email: req.body.email,
        password: md5(req.body.password)
      })
      .then(user => res.status(201).json({
        message: 'User Created successfully',
        success: true,
        username: user.username,
        email: user.email
      }))
      .catch(() => {
        res.status(400).json({
          message: 'Account Already Exists!',
          success: false
        });
      });
  },
  // function for loggging a user in
  list(req, res) {
    Users
      .findAll({
        where: {
          username: [req.body.username],
          password: md5(req.body.password)
        }
      })
      .then((user) => {
        if (user[0]) {
          // create an authToken for the user
          const token = jwt.sign({
            id: user[0].id,
            username: user[0].username
          }, config.jwtSecret, { expiresIn: '2h' }); // token expires in 2h

          res
            .status(202)
            .send({
              token,
              message: 'Successfully logged in',
              username: `${user[0].username}`,
              success: true,
            });
          return;
        }

        res.status(401)
          .send({
            message: 'Username not found, please register'
          });
      });
  },
  // function to reset password
  resetPassword(req, res) {
    Users.findAll({ where: { email: req.body.email } })
      .then((user) => {
        if (user[0]) {
          const token = crypto.randomBytes(20).toString('hex');
          const tokenExpireDate = Date.now() + 3600000; // expire in 1hr
          Users.update({
            resetPasswordToken: token,
            resetPasswordExpiryTime: tokenExpireDate,
          }, {
            where: {
              email: req.body.email
            }
          })
            .then(() => {
              // create reusable transporter
              // object using the default SMTP transport
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
                to: req.body.email, // list of receivers
                subject: 'PostIT Password Reset', // Subject line
                text:
               `You are receiving this because you (or someone else)
                have requested the reset of the password for your account.
                \n\n
                Please click on the following link, or paste this into
                your browser to complete the process:
                \n\n ${`http://${req.headers.host}/recoverpassword/${token}`}
                If you did not request this, please ignore this email
                and your password will remain unchanged.\n`

              };
              transporter.sendMail(mailOptions, (error) => {
                if (error) {
                  return res.status(400).send(
                    { message: 'Unable to send Link to email' });
                }
                return res.status(200).send(
                  { message: 'Password reset link has been sent to your email'
                  });
              });
            })
            .catch(() => res.status(400).send({
              message: 'Cannot send Mail'
            })
            );
        } else {
          return res.status(400).send({
            message: 'Invalid email address!'
          });
        }
      })
      .catch(() => res.status(400).send({
        message: 'Error !!'
      })
      );
  },
  // update password function
  updatePassword(req, res) {
    return Users.update({
      password: md5(req.body.password),
      resetPasswordToken: '', // resetPasswordToken set to empty
      resetPasswordExpiryTime: '' // resetPasswordExpiryTime set to empty
    }, {
      where: {
        resetPasswordToken: req.params.token
      }
    })
      .then(() => {
        res.status(200).send({
          message: 'Password reset successfully!'
        });
      })
      .catch((error) => {
        res.status(400).send({
          error,
          message: 'Cannot reset password!',
        });
      });
  },

  // check token passed and the one in the database. Return success
  // if token is valid and error if token is not valid
  checkValidTokenForPasswordReset(req, res) {
    return Users
      .findAll({
        where: {
          resetPasswordToken: req.params.token,
          resetPasswordExpiryTime: { $gt: `${Date.now()}` }
        }
      })
      .then((user) => {
        if (user.length !== 0) {
          res.status(200).send({
            userid: `${user[0].id}`,
            username: `${user[0].username}`,
            email: `${user[0].email}`,
          });
        } else {
          res.status(400).send({
            message: 'Token not found',
          });
        }
      })
      .catch(() => {
        res.status(400).send({
          message: 'Unable to search for token',
        });
      });
  },
  // Fetch Member by username and return its id
  FetchMemberByName(req, res) {
    return Users
      .findAll({ where: { username: req.body.username } })
      .then((user) => {
        if (user[0]) {
          res
            .status(202)
            .send({
              userid: `${user[0].id}`,
              username: `${user[0].username}`,
              phone: `${user[0].phone}`,
              email: `${user[0].email}`,
            });
          return;
        }
        res.status(400).send({
          message: 'User not found',
        });
      })
      .catch(() => {
        res.status(400).send({
          message: 'User does not exist'
        });
      });
  },
  // get All users I have in the database
  getAllUsers(req, res) {
    return Users
      .findAll()
      .then(users => res.status(200).send(users))
      .catch(error => res.status(400).send(error));
  },

};
