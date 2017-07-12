module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isAlphanumeric: {
          msg: 'Must be an Valid String'
        },
        notEmpty: {
          msg: 'Username must not be empty'
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'password must not be empty'
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'email must not be empty'
        },
        isEmail: {
          msg: 'Not a valid Email'
        },
      },
    },
  }, {
    classMethods: {
      associate: (models) => {
        User.hasMany(models.Message);
        User.belongsToMany(models.Group);
      }
    }
  });
  return User;
};
