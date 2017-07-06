
module.exports = (sequelize, DataTypes) => {
  const messages = sequelize.define('messages', {
    messageid: DataTypes.INTEGER,
    groupid: DataTypes.INTEGER,
    message: DataTypes.STRING,
    priority: DataTypes.STRING
  }, {
    classMethods: {
      associate: (models) => {
        messages.belongsTo(models.group);
      },
    },
  });
  return messages;
};
