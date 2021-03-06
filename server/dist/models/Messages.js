'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (sequelize, DataTypes) {
  var Messages = sequelize.define('Messages', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Message must not be empty'
        }
      }
    },
    priorityLevel: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Priority must not be empty'
        }
      }
    },
    groupId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'GroupId must not be empty'
        }
      }
    },
    sentBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'sentBy must not be empty'
        }
      }
    },
    ReadBy: {
      type: DataTypes.STRING
    }
  });
  Messages.associate = function (models) {
    Messages.belongsTo(models.Users, {
      foreignKey: 'sentBy',
      as: 'Users'
    });
    Messages.hasMany(models.Groups, {
      foreignKey: 'groupId',
      as: 'Groups'
    });
    Messages.hasMany(models.MessageReads, {
      foreignKey: 'messageId',
      onDelete: 'CASCADE'
    });
  };
  return Messages;
};