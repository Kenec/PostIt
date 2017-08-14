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
  };
  return MessageReads;
};
