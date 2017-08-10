import { Messages, Groups, Users } from '../models';

export default {
  create(req, res) {
    return Messages
      .create({
        message: req.body.message,
        priority_level: req.body.priority_level,
        groupId: req.params.groupid,
        sentBy: req.body.sentBy,
      })
      .then(message => res.status(201).send({
        status: 'Message sent successfully',
        message: message.message,
        priority_level: message.priority_level,
        group: message.groupId,
        sentBy: message.sentBy,
        id: message.id,
        createdAt: message.createdAt,
      }))
      .catch(error => res.status(400).send({
        status: 'message cannot be sent'
      }));
  },

  retrieve(req, res) {
    return Messages
      .findAll({
         include: [{
           model: Users,
           as: 'Users',
           attributes: ['id', 'username'],
         }],
        where: {
          groupId: req.params.groupid,
        },
        attributes: ['id', 'message','groupId','sentBy', 'createdAt']
      })
      .then((user) => {
        if (user.length === 0) {
          return res.status(404).send({
            message: 'This is the start of messaging in this group!'
          });
        }

        return res.status(200).send(user);
      })
      .catch(error => {console.log(error);res.status(400).send(error)});
  },
};
