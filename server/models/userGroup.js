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
          msg: 'Userid Must be an Integer'
        },
        notEmpty: {
          msg: 'Userid must not be empty'
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
          msg: 'Groupid Must be an Integer'
        },
        notEmpty: {
          msg: 'Groupid must not be empty'
        },
      },
    }
  });
  return userGroups;
};
// just before a PR for code review
