import { userGroups, Groups, Users } from '../models';

export default {
  // function to add a member to a group

  /**
   * create - Add user to a group
   *
   * @param  {object} req incoming request object
   * @param  {object} res response object from the server
   * @return {json}     returns json reponse
   */
  create(req, res) {
    userGroups.findAll({
      where: {
        userId: req.body.userId,
        groupId: req.params.groupid,
      },
    }).then((result) => {
      if (result.length === 0) {
        return userGroups
          .create({
            userId: req.body.userId,
            groupId: req.params.groupid,
          })
          .then(() => res.status(201).send({
            message: 'User Added',
            groupId: userGroups.groupid,
            success: true
          }))
          .catch(() => res.status(404).send({
            message: 'Cannot add a user who does not exist to a group',
          }));
      }
      res.status(409).send({
        message: 'User  Already Exist',
        success: false
      });
    })
      .catch(error => res.status(400).send({
        message: 'Error occured while trying to add user',
        error
      }));
  },

  // retreive a user and all the group he belongs to

  /**
   * fetchUsersGroup - method to retrieve a user by username and all the
   * Groups that he belongs to
   *
   * @param  {object} req incoming request object
   * @param  {object} res response object from the server
   * @return {json}     returns json reponse
   */
  fetchUsersGroup(req, res) {
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
      .catch(() => {
        res.status(400).send({
          message: 'User does not exist'
        });
      });
  },
  // function to fetch all members from the same group by the groupid

  /**
   * fetchMembersOfGroup - fetch members from the same group
   *
   * @param  {object} req incoming request object
   * @param  {object} res response object from the server
   * @return {json}     returns json reponse
   */
  fetchMembersOfGroup(req, res) {
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
      .catch(() => {
        res.status(400).send({
          message: 'Error occured while fetching members in a Group'
        });
      });
  },
  // list all groups

  /**
   * list - list all the groups
   *
   * @param  {object} req incoming request object
   * @param  {object} res response object from the server
   * @return {json}     returns json reponse
   */
  list(req, res) {
    return Groups
      .findAll({
        attributes: ['id', 'groupName', 'createdby']
      })
      .then(group => res.status(200).send(group))
      .catch(error => res.status(400).send({
        error,
        message: 'Error occured while trying to find Groups'
      }));
  },
  // search users by where username is LIKE $username

  /**
   * searchUser - search for a user
   *
   * @param  {object} req incoming request object
   * @param  {object} res response object from the server
   * @return {json}     returns json reponse
   */
  searchUser(req, res) {
    return Users.findAndCountAll({
      offset: req.params.offset * 5,
      limit: 5,
      where: { username: { $like: `%${req.body.username}%` } },
      attributes: ['id', 'username', 'email', 'phone'],
    })
      .then(users => res.status(200).send(users))
      .catch(error => res.status(400).send({
        error,
        message: 'Error occured while trying to find User'
      }));
  },

  removeUserFromGroup(req, res) {
    const groupid = req.params.id;
    const removalAdmin = req.body.admin;
    const userToBeRemoved = req.body.user;
    if (removalAdmin && userToBeRemoved && groupid) {
      Groups.find({
        where: { id: groupid, createdby: removalAdmin },
        attributes: ['id', 'groupName', 'createdby']
      })
        .then((searchResult) => {
          if (searchResult) {
            if (removalAdmin !== userToBeRemoved) {
              userGroups.find({
                where: { userId: userToBeRemoved, groupId: groupid },
                attributes: ['id', 'groupId', 'userId']
              }).then((userInGroup) => {
                if (userInGroup) {
                  userGroups.destroy({
                    where: { userId: userToBeRemoved, groupId: groupid }
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
                  error,
                  message: 'Internal Server Error'
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
          error,
          message: 'Internal Server Error'
        }));
    } else {
      res.status(400).send({
        message: 'Incomplete payload'
      });
    }
  }

};
