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
          groupName: group.groupName,
          message: 'group created successfully',
          success:true,
        }))
        .catch(error => res.status(400).send(error)))
      .catch(error => res.status(400).send({
        groupName: error.errors[0].message,
        message: 'group not created',
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
  }


};
