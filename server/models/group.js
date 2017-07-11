module.exports = (sequelize, DataTypes) => {
  const group = sequelize.define('Group', {
    groupid: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    groupname: {
      type:DataTypes.STRING,
      unique: true,
      allowNull:false
    },
    createdby:{
      type:DataTypes.STRING,
      allowNull:false
    }
  }, {
    classMethods: {
      associate: (models) => {
        group.belongsTo(models.User,{
          foreignKey: 'id',
          as: 'createdby',
        });
        group.hasMany(models.message,{
          onDelete: 'CASCADE'
        });
        group.hasMany(models.member);
      },
    },
  });
  return group;
};
