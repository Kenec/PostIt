import { User } from '../models';

module.exports = {
  create(req, res) {
    return User
      .create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
      })
      .then(user => res.status(201).send(user))
      .catch(error => res.status(400).send(error));
  },

  list(req, res) {
    return User
      .findOne({
        where: {
          username: req.body.username,
          password: req.body.password,
        },
      })
      .then(user => res.status(201).json(user))
      .catch(error => res.status(400).json(error));
  },
};
