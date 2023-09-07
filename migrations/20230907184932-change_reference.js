"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("Sales", "paymentReceipt", {
      type: Sequelize.STRING,
      allowNull: true, // Change allowNull to true to allow null values
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("Sales", "paymentReceipt", {
      type: Sequelize.STRING,
      allowNull: false, // Change allowNull back to false if needed
    });
  },
};
