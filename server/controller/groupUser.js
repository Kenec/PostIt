import { userGroups, Groups, Users } from '../models';
import validateInput from '../shared/validations/validateInput';

export default {

  /**
   * create - Add user to a group
   * @param  {object} req incoming request object
   * @param  {object} res response object from the server
   * @return {json}  returns json reponse
   */
  create(req, res) {
    if (!(req.body.userId && req.params.groupId)) {
      return res.status(400).send({
        message: 'Invalid request. Some column(s) are missing'
      });
    }
    userGroups.findAll({
      where: {
        userId: req.body.userId,
        groupId: req.params.groupId,
      },
    }).then((result) => {
      if (result.length === 0) {
        return userGroups
          .create({
            userId: req.body.userId,
            groupId: req.params.groupId,
          })
          .then(() => res.status(201).send({
            message: 'User Added',
            groupId: userGroups.groupId,
            success: true
          }))
          .catch(() => res.status(404).send({
            message: 'Cannot add a user who does not exist to a group',
          }));
      }
      res.status(409).send({
        message: 'User Already Exist',
        success: false
      });
    })
      .catch(error => res.status(500).send({
        message: 'Error occured while trying to add user',
        error
      }));
  },

  /**
   * fetchUsersGroup - method to retrieve a user by username and all the
   * Groups that he belongs to
   * @param  {object} req incoming request object
   * @param  {object} res response object from the server
   * @return {json} returns json reponse
   */
  fetchUsersGroup(req, res) {
    if (!(req.body.username)) {
      return res.status(400).send({
        message: 'Invalid request. Username is missing'
      });
    }
    // call the validateInput input function for validations
    const { errors, isValid } = validateInput(req.body);

    if (!isValid) {
      res.status(400).send({
        message: errors.username
      });
    } else {
      const username = req.body.username;
      return Users
        .find({
          include: [{
            model: Groups,
            as: 'groups',
            required: false,
            attributes: ['id', 'groupName'],
            through: { attributes: [] }
          }],
          where: { username },
          attributes: ['id', 'email', 'phone', 'username', 'createdAt']
        })
        .then((user) => {
          if (user.length === 0) {
            return res.status(404).send({
              message: 'User not found'
            });
          }
          return res.status(200).send(user);
        })
        .catch((error) => {
          res.status(500).send({
            error,
            message: 'Error occured while trying' +
            'to find User\'s Group! Try Again'
          });
        });
    }
  },

  /**
   * getGroupMembers - fetch members from the same group
   * @param  {object} req incoming request object
   * @param  {object} res response object from the server
   * @return {json} returns json reponse
   */
  getGroupMembers(req, res) {
    if (!(req.params.id)) {
      return res.status(400).send({
        message: 'Invalid request. id is missing'
      });
    }
    const id = req.params.id;
    return Groups
      .find({
        include: [{
          model: Users,
          as: 'users',
          required: false,
          attributes: ['id', 'username', 'email', 'phone'],
          through: { attributes: [] }
        }],
        where: { id },
        attributes: ['id', 'groupName', 'createdby']
      })
      .then((group) => {
        if (group.length === 0) {
          return res.status(404).send({
            message: 'Group not found'
          });
        }
        return res.status(200).send(group);
      })
      .catch((error) => {
        res.status(500).send({
          error,
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
  list(req, res) {
    return Groups
      .findAll({
        attributes: ['id', 'groupName', 'createdby']
      })
      .then(group => res.status(200).send(group))
      .catch(error => res.status(500).send({
        error,
        message: 'Error occured while trying to find Groups'
      }));
  },

  /**
   * searchUser - search users by where username is LIKE $username
   * @param  {object} req incoming request object
   * @param  {object} res response object from the server
   * @return {json}     returns json reponse
   */
  searchUser(req, res) {
    if (!(req.body.username && req.params.offset)) {
      return res.status(400).send({
        message: 'Invalid request. Some column(s) are missing'
      });
    }
    // call the validateInput input function for validations
    const { errors, isValid } = validateInput(req.body);

    if (!isValid) {
      res.status(400).send({
        message: errors.username
      });
    } else {
      return Users.findAndCountAll({
        offset: req.params.offset * 5,
        limit: 5,
        where: { username: { $like: `%${req.body.username}%` } },
        attributes: ['id', 'username', 'email', 'phone'],
      })
        .then(users => res.status(200).send(users))
        .catch(error => res.status(500).send({
          error,
          message: 'Error occured while trying to find User'
        }));
    }
  },

  /**
   * removeUser - remove a user from a group by the group Admin
   * @param  {object} req incoming request object
   * @param  {object} res response object from the server
   * @return {json} returns json reponse
   */
  removeUser(req, res) {
    const groupId = req.params.id;
    const removalAdmin = req.body.admin;
    const userToBeRemoved = req.body.user;
    if (removalAdmin && userToBeRemoved && groupId) {
      Groups.find({
        where: { id: groupId, createdby: removalAdmin },
        attributes: ['id', 'groupName', 'createdby']
      })
        .then((searchResult) => {
          if (searchResult) {
            if (removalAdmin !== userToBeRemoved) {
              userGroups.find({
                where: { userId: userToBeRemoved, groupId },
                attributes: ['id', 'groupId', 'userId']
              }).then((userInGroup) => {
                if (userInGroup) {
                  userGroups.destroy({
                    where: { userId: userToBeRemoved, groupId }
                  })
                    .then((deletedUser) => {
                      if (deletedUser === 1) {
                        res.status(200).send({
                          message: 'User Removed From Group'
                        });
                      } else {
                        res.status(501).send({
                          message: 'User not Deleted From Group'
                        });
                      }
                    })
                    .catch(error => res.status(500).send({
                      error,
                      message: 'Internal Server Error'
                    }));
                } else {
                  res.status(404).send({
                    message: 'User not found!'
                  });
                }
              })
                .catch(error => res.status(500).send({
                  error
                }));
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
        })
        .catch(error => res.status(500).send({
          error
        }));
    } else {
      res.status(400).send({
        message: 'Incomplete payload'
      });
    }
  }

};
