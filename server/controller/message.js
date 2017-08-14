import { Messages, Users, Groups, MessageReads } from '../models';
import sendMail from '../utils/sendMail';
import sendSMS from '../utils/sendSMS';
/**
 *  Message controller functions
 */
export default {
  create(req, res) {
    return Messages
      .create({
        message: req.body.message,
        priority_level: req.body.priority_level,
        groupId: req.params.groupid,
        sentBy: req.body.sentBy,
      })
      .then((message) => {
        Groups.find({
          include: [{
            model: Users,
            as: 'users',
            required: false,
            attributes: ['id', 'username', 'email', 'phone'],
            through: { attributes: [] }
          }],
          where: { id: message.groupId },
          attributes: ['id', 'groupName', 'createdby']
        }).then((group) => {
          if (group.length !== 0) {
            if (message.priority_level === 'Urgent') {
              sendMail(group.users, message.message);
            } else if (message.priority_level === 'Critical') {
              sendMail(group.users, message.message);
              sendSMS(group.users, message.message);
            }
            res.status(201).send({
              status: 'Message sent successfully',
              message: message.message,
              priority_level: message.priority_level,
              group: message.groupId,
              sentBy: message.sentBy,
              id: message.id,
              createdAt: message.createdAt,
            });
          }
        }).catch();
      })
      .catch(() => res.status(400).send({
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
        attributes: [
          'id', 'message', 'priority_level', 'groupId', 'sentBy', 'createdAt']
      })
      .then((user) => {
        if (user.length === 0) {
          return res.status(404).send({
            message: 'This is the start of messaging in this group!'
          });
        }

        return res.status(200).send(user);
      })
      .catch((error) => { res.status(400).send(error); });
  },
  addMessageNotification(req, res) {
    Messages.find({
      where: {
        id: req.params.messageid,
      }
    })
      .then((messageRes) => {
        if (messageRes.length !== 0) {
          MessageReads.findAll({
            where: {
              messageId: req.params.messageid,
              userId: req.body.userId,
            },
          }).then((result) => {
            if (result.length === 0) {
              return MessageReads
                .create({
                  messageId: req.params.messageid,
                  userId: req.body.userId,
                  read: req.body.readStatus,
                  senderId: req.body.senderId,
                  groupId: req.body.groupId,
                })
                .then(() => res.status(201).send({
                  message: 'Notification Added',
                  success: true
                }))
                .catch(error => res.status(400).send({
                  error,
                  message: 'Cannot Add Notification',
                }));
            }
            res.status(400).send({
              message: 'Notification already exist',
              success: false
            });
          })
            .catch(error => res.status(400).send(error));
        }
      })
      .catch(error => res.status(400).send(error));
  },
  getMessageNotification(req, res) {
    return MessageReads.findAll({
      include: [{
        model: Messages,
        as: 'Messages',
        attributes:
        ['id', 'message', 'priority_level', 'groupId', 'sentBy', 'createdAt'],
      },
      {
        model: Users,
        as: 'User',
        attributes:
        ['id', 'username', 'phone', 'email'],
      },
      {
        model: Groups,
        as: 'Group',
        attributes:
        ['id', 'groupName'],
      }
      ],
      where: {
        userId: req.body.userId,
        read: 0
      },
      attributes: [
        'id', 'messageId', 'userId', 'groupId', 'senderId', 'read', 'createdAt']
    })
      .then((messageRes) => {
        if (messageRes.length !== 0) {
          res.status(200).send({
            messageRes
          });
        } else {
          res.status(200).send({
            messageRes: [],
          });
        }
      })
      .catch(error => res.status(400).send(error));
  },
  updateMessageNotification(req, res) {
    Messages.find({
      where: {
        id: req.params.messageid,
      }
    })
      .then((messageRes) => {
        if (messageRes.length !== 0) {
          MessageReads.findAll({
            where: {
              messageId: req.params.messageid,
              userId: req.body.userId,
            },
          }).then((result) => {
            if (result.length !== 0) {
              return MessageReads
                .update({
                  read: req.body.readStatus
                }, {
                  where: {
                    messageId: req.params.messageid,
                    userId: req.body.userId,
                  }
                })
                .then(() => res.status(201).send({
                  message: 'Notification Updated',
                  success: true
                }))
                .catch(error => res.status(400).send({
                  error,
                  message: 'Cannot Update Notification',
                }));
            }
            res.status(400).send({
              message: 'Notification does not exist',
              success: false
            });
          })
            .catch(error => res.status(400).send(error));
        }
      })
      .catch(error => res.status(400).send(error));
  },
  getUsersWhoReadMessagesInGroup(req, res) {
    return MessageReads.findAll({
      where: {
        read: 1,
        messageId: req.params.messageid
      },
      attributes: [
        'id', 'messageId', 'userId', 'read', 'createdAt']
    })
      .then((messageReadUsers) => {
        if (messageReadUsers.length !== 0) {
          res.status(200).send({
            messageReadUsers
          });
        } else {
          res.status(200).send({
            messageReadUsers: [],
          });
        }
      })
      .catch(error => res.status(400).send(error));
  },
};
