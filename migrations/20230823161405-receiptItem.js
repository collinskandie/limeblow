'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ReceiptItems', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      productId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Products', // This should be the actual table name for Products
          key: 'productid'
        }
      },
      cost: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      invoiceNumber: {
        type: Sequelize.STRING,
        allowNull: false
      },
      timestamp: {
        allowNull: false,
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    // Define any associations or indexes here
    // For example:
    // await queryInterface.addIndex('ReceiptItems', ['productId', 'invoiceNumber']);
    // await queryInterface.addConstraint('ReceiptItems', {
    //   fields: ['productId'],
    //   type: 'foreign key',
    //   name: 'fk_receiptitem_product',
    //   references: {
    //     table: 'Products',
    //     field: 'productid'
    //   },
    //   onDelete: 'cascade',
    //   onUpdate: 'cascade'
    // });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('ReceiptItems');
  }
};
