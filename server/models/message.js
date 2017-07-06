'use strict';
module.exports = function(sequelize, DataTypes) {
  var message = sequelize.define('message', {
    groupid: DataTypes.INTEGER,
    message: DataTypes.STRING,
    priority: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        message.hasOne(models.group)
      }
    }
  });
  return message;
};
