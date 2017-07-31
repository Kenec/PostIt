module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Archives', {
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
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
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
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Archives')
}
