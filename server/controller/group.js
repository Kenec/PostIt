import { Groups, userGroups } from '../models';

export default {
  create(req, res) {
    return Groups
      .create({
        groupName: req.body.groupName,
        createdby: req.body.createdby,
      })
      .then(group => userGroups.create({
        groupId: group.id,
        userId: req.body.createdby
      })
        .then(() => res.status(201).send({
          message: group.groupName+' group created successfully',
          success:true,
        }))
        .catch(error => res.status(400).send(error)))
      .catch(error => res.status(400).send({
        groupName: error.errors[0].message,
        message: 'Group Already Exists',
        success:false,
      }));
  },
  retrieve(req, res) {
    return userGroups
      .findAll({ where: { group_id: req.params.id } })
      .then(groups => res.status(200).send(groups))
      .catch((error) => {
        res.status(400).send(error);
      });
  },
  fetchGroupByCreator(req, res) {
    return Groups
      .findAll({
        where: { createdby: req.body.userId },
        attributes: ['id', 'groupName', 'createdAt']
      })
      .then(group => res.status(200).send(group))
      .catch((error) => {
        res.status(400).send(error);
      });
  },


};
