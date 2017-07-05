'use strict';
module.exports = function(sequelize, DataTypes) {
  var group = sequelize.define('group', {
    groupid: DataTypes.INTEGER,
    groupname: DataTypes.STRING,
    createdby: DataTypes.STRING,
    members: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return group;
};