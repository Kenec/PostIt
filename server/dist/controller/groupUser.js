'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _models = require('../models');

var _validateInput3 = require('../shared/validations/validateInput');

var _validateInput4 = _interopRequireDefault(_validateInput3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {

  /**
   * create - Add user to a group
   * @param  {object} req incoming request object
   * @param  {object} res response object from the server
   * @return {json}  returns json reponse
   */
  create: function create(req, res) {
    if (!(req.body.userId && req.params.groupId)) {
      return res.status(400).send({
        message: 'Invalid request. Some column(s) are missing'
      });
    }
    _models.userGroups.findAll({
      where: {
        userId: req.body.userId,
        groupId: req.params.groupId
      }
    }).then(function (result) {
      if (result.length === 0) {
        return _models.userGroups.create({
          userId: req.body.userId,
          groupId: req.params.groupId
        }).then(function () {
          return res.status(201).send({
            message: 'User Added',
            groupId: _models.userGroups.groupId,
            success: true
          });
        }).catch(function () {
          return res.status(404).send({
            message: 'Cannot add a user who does not exist to a group'
          });
        });
      }
      res.status(409).send({
        message: 'User Already Exist',
        success: false
      });
    }).catch(function (error) {
      return res.status(500).send({
        message: 'Error occured while trying to add user',
        error: error
      });
    });
  },


  /**
   * fetchUsersGroup - method to retrieve a user by username and all the
   * Groups that he belongs to
   * @param  {object} req incoming request object
   * @param  {object} res response object from the server
   * @return {json} returns json reponse
   */
  fetchUsersGroup: function fetchUsersGroup(req, res) {
    if (!req.body.username) {
      return res.status(400).send({
        message: 'Invalid request. Username is missing'
      });
    }
    // call the validateInput input function for validations

    var _validateInput = (0, _validateInput4.default)(req.body),
        errors = _validateInput.errors,
        isValid = _validateInput.isValid;

    if (!isValid) {
<<<<<<< HEAD
      res.status(400).send({
        message: errors.username
=======
      var usernameError = errors.username;
      res.status(400).send({
        message: usernameError
>>>>>>> update master with current head
      });
    } else {
      var username = req.body.username;
      return _models.Users.find({
        include: [{
          model: _models.Groups,
          as: 'groups',
          required: false,
          attributes: ['id', 'groupName'],
          through: { attributes: [] }
        }],
        where: { username: username },
        attributes: ['id', 'email', 'phone', 'username', 'createdAt']
      }).then(function (user) {
        if (user.length === 0) {
          return res.status(404).send({
            message: 'User not found'
          });
        }
        return res.status(200).send(user);
      }).catch(function (error) {
        res.status(500).send({
          error: error,
          message: 'Error occured while trying' + 'to find User\'s Group! Try Again'
        });
      });
    }
  },


  /**
<<<<<<< HEAD
   * getGroupMembers - fetch members from the same group
=======
   * fetchMembersOfGroup - fetch members from the same group
>>>>>>> update master with current head
   * @param  {object} req incoming request object
   * @param  {object} res response object from the server
   * @return {json} returns json reponse
   */
<<<<<<< HEAD
  getGroupMembers: function getGroupMembers(req, res) {
=======
  fetchMembersOfGroup: function fetchMembersOfGroup(req, res) {
>>>>>>> update master with current head
    if (!req.params.id) {
      return res.status(400).send({
        message: 'Invalid request. id is missing'
      });
    }
    var id = req.params.id;
    return _models.Groups.find({
      include: [{
        model: _models.Users,
        as: 'users',
        required: false,
        attributes: ['id', 'username', 'email', 'phone'],
        through: { attributes: [] }
      }],
      where: { id: id },
      attributes: ['id', 'groupName', 'createdby']
    }).then(function (group) {
      if (group.length === 0) {
        return res.status(404).send({
          message: 'Group not found'
        });
      }
      return res.status(200).send(group);
    }).catch(function (error) {
      res.status(500).send({
        error: error,
        message: 'Error occured while fetching members in a Group'
      });
    });
  },


  /**
   * list - list all the groups
   * @param  {object} req incoming request object
   * @param  {object} res response object from the server
   * @return {json}  returns json reponse
   */
  list: function list(req, res) {
    return _models.Groups.findAll({
      attributes: ['id', 'groupName', 'createdby']
    }).then(function (group) {
      return res.status(200).send(group);
    }).catch(function (error) {
      return res.status(500).send({
        error: error,
        message: 'Error occured while trying to find Groups'
      });
    });
  },


  /**
   * searchUser - search users by where username is LIKE $username
   * @param  {object} req incoming request object
   * @param  {object} res response object from the server
   * @return {json}     returns json reponse
   */
  searchUser: function searchUser(req, res) {
    if (!(req.body.username && req.params.offset)) {
      return res.status(400).send({
        message: 'Invalid request. Some column(s) are missing'
      });
    }
    // call the validateInput input function for validations

    var _validateInput2 = (0, _validateInput4.default)(req.body),
        errors = _validateInput2.errors,
        isValid = _validateInput2.isValid;

    if (!isValid) {
<<<<<<< HEAD
      res.status(400).send({
        message: errors.username
=======
      var usernameError = errors.username;
      res.status(400).send({
        message: usernameError
>>>>>>> update master with current head
      });
    } else {
      return _models.Users.findAndCountAll({
        offset: req.params.offset * 5,
        limit: 5,
        where: { username: { $like: '%' + req.body.username + '%' } },
        attributes: ['id', 'username', 'email', 'phone']
      }).then(function (users) {
        return res.status(200).send(users);
      }).catch(function (error) {
        return res.status(500).send({
          error: error,
          message: 'Error occured while trying to find User'
        });
      });
    }
  },


  /**
   * removeUser - remove a user from a group by the group Admin
   * @param  {object} req incoming request object
   * @param  {object} res response object from the server
   * @return {json} returns json reponse
   */
  removeUser: function removeUser(req, res) {
    var groupId = req.params.id;
    var removalAdmin = req.body.admin;
    var userToBeRemoved = req.body.user;
    if (removalAdmin && userToBeRemoved && groupId) {
      _models.Groups.find({
        where: { id: groupId, createdby: removalAdmin },
        attributes: ['id', 'groupName', 'createdby']
      }).then(function (searchResult) {
        if (searchResult) {
          if (removalAdmin !== userToBeRemoved) {
            _models.userGroups.find({
              where: { userId: userToBeRemoved, groupId: groupId },
              attributes: ['id', 'groupId', 'userId']
            }).then(function (userInGroup) {
              if (userInGroup) {
                _models.userGroups.destroy({
                  where: { userId: userToBeRemoved, groupId: groupId }
                }).then(function (deletedUser) {
                  if (deletedUser === 1) {
                    res.status(200).send({
                      message: 'User Removed From Group'
                    });
                  } else {
                    res.status(501).send({
                      message: 'User not Deleted From Group'
                    });
                  }
                }).catch(function (error) {
                  return res.status(500).send({
                    error: error,
                    message: 'Internal Server Error'
                  });
                });
              } else {
                res.status(404).send({
                  message: 'User not found!'
                });
              }
            }).catch(function (error) {
              return res.status(500).send({
                error: error
              });
            });
          } else {
            res.status(401).send({
              message: 'Cannot remove yourself from the Group you created'
            });
          }
        } else {
          res.status(401).send({
            message: 'Incomplete Action!. Only the Group Admin can remove a user'
          });
        }
      }).catch(function (error) {
        return res.status(500).send({
          error: error
        });
      });
    } else {
      res.status(400).send({
        message: 'Incomplete payload'
      });
    }
  }
};