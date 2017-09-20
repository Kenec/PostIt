
import jwt from 'jsonwebtoken';
import config from '../../config';

export default (req, res, next) => {
  // let token;
  const token = req.body.token || req.query.token ||
        req.headers.Authorization || req.headers['x-access-token'];
  jwt.verify(token, config.jwtSecret, (err, authToken) => {
    if (err) {
      res.status(401)
        .send({
          message: 'Sorry, user not authenticated, invalid access token'
        });
      return;
    }
    // if authenticated with auth token,
    // save auth token and to request for use in other routes
    req.authToken = authToken;
    authToken = JSON.stringify(authToken);
    res.append('user', authToken);
    next();
  });
};

