'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

<<<<<<< HEAD
=======
var _config = require('../../config');

var _config2 = _interopRequireDefault(_config);

>>>>>>> update master with current head
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Middleware for protecting router using jwt
 * @param  {object} req request object
 * @param  {object} res response object
 * @param {function} next calls the next function
 * @return {json} returns json object as a response
 */
exports.default = function (req, res, next) {
<<<<<<< HEAD
  var token = req.body.token || req.query.token || req.headers.Authorization || req.headers['x-access-token'];
  if (token) {
    _jsonwebtoken2.default.verify(token, process.env.JWT_SECRET, function (err, authToken) {
=======
  // let token;
  var token = req.body.token || req.query.token || req.headers.Authorization || req.headers['x-access-token'];
  if (token) {
    _jsonwebtoken2.default.verify(token, _config2.default.jwtSecret, function (err, authToken) {
>>>>>>> update master with current head
      if (err) {
        res.status(401).send({
          message: 'Sorry, user not authenticated, invalid access token'
        });
      } else {
<<<<<<< HEAD
=======
        // if authenticated with auth token,
        // save auth token and to request for use in other routes
>>>>>>> update master with current head
        req.authToken = authToken;
        authToken = JSON.stringify(authToken);
        res.append('user', authToken);
        next();
      }
    });
  } else {
    res.status(403).send({ message: 'No token provided.' });
  }
};