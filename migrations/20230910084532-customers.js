'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Customers', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      phone: {
        type: Sequelize.STRING,
      },
      lastLogin: {
        type: Sequelize.DATE,
      },
      signupDate: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      lastDeviceInfo: {
        type: Sequelize.STRING,
      },
      confirmationCode: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      confirmed: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
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
    await queryInterface.dropTable('Customers');
  },
};
