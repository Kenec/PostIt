export default (sequelize, DataTypes) => {
  const userGroups = sequelize.define('userGroups', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    userid: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: {
          msg: 'Userid Must be an Integer'
        },
        notEmpty: {
          msg: 'Userid must not be empty'
        },
      },
    },
    groupid: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: {
          msg: 'Groupid Must be an Integer'
        },
        notEmpty: {
          msg: 'Groupid must not be empty'
        },
      },
    }
  }, {
    classMethods: {

    }
  });
  return userGroups;
};
