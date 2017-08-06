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
  });
  MessageReads.associate = (models) => {

  };
  return MessageReads;
};
