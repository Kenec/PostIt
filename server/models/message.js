export default (sequelize, DataTypes) => {
  const Messages = sequelize.define('Messages', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Message must not be empty'
        },
      },
    },
    priority_level: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Priority must not be empty'
        },
      },
    },
    groupId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'GroupId must not be empty'
        },
      },
    },
    sentBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'sentBy must not be empty'
        },
      },
    }
  }
  );
  // ,{
  //   classMethods: {
  //     associate: (models) => {
  //       Messages.belongsTo(models.Users);
  //       Messages.belongsTo(models.Groups);
  //     },
  //   },
  // });
  Messages.associate = (models) => {
    Messages.belongsTo(models.Users, {
      foreignKey: 'sentBy',
      as: 'Users',
    });
    Messages.hasMany(models.Groups,{
      foreignKey: 'groupId',
      as: 'Groups',
    });

  };
  return Messages;
};
