import jwt from 'jsonwebtoken';
import md5 from 'md5';
import crypto from 'crypto';
import { Users } from '../models';
import sendMail from '../utils/sendMail';
import validateInput from '../shared/validations/validateInput';

export default {
  /**
   * create - create a new user
   * @param  {object} req incoming request object
   * @param  {object} res server response object
   * @return {json}     returns json response
   */
  create(req, res) {
    if (!(req.body.username && req.body.email
      && req.body.phone && req.body.password)) {
      return res.status(400).send({
        message: 'Invalid request. Some column(s) are missing'
      });
    }
    // call the validateInput input function for validations
    const { errors, isValid } = validateInput(req.body);

    if (!isValid) {
      const usernameError = errors.username;
      const emailError = errors.email;
      const phoneError = errors.phone;
      const passwordError = errors.password;
      const confirmPasswordError = errors.confirmPassword;
      res.status(400).send({
        message: usernameError ||
        emailError || phoneError ||
        passwordError || confirmPasswordError
      });
    } else {
      Users
        .findAll({
          where: {
            username: [req.body.username],
            password: md5(req.body.password)
          }
        })
        .then((user) => {
          if (user[0]) {
            return res.status(409).send({
              message: 'User already exist'
            });
          }
          return Users
            .create({
              username: req.body.username,
              phone: req.body.phone,
              email: req.body.email,
              password: md5(req.body.password)
            })
            .then((aUser) => {
              const token = jwt.sign({
                id: aUser.id,
                username: aUser.username
              }, process.env.JWT_SECRET, { expiresIn: '48h' });
              res.status(201).json({
                token,
                message: 'User Created successfully',
                username: `${aUser.username}`,
              });
            })
            .catch(() => {
              res.status(500).json({
                message: 'Cannot create your account due to some server error!',
              });
            });
        })
        .catch(() => {
          res.status(500).json({
            message: 'An error has occurred trying to search for user',
          });
        });
    }
  },

  /**
   * signin - logs a user in to the account
   * @param  {object} req incoming request object
   * @param  {object} res server response object
   * @return {json}     returns json response
   */
  signin(req, res) {
    if (!(req.body.username && req.body.password)) {
      return res.status(400).send({
        message: 'Invalid request. Some column(s) are missing'
      });
    }
    const { errors, isValid } = validateInput(req.body);
    if (!isValid) {
      res.status(400).send({ message: errors.password || errors.username });
    } else {
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
            }, process.env.JWT_SECRET, { expiresIn: '48h' });

            res
              .status(202)
              .send({
                token,
                message: 'Successfully logged in',
                username: `${user[0].username}`,
              });
            return;
          }

          res.status(404)
            .send({
              message: 'Username not found, please register'
            });
        }).catch(() => {
          res.status(500).json({
            message: 'An error has occurred trying to search for user',
          });
        });
    }
  },

  /**
   * resetPassword - function to reset users password
   * @param  {object} req incoming request object
   * @param  {object} res server respose object
   * @return {json}     returns json response
   */
  resetPassword(req, res) {
    if (!(req.body.email)) {
      return res.status(400).send({
        message: 'Invalid request. Email column is missing'
      });
    }
    const { errors, isValid } = validateInput(req.body);

    if (!isValid) {
      const emailError = errors.email;
      res.status(400).send({
        message: emailError
      });
    } else {
      Users.findAll({ where: { email: req.body.email } })
        .then((user) => {
          if (user[0]) {
            const token = crypto.randomBytes(20).toString('hex');
            const tokenExpireDate = Date.now() + 3600000;
            Users.update({
              resetPasswordToken: token,
              resetPasswordExpiryTime: tokenExpireDate,
            }, {
              where: {
                email: req.body.email
              }
            })
              .then(() => {
                const emailReceiver = [{ email: req.body.email }];
                const emailSubject = 'PostIT Password Reset';
                const emailText = `<hr/><p>You are receiving this because you
                (or someone else) have requested the reset of the password
                for your account.</p>
                <p> Please click on the following link, or paste this into
                your browser to complete the process:</p><p>
                <b>${`http://${req.headers.host}/recoverpassword/${token}`}</b>
                </p><p>If you did not request this, please ignore this email
                and your password will remain unchanged.</p><hr/>`;
                const send = sendMail(emailReceiver, emailText, emailSubject);
                if (send) {
                  res.status(200).send({
                    message: 'Password reset link has been sent to your email'
                  });
                } else {
                  res.status(500).send({
                    message: 'Unable to send Link to email'
                  });
                }
              })
              .catch(() => res.status(500).send({
                message: 'Cannot send Mail! Try again'
              })
              );
          } else {
            return res.status(404).send({
              message: 'Sorry! Email address not found'
            });
          }
        })
        .catch(() => res.status(500).send({
          message: 'The action cannot be completed! Try again'
        })
        );
    }
  },

  /**
   * updatePassword - update user password in the db
   * @param  {object} req incoming request object
   * @param  {object} res server respose object
   * @return {json}     returns json response
   */
  updatePassword(req, res) {
    if (!(req.body.password && req.body.repassword)) {
      return res.status(400).send({
        message: 'Invalid request. Some column(s) are missing'
      });
    }
    const { errors, isValid } = validateInput(req.body);

    if (!isValid) {
      const emailError = errors.email;
      const confirmPasswordError = errors.confirmPassword;
      res.status(400).send({
        message: emailError || confirmPasswordError
      });
    } else {
      return Users.update({
        password: md5(req.body.password),
        resetPasswordToken: '',
        resetPasswordExpiryTime: ''
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
          res.status(500).send({
            error,
            message: 'Cannot reset password!',
          });
        });
    }
  },

  /**
   * isTokenValid - method to check if token is
   * still valid as of the time of changing password by the user
   * @param  {object} req incoming request object
   * @param  {object} res server respose object
   * @return {json}     returns json response
   */
  isTokenValid(req, res) {
    if (!(req.params.token)) {
      return res.status(400).send({
        message: 'Invalid request. Token column is missing'
      });
    }
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
          res.status(404).send({
            message: 'Token not found',
          });
        }
      })
      .catch(() => {
        res.status(500).send({
          message: 'Unable to search for token',
        });
      });
  },

  /**
   * fetchUserByName - method to fetch member by its username to return
   * its id
   * @param  {object} req incoming request object
   * @param  {object} res server respose object
   * @return {json}     returns json response
   */
  fetchUserByName(req, res) {
    if (!(req.body.username)) {
      return res.status(400).send({
        message: 'Invalid request. Username column is missing'
      });
    }
    const { errors, isValid } = validateInput(req.body);
    if (!isValid) {
      res.status(400).send({ message: errors.username });
    } else {
      return Users
        .findAll({ where: { username: req.body.username } })
        .then((user) => {
          if (user[0]) {
            res
              .status(200)
              .send({
                userid: `${user[0].id}`,
                username: `${user[0].username}`,
                phone: `${user[0].phone}`,
                email: `${user[0].email}`,
              });
            return;
          }
          res.status(404).send({
            message: 'User not found',
          });
        })
        .catch(() => {
          res.status(500).send({
            message: 'Cannot search for user'
          });
        });
    }
  },
};

