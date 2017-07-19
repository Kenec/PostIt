export default (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
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
    groupid: {
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
  }, {
    classMethods: {
      associate: (models) => {
        Message.belongsTo(models.User);
        Message.belongsTo(models.Group);
      },
    },
  });
  return Message;
};
