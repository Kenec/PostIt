'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _models = require('../models');

var _validateInput2 = require('../shared/validations/validateInput');

var _validateInput3 = _interopRequireDefault(_validateInput2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {

  /**
   * create - create Group method
   * @param  {object} req request object
   * @param  {object} res response object
   * @return {json}     returns json object as a response
   */
  create: function create(req, res) {
    if (!(req.body.groupName && req.body.createdby)) {
      return res.status(400).send({
        message: 'Invalid request. Some column(s) are missing'
      });
    }
    // call the validateInput input function for validations

    var _validateInput = (0, _validateInput3.default)(req.body),
        errors = _validateInput.errors,
        isValid = _validateInput.isValid;

    if (!isValid) {
      var groupError = errors.groupName;
      res.status(400).send({
        message: groupError
      });
    } else {
      return _models.Groups.create({
        groupName: req.body.groupName,
        createdby: req.body.createdby
      }).then(function (group) {
        return _models.userGroups.create({
          groupId: group.id,
          userId: req.body.createdby
        }).then(function () {
          return res.status(201).json({
            message: group.groupName + ' group created successfully',
            success: true
          });
        }).catch(function (error) {
          return res.status(400).send(error);
        });
      }).catch(function (error) {
        return res.status(409).send({
          message: error.errors[0].message,
          success: false
        });
      });
    }
  },


  /**
   * retrieve - retrieve Group method
   * @param  {object} req request object
   * @param  {object} res response object
   * @return {json} returns json object as a response
   */
  retrieve: function retrieve(req, res) {
    if (!req.params.groupId) {
      return res.status(400).send({
        message: 'Invalid request. groupId is missing'
      });
    }
    return _models.Groups.findAll({
      where: { id: req.params.groupId },
      attributes: ['id', 'groupName', 'createdby', 'createdAt']
    }).then(function (groups) {
      return res.status(200).send(groups);
    }).catch(function (error) {
      res.status(404).send({
        error: error,
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
  fetchGroupByCreator: function fetchGroupByCreator(req, res) {
    if (!req.body.userId) {
      return res.status(400).send({
        message: 'Invalid request. userId is missing'
      });
    }
    return _models.Groups.findAll({
      where: { createdby: req.body.userId },
      attributes: ['id', 'groupName', 'createdAt']
    }).then(function (group) {
      return res.status(200).send(group);
    }).catch(function (error) {
      res.status(500).send({
        error: error,
        message: 'Error retrieving Groups'
      });
    });
  }
};