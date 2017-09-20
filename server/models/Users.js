export default (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
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
    phone: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        not: ['[a-z]', 'i']
      }
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
        }
      }
    },
    resetPasswordToken: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    resetPasswordExpiryTime: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  }
  );

  Users.associate = (models) => {
    Users.hasMany(models.Messages, {
      foreignKey: 'id',
      onDelete: 'CASCADE',
    });
    Users.belongsToMany(models.Groups, {
      through: 'userGroups',
      as: 'groups',
      foreignKey: 'userId',
    });
    Users.hasMany(models.MessageReads, {
      foreignKey: 'messageId',
      onDelete: 'CASCADE',
    });
  };

  return Users;
};
// just before a PR for code review
