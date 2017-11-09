'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (sequelize, DataTypes) {
  var Users = sequelize.define('Users', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isAlphanumeric: {
          msg: 'Must be an Valid String'
        },
        notEmpty: {
          msg: 'Username must not be empty'
        }
      }
    },
    phone: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        not: ['[a-z]', 'i']
      }
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        isAlphanumeric: {
          msg: 'Must be an Valid String'
        },
        notEmpty: {
          msg: 'password must not be empty'
        }
      }
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
      validate: {
        notEmpty: {
          msg: 'email must not be empty'
        },
        isEmail: {
          msg: 'Not a valid Email'
        }
      }
    },
    resetPasswordToken: {
      type: DataTypes.STRING,
      allowNull: true
    },
    resetPasswordExpiryTime: {
      type: DataTypes.STRING,
      allowNull: true
    }
  });

  Users.associate = function (models) {
    Users.hasMany(models.Messages, {
      foreignKey: 'id',
      onDelete: 'CASCADE'
    });
    Users.belongsToMany(models.Groups, {
      through: 'userGroups',
      as: 'groups',
      foreignKey: 'userId'
    });
    Users.hasMany(models.MessageReads, {
      foreignKey: 'messageId',
      onDelete: 'CASCADE'
    });
  };

  return Users;
};