
module.exports = (sequelize, DataTypes) => {
  const group = sequelize.define('group', {
    groupid: DataTypes.INTEGER,
    groupname: DataTypes.STRING,
    createdby: DataTypes.STRING,
    members: DataTypes.STRING
  }, {
    classMethods: {
      associate: (models) => {
        group.hasMany(models.messages);
      },
    },
  });
  return group;
};
