const Message = require('../models').Message;

module.exports = {
  create(req, res) {
    return Message
      .create({
        message: req.body.message,
        priority_level: req.body.priority_level,
        groupid: req.params.groupid,
        sentBy: req.body.sentBy,
      })
      .then(message => res.status(201).send(message))
      .catch(error => res.status(400).send(error));
  },

  retrieve(req, res) {
    return Message
      .findAll({
        where: {
          groupid: req.params.groupid,
        }
      })
      .then((user) => {
        if (user.length === 0) {
          return res.status(404).send({
            message: 'No message in this group yet'
          });
        }
        return res.status(200).send(user);
      })
      .catch(error => res.status(400).send(error));
  },
};
