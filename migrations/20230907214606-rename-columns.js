"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Rename the columns
    await queryInterface.renameColumn("sales", "items_count", "itemsCount");

    await queryInterface.renameColumn("sales", "totalcost", "totalCost");
  },

  down: async (queryInterface, Sequelize) => {
    // Revert the column names if needed
    await queryInterface.renameColumn("sales", "itemsCount", "items_count");

    await queryInterface.renameColumn("sales", "totalCost", "totalcost");
  },
};
