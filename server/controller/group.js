import { Groups, userGroups } from '../models';

export default {
  // function to create group

  /**
   * create - create Group method
   *
   * @param  {object} req request object
   * @param  {object} res response object
   * @return {json}     returns json object as a response
   */
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
        .then(() => res.status(201).json({
          message: `${group.groupName} group created successfully`,
          success: true,
        }))
        .catch(error => res.status(400).send(error)))
      .catch(error => res.status(409).send({
        groupName: error.errors[0].message,
        message: 'Group Already Exists',
        success: false,
      }));
  },
  // function to retrieve group by groupid
  /**
   * retrieve - retrieve Group method
   *
   * @param  {object} req request object
   * @param  {object} res response object
   * @return {json}     returns json object as a response
   */
  retrieve(req, res) {
    return Groups
      .findAll({
        where: { id: req.params.groupid },
        attributes: ['id', 'groupName', 'createdby', 'createdAt']
      })
      .then(groups => res.status(200).send(groups))
      .catch((error) => {
        res.status(404).send({
          error,
          message: 'Group selected not found'
        });
      });
  },
  // function to fetch group by the group creator
  /**
   * fetchGroupByCreator - function to retrieve froup by its creator
   *
   * @param  {object} req request object
   * @param  {object} res response object
   * @return {json}     returns json object as a response
   */
  fetchGroupByCreator(req, res) {
    return Groups
      .findAll({
        where: { createdby: req.body.userId },
        attributes: ['id', 'groupName', 'createdAt']
      })
      .then(group => res.status(200).send(group))
      .catch((error) => {
        res.status(400).send({
          error,
          message: 'Error retrieving Groups'
        });
      });
  },
};
