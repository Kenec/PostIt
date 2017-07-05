
module.exports =(sequelize, DataTypes) => {
  const signup = sequelize.define('signup', {
    userid: DataTypes.INTEGER,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    classMethods: {
      associate: (models) => {
        // associations can be defined here
      },
    },
  });
  return signup;
};
