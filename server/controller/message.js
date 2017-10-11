import _ from 'underscore';
import { Messages, Users, Groups, MessageReads } from '../models';
import sendMail from '../utils/sendMail';
import sendSMS from '../utils/sendSMS';
/**
 *  Message controller functions
 */
export default {
  // function to create a new message

  /**
   * create - create a new message
   *
   * @param  {object} req incoming request object
   * @param  {object} res server respose object
   * @return {json}     returns json object
   */
  create(req, res) {
    return Messages
      .create({
        message: req.body.message,
        priority_level: req.body.priority_level,
        groupId: req.params.groupid,
        sentBy: req.body.sentBy,
        ReadBy: req.body.readBy
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
          // send email and sms when message is delivered successfully
          if (group.length !== 0) {
            if (message.priority_level === 'Urgent') {
              // send mail
              sendMail(group.users, message.message);
            } else if (message.priority_level === 'Critical') {
              // send mail and sms
              sendMail(group.users, message.message);
              sendSMS(group.users, message.message);
            }
            res.status(201).send({
              status: 'Message sent successfully',
              message: message.message,
              priority_level: message.priority_level,
              group: message.groupId,
              sentBy: message.sentBy,
              readBy: message.ReadBy,
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
  // get messages from a particular group
  // Message group associated to Users group with the message sender

  /**
   * retrieve - retrieve message for a particular group
   *
   * @param  {object} req incoming request object
   * @param  {object} res server respose object
   * @return {json}     returns json object
   */
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
          'id', 'message', 'priority_level',
          'groupId', 'sentBy', 'ReadBy', 'createdAt'],
        order: [['id']]
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
  // add notification to the notification table when a message is sent
  // the notification is sent to all users that belong to that particular
  // group at the moment the message is sent

  /**
   * addMessageNotification - Add notification to the notification table when a
   * new message is sent
   *
   * @param  {object} req incoming request object
   * @param  {object} res server respose object
   * @return {json}     returns json object
   */
  addMessageNotification(req, res) {
    // find a message where message id
    Messages.find({
      where: {
        id: req.params.messageid,
      }
    })
      .then((messageRes) => {
        // if message is found, add notification
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
  // get notification fom the message notification table

  /**
   * getMessageNotification - get notification
   *
   * @param  {object} req incoming request object
   * @param  {object} res server respose object
   * @return {json}     returns json object
   */
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
  // update notification table
  // this is called when a user reads message

  /**
   * updateMessageNotification - update notification table when a user reads
   * the notification
   *
   * @param  {object} req incoming request object
   * @param  {object} res server respose object
   * @return {json}     returns json object
   */
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
  // update read by column in the message table

  /**
   * updateReadBy - update the ReadBy column in the message table when
   * a user clicks on the message
   *
   * @param  {object} req incoming request object
   * @param  {object} res server respose object
   * @return {json}     returns json object
   */
  updateReadBy(req, res) {
    Messages.find({
      where: {
        id: req.params.messageid,
      }
    })
      .then((messageRes) => {
        if (messageRes.length !== 0) {
          const updatedReaders = `${messageRes.ReadBy}, ${req.body.readBy}`;
          const unqiueReadersArray = _.uniq(updatedReaders.split(','));
          return Messages
            .update({
              ReadBy: unqiueReadersArray.toString()
            }, {
              where: {
                id: req.params.messageid
              }
            })
            .then(() => res.status(201).send({
              message: 'Message updated!',
              success: true
            }));
        }
        res.status(404).send({
          message: 'Message not found!'
        });
      })
      .catch(error => res.status(400).send(error));
  },
  // get Users who have read a message from a group

  /**
   * getUsersWhoReadMessagesInGroup - get users who have read the message
   * from a group
   *
   * @param  {object} req incoming request object
   * @param  {object} res server respose object
   * @return {json}     returns json object
   */
  getUsersWhoReadMessagesInGroup(req, res) {
    return MessageReads.findAll({
      include: [
        {
          model: Users,
          as: 'Reader',
          attributes:
          ['id', 'username', 'phone', 'email'],
        }],
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
