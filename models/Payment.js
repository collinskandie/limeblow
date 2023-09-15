// models/Payment.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Your database connection

const Payments = sequelize.define('Payment', {
  recordId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  invoiceNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  paymentMethod: {
    type: DataTypes.STRING,
  },
  invoiceTotal: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  referenceNumber: {
    type: DataTypes.STRING,
  },
  accountNumber: {
    type: DataTypes.STRING,
    allowNull: false, // You can change this based on your requirements
  },
  timestamp: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

module.exports = Payments;
