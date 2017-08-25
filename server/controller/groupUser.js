import { userGroups, Groups, Users } from '../models';

export default {
  // function to add a member to a group
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
          .catch(() => res.status(400).send({
            message: 'Cannot add a user who does not exist to a group',
          }));
      }
      res.status(400).send({
        message: 'User  Already Exist',
        success: false
      });
    })
      .catch(error => res.status(400).send(error));
  },

  // retreive a user and all the group he belongs to
  fetchUserAndGroup(req, res) {
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
          message: 'Group does not exist'
        });
      });
  },
  // list all groups
  list(req, res) {
    return Groups
      .findAll({
        attributes: ['id', 'groupName', 'createdby']
      })
      .then(group => res.status(200).send(group))
      .catch(error => res.status(400).send(error));
  },
  // search users by where username is LIKE $username
  searchUser(req, res) {
    return Users.findAll({
      offset: req.params.offset * 5,
      limit: 5,
      where: { username: { $like: `%${req.body.username}%` } },
      attributes: ['id', 'username', 'email', 'phone'],
    })
      .then(users => res.status(200).send(users))
      .catch(error => res.status(400).send(error));
  }

};
