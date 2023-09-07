"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Payments", "accountNumber", {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Add code to define how to undo the changes made in the "up" function.
    await queryInterface.removeColumn("Payments", "accountNumber");
  },
};
