'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Payments', {
      recordId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      invoiceNumber: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      paymentMethod: {
        type: Sequelize.STRING,
      },
      invoiceTotal: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      referenceNumber: {
        type: Sequelize.STRING,
      },
      accountNumber: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      timestamp: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
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
    await queryInterface.dropTable('Payments');
  },
};

