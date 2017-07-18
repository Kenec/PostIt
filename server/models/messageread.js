export default (sequelize, DataTypes) => {
  const MessageRead = sequelize.define('MessageRead', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    messageid: DataTypes.INTEGER,
    userid: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: (models) => {
        // associations can be defined here
      }
    }
  });
  return MessageRead;
};
