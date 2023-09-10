'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Sales', {
      invoiceNumber: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
        unique: true,
      },
      itemsCount: {
        type: Sequelize.INTEGER,
      },
      totalCost: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      paymentReceipt: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      timestamp: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      user: {
        type: Sequelize.STRING,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Sales');
  },
};
