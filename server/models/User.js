module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    username: {
      type:DataTypes.STRING,
      unique: true,
      allowNull:false
    },
    password:{
      type:DataTypes.STRING
    },
    email: {
      type:DataTypes.STRING
    }
  }, {
    classMethods: {
      associate: (models) => {
        User.hasMany(models.Message);
      }
    }
  });
  return User;
};
