module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    message: {
      type: DataTypes.TEXT
    },
    priority_level: {
      type: DataTypes.STRING
    },
    groupid: {
      type: DataTypes.INTEGER
    },
    sentBy: {
      type: DataTypes.INTEGER
    }
  }, {
    classMethods: {
      associate: (models) => {
        Message.belongsTo(models.User);
        Message.belongsTo(models.Group);
      },
    },
  });
  return Message;
};
