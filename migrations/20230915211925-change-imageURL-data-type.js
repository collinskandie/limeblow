"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("Dispatches", "imageURL", {
      type: Sequelize.STRING,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("Dispatches", "imageURL", {
      type: Sequelize.JSON, // Change this back to JSON if needed
    });
  },
};
