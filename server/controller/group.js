import { Groups, userGroups } from '../models';
import validateInput from '../shared/validations/validateInput';

export default {

  /**
   * create - create Group method
   * @param  {object} req request object
   * @param  {object} res response object
   * @return {json}     returns json object as a response
   */
  create(req, res) {
    if (!(req.body.groupName && req.body.createdby)) {
      return res.status(400).send({
        message: 'Invalid request. Some column(s) are missing'
      });
    }
    // call the validateInput input function for validations
    const { errors, isValid } = validateInput(req.body);

    if (!isValid) {
      const groupError = errors.groupName;
      res.status(400).send({
        message: groupError
      });
    } else {
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
    }
  },

  /**
   * retrieve - retrieve Group method
   * @param  {object} req request object
   * @param  {object} res response object
   * @return {json} returns json object as a response
   */
  retrieve(req, res) {
    if (!(req.params.groupId)) {
      return res.status(400).send({
        message: 'Invalid request. groupId is missing'
      });
    }
    return Groups
      .findAll({
        where: { id: req.params.groupId },
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

  /**
   * fetchGroupByCreator - function to retrieve froup by its creator
   * @param  {object} req request object
   * @param  {object} res response object
   * @return {json}     returns json object as a response
   */
  fetchGroupByCreator(req, res) {
    if (!(req.body.userId)) {
      return res.status(400).send({
        message: 'Invalid request. userId is missing'
      });
    }
    return Groups
      .findAll({
        where: { createdby: req.body.userId },
        attributes: ['id', 'groupName', 'createdAt']
      })
      .then(group => res.status(200).send(group))
      .catch((error) => {
        res.status(500).send({
          error,
          message: 'Error retrieving Groups'
        });
      });
  },
};
