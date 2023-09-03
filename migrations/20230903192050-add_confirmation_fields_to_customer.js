// Inside the migration file
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Customers', 'confirmationCode', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn('Customers', 'confirmed', {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Customers', 'confirmationCode');
    await queryInterface.removeColumn('Customers', 'confirmed');
  },
};
