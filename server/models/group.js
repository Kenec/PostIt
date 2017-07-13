module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define('Group', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    groupname: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Group name must not be empty'
        },
      },
    },
    createdby: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    classMethods: {
      associate: (models) => {
        Group.hasMany(models.Message, {
          onDelete: 'CASCADE'
        });
        Group.belongsToMany(models.User, {
          through: 'userGroups',
          foreignKey: 'groupid'
        });
      },
    },
  });
  return Group;
};
