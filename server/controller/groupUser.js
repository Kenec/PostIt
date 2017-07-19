import { userGroups, Group } from '../models';

export default {
  create(req, res) {
    userGroups.findAll({
      where: {
        userid: req.body.userid,
        groupid: req.params.groupid,
      },
    }).then((result) => {
      if (result.length === 0) {
        return userGroups
          .create({
            userid: req.body.userid,
            groupid: req.params.groupid,
          })
          .then(userGroup => res.status(201).send({
            message: 'User Added',
            groupid: userGroup.groupid,
            success: true
          }))
          .catch(error => res.status(400).send(error));
      }
      res.status(400).send({
        message: 'User  Already Exist',
        success: false
      });
    })
      .catch(error => res.status(400).send(error));
  },

  // retreive group by its id
  retrieve(req, res) {
    return Group
      .findById(req.params.groupid, {
        // include: [{
        //   model:Group,
        //   //all: true,
        // }]
      })
      .then((user) => {
        if (user.length === 0) {
          return res.status(404).send({
            message: 'Group not found'
          });
        }
        return res.status(200).send(user);
      })
      .catch(error => res.status(400).send(error));
  },

  // list all group by its id
  list(req, res) {
    return Group
      .findAll()
      .then(group => res.status(200).send(group))
      .catch(error => res.status(400).send(error));
  },


};
