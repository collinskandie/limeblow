// models/ReceiptItem.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Your database connection

const ReceiptItem = sequelize.define('ReceiptItem', {
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  cost: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  invoiceNumber: {
    type: DataTypes.STRING,
    allowNull: false
  },
  timestamp: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
});

module.exports = ReceiptItem;
