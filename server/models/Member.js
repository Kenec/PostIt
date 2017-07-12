module.exports = (sequelize, DataTypes) => {
  const Member = sequelize.define('Member', {
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
      associate: (models) => {
        Member.belongsTo(models.Group, {
          foreignKey: 'id',
          as: 'Group',
        });
        Member.belongsTo(models.User, {
          foreignKey: 'id',
          as: 'User',
        });
      }
    }
  });
  return Member;
};
