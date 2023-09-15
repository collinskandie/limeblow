'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Sales', 'status', {
      type: Sequelize.STRING,
      defaultValue: 'to_deliver'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Sales', 'status');
  }
};
