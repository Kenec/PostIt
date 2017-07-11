module.exports = (sequelize, DataTypes) => {
  const member = sequelize.define('Member', {
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    }
  }, {
    classMethods: {
      associate: (models) => {
        member.belongsTo(models.group,{
          foreignKey: 'id',
          as: 'Group',
        });
        member.belongsTo(models.user,{
          foreignKey: 'id',
          as: 'User',
        });
      }
    }
  });
  return member;
};
