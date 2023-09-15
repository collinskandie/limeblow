"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Sales", "isDelivered");
    await queryInterface.removeColumn("Sales", "isOnTransit");
    await queryInterface.removeColumn("Sales", "isToBeDelivered");
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Sales", "isDelivered", {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    });
    await queryInterface.addColumn("Sales", "isOnTransit", {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    });
    await queryInterface.addColumn("Sales", "isToBeDelivered", {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
    });
  },
};
