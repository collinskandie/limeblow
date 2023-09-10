"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Create the Products table
    await queryInterface.createTable("Products", {
      productid: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
      },
      imagesurl: {
        type: Sequelize.STRING,
        get() {
          const images = this.getDataValue("imagesurl");
          return images ? JSON.parse(images) : [];
        },
        set(images) {
          this.setDataValue("imagesurl", JSON.stringify(images));
        },
      },
      cost: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      size: {
        type: Sequelize.STRING,
      },
      weight: {
        type: Sequelize.DECIMAL(10, 2),
      },
      color: {
        type: Sequelize.STRING,
      },
      availability: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      category: {
        type: Sequelize.STRING, // Adjust the data type as needed
      },
      subCategory: {
        type: Sequelize.STRING, // Adjust the data type as needed
      },
      timestamp: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedby: {
        type: Sequelize.STRING,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Drop the Products table
    await queryInterface.dropTable("Products");
  },
};
