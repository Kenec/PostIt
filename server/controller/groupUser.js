import { userGroups, Groups, Users } from '../models';

export default {
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
          .then(userGroup => res.status(201).send({
            message: 'User Added',
            groupId: userGroups.groupid,
            success: true
          }))
          .catch(error => res.status(400).send({
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
      .catch(error => {
        res.status(400).send({
        message: 'User does not exist'
      })
    });
  },
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
      .catch(error => {
        res.status(400).send({
        message: 'Group does not exist'
      })
    });
  },

  //Get group by id
  retrieveMembers(req, res) {
    return userGroups
      .findAll({ where: { groupId: req.params.id } })
      .then(groups => res.status(200).send(groups))
      .catch((error) => {
        res.status(400).send(error);
      });
  },

  // list all group by its id
  list(req, res) {
    return Groups
      .findAll()
      .then(group => res.status(200).send(group))
      .catch(error => res.status(400).send(error));
  },

/** This method searches for a user from the Users DB where a user is LIKE the input field **/
  searchUser(req, res) {
    return Users.findAll({
        where: {username:  {$like: `%${req.body.username}%`}},
        attributes: ['id', 'username', 'email', 'phone'],
      })
      .then(users => res.status(200).send(users))
      .catch(error => res.status(400).send(error));
  }

};
