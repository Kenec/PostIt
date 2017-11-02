'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

var _models = require('../models');

var _sendMail = require('../utils/sendMail');

var _sendMail2 = _interopRequireDefault(_sendMail);

var _sendSMS = require('../utils/sendSMS');

var _sendSMS2 = _interopRequireDefault(_sendSMS);

var _validateInput2 = require('../shared/validations/validateInput');

var _validateInput3 = _interopRequireDefault(_validateInput2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 *  Message controller functions
 */
exports.default = {

  /**
   * create - create a new message
   * @param  {object} req incoming request object
   * @param  {object} res server respose object
   * @return {json}     returns json response
   */
  create: function create(req, res) {
    if (!(req.body.message && req.body.priorityLevel && req.params.groupId && req.body.sentBy && req.body.readBy)) {
      return res.status(400).send({
        message: 'Invalid request. Some column(s) are missing'
      });
    }
    // call the validateInput input function for validations

    var _validateInput = (0, _validateInput3.default)(req.body),
        errors = _validateInput.errors,
        isValid = _validateInput.isValid;

    if (!isValid) {
      var messageError = errors.message;
      var priorityLevelError = errors.priorityLevel;
      var sentByError = errors.sentBy;
      var readByError = errors.readBy;
      res.status(400).send({
        status: messageError || priorityLevelError || sentByError || readByError
      });
    } else {
      return _models.Messages.create({
        message: req.body.message,
        priorityLevel: req.body.priorityLevel,
        groupId: req.params.groupId,
        sentBy: req.body.sentBy,
        ReadBy: req.body.readBy
      }).then(function (message) {
        _models.Groups.find({
          include: [{
            model: _models.Users,
            as: 'users',
            required: false,
            attributes: ['id', 'username', 'email', 'phone'],
            through: { attributes: [] }
          }],
          where: { id: message.groupId },
          attributes: ['id', 'groupName', 'createdby']
        }).then(function (group) {
          // send email and sms when message is delivered successfully
          if (group.length !== 0) {
            if (message.priorityLevel === 'Urgent') {
              var subject = 'PostIT Urgent Notification';
              var emailMessage = '<b>It seems you have an urgent message\n              from PostIT App</b><hr/><p>' + message.message + '</p>';
              // send mail
              (0, _sendMail2.default)(group.users, emailMessage, subject);
            } else if (message.priorityLevel === 'Critical') {
              var _subject = 'PostIT Critical Notification';
              var _emailMessage = '<b>It seems you have an urgent message\n              from PostIT App</b><hr/><p>' + message.message + '</p>';
              // send mail and sms
              (0, _sendMail2.default)(group.users, _emailMessage, _subject);
              (0, _sendSMS2.default)(group.users, message.message);
            }
            res.status(201).send({
              status: 'Message sent successfully',
              message: message.message,
              priorityLevel: message.priorityLevel,
              group: message.groupId,
              sentBy: message.sentBy,
              readBy: message.ReadBy,
              id: message.id,
              createdAt: message.createdAt
            });
          }
        }).catch(function () {
          return res.status(500).send({
            status: 'An error was encountered while trying to fetch Group'
          });
        });
      }).catch(function (error) {
        return res.status(500).send({
          error: error,
          status: 'message cannot be sent'
        });
      });
    }
  },


  /**
   * retrieve - retrieve message for a particular group
   * @param  {object} req incoming request object
   * @param  {object} res server respose object
   * @return {json}  returns json response
   */
  retrieve: function retrieve(req, res) {
    if (!req.params.groupId) {
      return res.status(400).send({
        message: 'Invalid request. groupId column is missing'
      });
    }
    return _models.Messages.findAll({
      include: [{
        model: _models.Users,
        as: 'Users',
        attributes: ['id', 'username']
      }],
      where: {
        groupId: req.params.groupId
      },
      attributes: ['id', 'message', 'priorityLevel', 'groupId', 'sentBy', 'ReadBy', 'createdAt'],
      order: [['id']]
    }).then(function (message) {
      if (message.length === 0) {
        return res.status(404).send({
          message: 'This is the start of messaging in this group!'
        });
      }

      return res.status(200).send(message);
    }).catch(function (error) {
      res.status(500).send(error);
    });
  },


  /**
   * addNotification - Add notification to the notification table when a
   * new message is sent
   * @param  {object} req incoming request object
   * @param  {object} res server respose object
   * @return {json}     returns json response
   */
  addNotification: function addNotification(req, res) {
    if (!(req.params.messageId && req.body.userId && req.body.senderId && req.body.groupId)) {
      return res.status(400).send({
        message: 'Invalid request.Some column(s) column are missing'
      });
    }
    // find a message where message id
    _models.Messages.find({
      where: {
        id: req.params.messageId
      }
    }).then(function (messageRes) {
      // if message is found, add notification
      if (messageRes.length !== 0) {
        _models.MessageReads.findAll({
          where: {
            messageId: req.params.messageId,
            userId: req.body.userId
          }
        }).then(function (result) {
          if (result.length === 0) {
            return _models.MessageReads.create({
              messageId: req.params.messageId,
              userId: req.body.userId,
              read: req.body.readStatus,
              senderId: req.body.senderId,
              groupId: req.body.groupId
            }).then(function () {
              return res.status(201).send({
                message: 'Notification Added',
                success: true
              });
            }).catch(function (error) {
              return res.status(400).send({
                error: error,
                message: 'Cannot Add Notification'
              });
            });
          }
          res.status(409).send({
            message: 'Notification already exist',
            success: false
          });
        }).catch(function (error) {
          return res.status(500).send(error);
        });
      }
    }).catch(function (error) {
      return res.status(500).send(error);
    });
  },


  /**
   * getNotification - get notification function
   * to retrieve notification for a user
   * @param  {object} req incoming request object
   * @param  {object} res server respose object
   * @return {json}     returns json response
   */
  getNotification: function getNotification(req, res) {
    return _models.MessageReads.findAll({
      include: [{
        model: _models.Messages,
        as: 'Messages',
        attributes: ['id', 'message', 'priorityLevel', 'groupId', 'sentBy', 'createdAt']
      }, {
        model: _models.Users,
        as: 'User',
        attributes: ['id', 'username', 'phone', 'email']
      }, {
        model: _models.Groups,
        as: 'Group',
        attributes: ['id', 'groupName']
      }],
      where: {
        userId: req.body.userId,
        read: 0
      },
      attributes: ['id', 'messageId', 'userId', 'groupId', 'senderId', 'read', 'createdAt']
    }).then(function (messageRes) {
      if (messageRes.length !== 0) {
        res.status(200).send({
          messageRes: messageRes
        });
      } else {
        res.status(200).send({
          messageRes: []
        });
      }
    }).catch(function (error) {
      return res.status(500).send(error);
    });
  },


  /**
   * updateNotification - update notification table when a user reads
   * the notification
   * @param  {object} req incoming request object
   * @param  {object} res server respose object
   * @return {json}     returns json response
   */
  updateNotification: function updateNotification(req, res) {
    if (!(req.params.messageId && req.body.userId)) {
      return res.status(400).send({
        message: 'Invalid request.Some column are missing'
      });
    }
    _models.Messages.find({
      where: {
        id: req.params.messageId
      }
    }).then(function (messageRes) {
      if (messageRes.length !== 0) {
        _models.MessageReads.findAll({
          where: {
            messageId: req.params.messageId,
            userId: req.body.userId
          }
        }).then(function (result) {
          if (result.length !== 0) {
            return _models.MessageReads.update({
              read: req.body.readStatus
            }, {
              where: {
                messageId: req.params.messageId,
                userId: req.body.userId
              }
            }).then(function () {
              return res.status(201).send({
                message: 'Notification Updated',
                success: true
              });
            }).catch(function (error) {
              return res.status(400).send({
                error: error,
                message: 'Cannot Update Notification'
              });
            });
          }
          res.status(404).send({
            message: 'Notification does not exist',
            success: false
          });
        }).catch(function (error) {
          return res.status(500).send(error);
        });
      }
    }).catch(function (error) {
      return res.status(500).send(error);
    });
  },


  /**
   * updateReadBy - update the ReadBy column in the message table when
   * a user clicks on the message
   * @param  {object} req incoming request object
   * @param  {object} res server respose object
   * @return {json}     returns json response
   */
  updateReadBy: function updateReadBy(req, res) {
    if (!(req.params.messageId && req.body.readBy)) {
      return res.status(400).send({
        message: 'Invalid request.Some column(s) are missing'
      });
    }
    _models.Messages.find({
      where: {
        id: req.params.messageId
      }
    }).then(function (messageRes) {
      if (messageRes.length !== 0) {
        var updatedReaders = messageRes.ReadBy + ', ' + req.body.readBy;
        var unqiueReadersArray = _underscore2.default.uniq(updatedReaders.split(','));
        return _models.Messages.update({
          ReadBy: unqiueReadersArray.toString()
        }, {
          where: {
            id: req.params.messageId
          }
        }).then(function () {
          return res.status(201).send({
            message: 'Message updated!',
            success: true
          });
        });
      }
      res.status(404).send({
        message: 'Message not found!'
      });
    }).catch(function (error) {
      return res.status(500).send(error);
    });
  },


  /**
   * getReadBy - get users who have read the message
   * from a group
   * @param  {object} req incoming request object
   * @param  {object} res server respose object
   * @return {json}     returns json response
   */
  getReadBy: function getReadBy(req, res) {
    if (!req.params.messageId) {
      return res.status(400).send({
        message: 'Invalid request.MessageId is missing'
      });
    }
    return _models.MessageReads.findAll({
      include: [{
        model: _models.Users,
        as: 'Reader',
        attributes: ['id', 'username', 'phone', 'email']
      }],
      where: {
        read: 1,
        messageId: req.params.messageId
      },
      attributes: ['id', 'messageId', 'userId', 'read', 'createdAt']
    }).then(function (messageReadUsers) {
      if (messageReadUsers.length !== 0) {
        res.status(200).send({
          messageReadUsers: messageReadUsers
        });
      } else {
        res.status(200).send({
          messageReadUsers: []
        });
      }
    }).catch(function (error) {
      return res.status(500).send(error);
    });
  }
};