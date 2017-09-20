export default (sequelize, DataTypes) => {
  const MessageReads = sequelize.define('MessageReads', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    messageId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      refrences: {
        model: 'Messages',
        key: 'id'
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      refrences: {
        model: 'Users',
        key: 'id'
      },
    },
    senderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      refrences: {
        model: 'Users',
        key: 'id'
      },
    },
    groupId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      refrences: {
        model: 'Groups',
        key: 'id'
      },
    },
    read: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  MessageReads.associate = (models) => {
    MessageReads.belongsTo(models.Messages, {
      foreignKey: 'messageId',
      as: 'Messages'
    });
    MessageReads.belongsTo(models.Users, {
      foreignKey: 'userId',
      as: 'Reader'
    });
    MessageReads.belongsTo(models.Users, {
      foreignKey: 'senderId',
      as: 'User'
    });
    MessageReads.belongsTo(models.Groups, {
      foreignKey: 'groupId',
      as: 'Group'
    });
  };
  return MessageReads;
};
// just before a PR for code review
