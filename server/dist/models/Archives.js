'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (sequelize, DataTypes) {
  var Archives = sequelize.define('Archives', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    messageId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      refrences: {
        model: 'Messages',
        key: 'id'
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      refrences: {
        model: 'Users',
        key: 'id'
      }
    }
  });
  Archives.associate = function () {};
  return Archives;
};