import { Group, userGroups } from '../models';

export default {
  create(req, res) {
    return Group
      .create({
        groupname: req.body.groupname,
        createdby: req.body.createdby,
      })
      .then(group => userGroups.create({
        groupid: group.id,
        userid: req.body.createdby
      })
        .then(() => res.status(201).send(group))
        .catch(error => res.status(400).send(error)))
      .catch(error => res.status(400).send(error));
  },

};
