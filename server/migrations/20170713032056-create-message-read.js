module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('MessageReads', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    messageId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Messages',
        key: 'id',
      },
    },
    userId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    senderId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    groupId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'Groups',
        key: 'id',
      },
    },
    read: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('MessageReads')
};
