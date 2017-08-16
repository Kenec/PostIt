export default (sequelize, DataTypes) => {
  const Groups = sequelize.define('Groups', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    groupName: {
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
  });
  Groups.associate = (models) => {
    Groups.belongsToMany(models.Users, {
      through: 'userGroups',
      as: 'users',
      foreignKey: 'groupId'
    });
    Groups.belongsTo(models.Messages, {
      foreignKey: 'groupId',
      onDelete: 'CASCADE',
    });
    Groups.hasMany(models.MessageReads, {
      foreignKey: 'groupId',
      onDelete: 'CASCADE',
    });
  };
  return Groups;
};
