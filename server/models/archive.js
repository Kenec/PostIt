module.exports = (sequelize, DataTypes) => {
  const Archive = sequelize.define('Archive', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    messageid: DataTypes.INTEGER,
    userid: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: ( models ) => {
        // associations can be defined here
      }
    }
  });
  return Archive;
};
