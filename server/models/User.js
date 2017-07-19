import { bcrypt } from 'bcrypt-nodejs';

export default (sequelize, DataTypes) => {
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
      unique: true,
      validate: {
        notEmpty: {
          msg: 'email must not be empty'
        },
        isEmail: {
          msg: 'Not a valid Email'
        },
      },
    },
  },{
    classMethods: {
      associate(models) {
        User.belongsToMany(models.Group, { through: "userGroups" });
      }
    },
    // instanceMethods: {
    //     generateHash: (password) => {
    //         return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
    //     },
    //     validPassword: (password) => {
    //         return bcrypt.compareSync(password, this.password);
    //     },
    // }
  });

  // User.associate = (models) => {
  //   User.hasMany(models.Message, {
  //     foreignKey: 'sentBy',
  //   });
  //   // User.belongsToMany(models.Group, {
  //   //   as: 'Users',
  //   //   through: 'userGroups',
  //   //   foreignKey: 'user_id',
  //   // });
  // };

  return User;
};
