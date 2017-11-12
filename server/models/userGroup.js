export default (sequelize, DataTypes) => {
  const userGroups = sequelize.define('userGroups', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      refrences: {
        model: 'Users',
        key: 'id'
      },
      validate: {
        isInt: {
          msg: 'UserId Must be an Integer'
        },
        notEmpty: {
          msg: 'UserId must not be empty'
        },
      },
    },
    groupId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      refrences: {
        model: 'Groups',
        key: 'id'
      },
      validate: {
        isInt: {
          msg: 'GroupId Must be an Integer'
        },
        notEmpty: {
          msg: 'GroupId must not be empty'
        },
      },
    }
  });
  return userGroups;
};
