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
    priority_level:{
      type: DataTypes.STRING
    }
  }, {
    classMethods: {
      associate: (models) => {
        Message.belongsTo(models.User,{
          foreignKey: 'id',
          as: 'sentBy',
        });
        Message.belongsTo(models.Group,{
          foreignKey: 'id',
          as: 'group',
        });
      },
    },
  });
  return Message;
};
