'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Sales', {
      invoicenumber: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
      },
      items_count: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      totalcost: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      paymentreciept: {
        type: Sequelize.STRING
      },
      timestamp: {
        allowNull: false,
        type: Sequelize.DATE
      },
      user: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    // Define any associations or indexes here
    // For example:
    // await queryInterface.addIndex('Sales', ['user']);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Sales');
  }
};
