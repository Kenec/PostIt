module.exports = (sequelize, DataTypes) => {
  const message = sequelize.define('Message', {
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
        message.belongsTo(models.user,{
          foreignKey: 'id',
          as: 'sentBy',
        });
        message.belongsTo(models.group,{
          foreignKey: 'id',
          as: 'group',
        });
      },
    },
  });
  return message;
};
