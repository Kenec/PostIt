'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _md = require('md5');

var _md2 = _interopRequireDefault(_md);

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

<<<<<<< HEAD
var _Helpers = require('../utils/Helpers');

var _Helpers2 = _interopRequireDefault(_Helpers);

var _models = require('../models');
=======
var _models = require('../models');

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);
>>>>>>> update master with current head

var _sendMail = require('../utils/sendMail');

var _sendMail2 = _interopRequireDefault(_sendMail);

var _validateInput6 = require('../shared/validations/validateInput');

var _validateInput7 = _interopRequireDefault(_validateInput6);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

<<<<<<< HEAD
require('dotenv').config();

=======
>>>>>>> update master with current head
exports.default = {
  /**
   * create - create a new user
   * @param  {object} req incoming request object
   * @param  {object} res server response object
   * @return {json}     returns json response
   */
  create: function create(req, res) {
    if (!(req.body.username && req.body.email && req.body.phone && req.body.password)) {
      return res.status(400).send({
        message: 'Invalid request. Some column(s) are missing'
      });
    }
    // call the validateInput input function for validations

    var _validateInput = (0, _validateInput7.default)(req.body),
        errors = _validateInput.errors,
        isValid = _validateInput.isValid;

    if (!isValid) {
<<<<<<< HEAD
      res.status(400).send({
        message: errors.username || errors.email || errors.phone || errors.password || errors.confirmPassword
=======
      var usernameError = errors.username;
      var emailError = errors.email;
      var phoneError = errors.phone;
      var passwordError = errors.password;
      var confirmPasswordError = errors.confirmPassword;
      res.status(400).send({
        message: usernameError || emailError || phoneError || passwordError || confirmPasswordError
>>>>>>> update master with current head
      });
    } else {
      _models.Users.findAll({
        where: {
<<<<<<< HEAD
          $or: [{ email: req.body.email }, { username: req.body.username }]
        }
      }).then(function (foundUser) {
        if (foundUser[0]) {
=======
          username: [req.body.username],
          password: (0, _md2.default)(req.body.password)
        }
      }).then(function (user) {
        if (user[0]) {
>>>>>>> update master with current head
          return res.status(409).send({
            message: 'User already exist'
          });
        }
        return _models.Users.create({
          username: req.body.username,
          phone: req.body.phone,
          email: req.body.email,
          password: (0, _md2.default)(req.body.password)
<<<<<<< HEAD
        }).then(function (user) {
          var token = _jsonwebtoken2.default.sign({
            id: user.id,
            username: user.username
          }, process.env.JWT_SECRET, { expiresIn: '48h' });
          res.status(201).json({
            token: token,
            message: 'User Created successfully',
            username: '' + user.username
=======
        }).then(function (aUser) {
          var token = _jsonwebtoken2.default.sign({
            id: aUser.id,
            username: aUser.username
          }, _config2.default.jwtSecret, { expiresIn: '48h' }); // expires in 48h
          res.status(201).json({
            token: token,
            message: 'User Created successfully',
            username: '' + aUser.username
>>>>>>> update master with current head
          });
        }).catch(function () {
          res.status(500).json({
            message: 'Cannot create your account due to some server error!'
          });
        });
      }).catch(function () {
        res.status(500).json({
          message: 'An error has occurred trying to search for user'
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
  signin: function signin(req, res) {
    if (!(req.body.username && req.body.password)) {
      return res.status(400).send({
        message: 'Invalid request. Some column(s) are missing'
      });
    }

    var _validateInput2 = (0, _validateInput7.default)(req.body),
        errors = _validateInput2.errors,
        isValid = _validateInput2.isValid;

    if (!isValid) {
      res.status(400).send({ message: errors.password || errors.username });
    } else {
      _models.Users.findAll({
        where: {
<<<<<<< HEAD
          username: req.body.username,
=======
          username: [req.body.username],
>>>>>>> update master with current head
          password: (0, _md2.default)(req.body.password)
        }
      }).then(function (user) {
        if (user[0]) {
          // create an authToken for the user
          var token = _jsonwebtoken2.default.sign({
            id: user[0].id,
            username: user[0].username
<<<<<<< HEAD
          }, process.env.JWT_SECRET, { expiresIn: '48h' });

          res.status(200).send({
=======
          }, _config2.default.jwtSecret, { expiresIn: '48h' }); // token expires in 48h

          res.status(202).send({
>>>>>>> update master with current head
            token: token,
            message: 'Successfully logged in',
            username: '' + user[0].username
          });
          return;
        }

<<<<<<< HEAD
        res.status(401).send({
          message: 'Invalid username or password'
        });
      }).catch(function (error) {
        res.status(500).json({
          error: error.errors.message,
=======
        res.status(404).send({
          message: 'Username not found, please register'
        });
      }).catch(function () {
        res.status(500).json({
>>>>>>> update master with current head
          message: 'An error has occurred trying to search for user'
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
  resetPassword: function resetPassword(req, res) {
    if (!req.body.email) {
      return res.status(400).send({
        message: 'Invalid request. Email column is missing'
      });
    }

    var _validateInput3 = (0, _validateInput7.default)(req.body),
        errors = _validateInput3.errors,
        isValid = _validateInput3.isValid;

    if (!isValid) {
<<<<<<< HEAD
      res.status(400).send({
        message: errors.email
=======
      var emailError = errors.email;
      res.status(400).send({
        message: emailError
>>>>>>> update master with current head
      });
    } else {
      _models.Users.findAll({ where: { email: req.body.email } }).then(function (user) {
        if (user[0]) {
          var token = _crypto2.default.randomBytes(20).toString('hex');
<<<<<<< HEAD
          var tokenExpireDate = Date.now() + 3600000;
=======
          var tokenExpireDate = Date.now() + 3600000; // expire in 1hr
>>>>>>> update master with current head
          _models.Users.update({
            resetPasswordToken: token,
            resetPasswordExpiryTime: tokenExpireDate
          }, {
            where: {
              email: req.body.email
            }
          }).then(function () {
            var emailReceiver = [{ email: req.body.email }];
            var emailSubject = 'PostIT Password Reset';
<<<<<<< HEAD
            var emailText = _Helpers2.default.getEmailText(req.headers.host, token);
            var sendStatus = (0, _sendMail2.default)(emailReceiver, emailText, emailSubject);
            if (sendStatus) {
              res.status(200).send({
                message: 'Password reset link has been sent to your email'
              });
            } else {
              res.status(500).send({
                message: 'Unable to send Link to email'
              });
=======
            var emailText = '<hr/><p>You are receiving this because you\n                (or someone else) have requested the reset of the password\n                for your account.</p>\n                <p> Please click on the following link, or paste this into\n                your browser to complete the process:</p><p>\n                <b>' + ('http://' + req.headers.host + '/recoverpassword/' + token) + '</b>\n                </p><p>If you did not request this, please ignore this email\n                and your password will remain unchanged.</p><hr/>';
            var send = (0, _sendMail2.default)(emailReceiver, emailText, emailSubject);
            if (send) {
              res.status(200).send({ message: 'Password reset link has been sent to your email' });
            } else {
              res.status(500).send({ message: 'Unable to send Link to email' });
>>>>>>> update master with current head
            }
          }).catch(function () {
            return res.status(500).send({
              message: 'Cannot send Mail! Try again'
            });
          });
        } else {
          return res.status(404).send({
            message: 'Sorry! Email address not found'
          });
        }
      }).catch(function () {
        return res.status(500).send({
          message: 'The action cannot be completed! Try again'
        });
      });
    }
  },


  /**
   * updatePassword - update user password in the db
   * @param  {object} req incoming request object
   * @param  {object} res server respose object
   * @return {json}     returns json response
   */
  updatePassword: function updatePassword(req, res) {
    if (!(req.body.password && req.body.repassword)) {
      return res.status(400).send({
        message: 'Invalid request. Some column(s) are missing'
      });
    }

    var _validateInput4 = (0, _validateInput7.default)(req.body),
        errors = _validateInput4.errors,
        isValid = _validateInput4.isValid;

    if (!isValid) {
<<<<<<< HEAD
      res.status(400).send({
        message: errors.email || errors.confirmPassword
=======
      var emailError = errors.email;
      var confirmPasswordError = errors.confirmPassword;
      res.status(400).send({
        message: emailError || confirmPasswordError
>>>>>>> update master with current head
      });
    } else {
      return _models.Users.update({
        password: (0, _md2.default)(req.body.password),
<<<<<<< HEAD
        resetPasswordToken: '',
        resetPasswordExpiryTime: ''
=======
        resetPasswordToken: '', // resetPasswordToken set to empty
        resetPasswordExpiryTime: '' // resetPasswordExpiryTime set to empty
>>>>>>> update master with current head
      }, {
        where: {
          resetPasswordToken: req.params.token
        }
      }).then(function () {
        res.status(200).send({
          message: 'Password reset successfully!'
        });
      }).catch(function (error) {
        res.status(500).send({
          error: error,
          message: 'Cannot reset password!'
        });
      });
    }
  },


  /**
   * isTokenValid - method to check if token is
   * still valid as of the time of changing password by the user
   * @param  {object} req incoming request object
   * @param  {object} res server respose object
<<<<<<< HEAD
   * @return {json} returns json response
=======
   * @return {json}     returns json response
>>>>>>> update master with current head
   */
  isTokenValid: function isTokenValid(req, res) {
    if (!req.params.token) {
      return res.status(400).send({
        message: 'Invalid request. Token column is missing'
      });
    }
    return _models.Users.findAll({
      where: {
        resetPasswordToken: req.params.token,
        resetPasswordExpiryTime: { $gt: '' + Date.now() }
      }
    }).then(function (user) {
      if (user.length !== 0) {
        res.status(200).send({
          userid: '' + user[0].id,
          username: '' + user[0].username,
          email: '' + user[0].email
        });
      } else {
        res.status(404).send({
          message: 'Token not found'
        });
      }
    }).catch(function () {
      res.status(500).send({
        message: 'Unable to search for token'
      });
    });
  },


  /**
<<<<<<< HEAD
   * getUser - method to fetch member by its username to return
   * its id
   * @param  {object} req incoming request object
   * @param  {object} res server respose object
   * @return {json} returns json response
   */
  getUser: function getUser(req, res) {
=======
   * fetchUserByName - method to fetch member by its username to return
   * its id
   * @param  {object} req incoming request object
   * @param  {object} res server respose object
   * @return {json}     returns json response
   */
  fetchUserByName: function fetchUserByName(req, res) {
>>>>>>> update master with current head
    if (!req.body.username) {
      return res.status(400).send({
        message: 'Invalid request. Username column is missing'
      });
    }

    var _validateInput5 = (0, _validateInput7.default)(req.body),
        errors = _validateInput5.errors,
        isValid = _validateInput5.isValid;

    if (!isValid) {
      res.status(400).send({ message: errors.username });
    } else {
      return _models.Users.findAll({ where: { username: req.body.username } }).then(function (user) {
        if (user[0]) {
          res.status(200).send({
            userid: '' + user[0].id,
            username: '' + user[0].username,
            phone: '' + user[0].phone,
            email: '' + user[0].email
          });
          return;
        }
        res.status(404).send({
          message: 'User not found'
        });
      }).catch(function () {
        res.status(500).send({
          message: 'Cannot search for user'
        });
      });
    }
  }
};