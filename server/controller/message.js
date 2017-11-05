import underscore from 'underscore';
import { Messages, Users, Groups, MessageReads } from '../models';
import sendMail from '../utils/sendMail';
import sendSMS from '../utils/sendSMS';
import validateInput from '../shared/validations/validateInput';

/**
 *  Message controller functions
 */
export default {

  /**
   * create - create a new message
   * @param  {object} req incoming request object
   * @param  {object} res server respose object
   * @return {json}     returns json response
   */
  create(req, res) {
    if (!(req.body.message && req.body.priorityLevel
      && req.params.groupId && req.body.sentBy
      && req.body.readBy)) {
      return res.status(400).send({
        message: 'Invalid request. Some column(s) are missing'
      });
    }
    // call the validateInput input function for validations
    const { errors, isValid } = validateInput(req.body);
    if (!isValid) {
      const messageError = errors.message;
      const priorityLevelError = errors.priorityLevel;
      const sentByError = errors.sentBy;
      const readByError = errors.readBy;
      res.status(400).send({
        status: messageError ||
        priorityLevelError || sentByError ||
        readByError
      });
    } else {
      return Messages
        .create({
          message: req.body.message,
          priorityLevel: req.body.priorityLevel,
          groupId: req.params.groupId,
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
              if (message.priorityLevel === 'Urgent') {
                const subject = 'PostIT Urgent Notification';
                const emailMessage = `<b>It seems you have an urgent message
              from PostIT App</b><hr/><p>${message.message}</p>`;
                // send mail
                sendMail(group.users, emailMessage, subject);
              } else if (message.priorityLevel === 'Critical') {
                const subject = 'PostIT Critical Notification';
                const emailMessage = `<b>It seems you have an urgent message
              from PostIT App</b><hr/><p>${message.message}</p>`;
                // send mail and sms
                sendMail(group.users, emailMessage, subject);
                sendSMS(group.users, message.message);
              }
              res.status(201).send({
                status: 'Message sent successfully',
                message: message.message,
                priorityLevel: message.priorityLevel,
                group: message.groupId,
                sentBy: message.sentBy,
                readBy: message.ReadBy,
                id: message.id,
                createdAt: message.createdAt,
              });
            }
          }).catch(() => res.status(500).send({
            status: 'An error was encountered while trying to fetch Group'
          }));
        })
        .catch(error => res.status(500).send({
          status: error.errors[0].message
        }));
    }
  },

  /**
   * retrieve - retrieve message for a particular group
   * @param  {object} req incoming request object
   * @param  {object} res server respose object
   * @return {json}  returns json response
   */
  retrieve(req, res) {
    if (!(req.params.groupId)) {
      return res.status(400).send({
        message: 'Invalid request. groupId column is missing'
      });
    }
    return Messages
      .findAll({
        include: [{
          model: Users,
          as: 'Users',
          attributes: ['id', 'username'],
        }],
        where: {
          groupId: req.params.groupId,
        },
        attributes: [
          'id', 'message', 'priorityLevel',
          'groupId', 'sentBy', 'ReadBy', 'createdAt'],
        order: [['id']]
      })
      .then((message) => {
        if (message.length === 0) {
          return res.status(404).send({
            message: 'This is the start of messaging in this group!'
          });
        }

        return res.status(200).send(message);
      })
      .catch((error) => { res.status(500).send(error); });
  },

  /**
   * addNotification - Add notification to the notification table when a
   * new message is sent
   * @param  {object} req incoming request object
   * @param  {object} res server respose object
   * @return {json}     returns json response
   */
  addNotification(req, res) {
    if (!(req.params.messageId
      && req.body.userId
      && req.body.senderId
      && req.body.groupId
    )) {
      return res.status(400).send({
        message: 'Invalid request.Some column(s) column are missing'
      });
    }
    // find a message where message id
    Messages.find({
      where: {
        id: req.params.messageId,
      }
    })
      .then((messageRes) => {
        // if message is found, add notification
        if (messageRes.length !== 0) {
          MessageReads.findAll({
            where: {
              messageId: req.params.messageId,
              userId: req.body.userId,
            },
          }).then((result) => {
            if (result.length === 0) {
              return MessageReads
                .create({
                  messageId: req.params.messageId,
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
            res.status(409).send({
              message: 'Notification already exist',
              success: false
            });
          })
            .catch(error => res.status(500).send(error));
        }
      })
      .catch(error => res.status(500).send(error));
  },

  /**
   * getNotification - get notification function
   * to retrieve notification for a user
   * @param  {object} req incoming request object
   * @param  {object} res server respose object
   * @return {json}     returns json response
   */
  getNotification(req, res) {
    return MessageReads.findAll({
      include: [{
        model: Messages,
        as: 'Messages',
        attributes:
        ['id', 'message', 'priorityLevel', 'groupId', 'sentBy', 'createdAt'],
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
      .catch(error => res.status(500).send(error));
  },

  /**
   * updateNotification - update notification table when a user reads
   * the notification
   * @param  {object} req incoming request object
   * @param  {object} res server respose object
   * @return {json}     returns json response
   */
  updateNotification(req, res) {
    if (!(req.params.messageId && req.body.userId)) {
      return res.status(400).send({
        message: 'Invalid request.Some column are missing'
      });
    }
    Messages.find({
      where: {
        id: req.params.messageId,
      }
    })
      .then((messageRes) => {
        if (messageRes.length !== 0) {
          MessageReads.findAll({
            where: {
              messageId: req.params.messageId,
              userId: req.body.userId,
            },
          }).then((result) => {
            if (result.length !== 0) {
              return MessageReads
                .update({
                  read: req.body.readStatus
                }, {
                  where: {
                    messageId: req.params.messageId,
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
            res.status(404).send({
              message: 'Notification does not exist',
              success: false
            });
          })
            .catch(error => res.status(500).send(error));
        }
      })
      .catch(error => res.status(500).send(error));
  },

  /**
   * updateReadBy - update the ReadBy column in the message table when
   * a user clicks on the message
   * @param  {object} req incoming request object
   * @param  {object} res server respose object
   * @return {json}     returns json response
   */
  updateReadBy(req, res) {
    if (!(req.params.messageId && req.body.readBy)) {
      return res.status(400).send({
        message: 'Invalid request.Some column(s) are missing'
      });
    }
    Messages.find({
      where: {
        id: req.params.messageId,
      }
    })
      .then((messageRes) => {
        if (messageRes.length !== 0) {
          const updatedReaders = `${messageRes.ReadBy}, ${req.body.readBy}`;
          const unqiueReadersArray = underscore.uniq(updatedReaders.split(','));
          return Messages
            .update({
              ReadBy: unqiueReadersArray.toString()
            }, {
              where: {
                id: req.params.messageId
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
      .catch(error => res.status(500).send(error));
  },

  /**
   * getReadBy - get users who have read the message
   * from a group
   * @param  {object} req incoming request object
   * @param  {object} res server respose object
   * @return {json}     returns json response
   */
  getReadBy(req, res) {
    if (!(req.params.messageId)) {
      return res.status(400).send({
        message: 'Invalid request.MessageId is missing'
      });
    }
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
        messageId: req.params.messageId
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
      .catch(error => res.status(500).send(error));
  },
};
