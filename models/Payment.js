// models/Payment.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db'); // Your database connection

const Payment = sequelize.define('Payment', {
  recordId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  invoiceNumber: {
    type: DataTypes.STRING,
    allowNull: false
  },
  paymentMethod: {
    type: DataTypes.STRING
  },
  invoiceTotal: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  referenceNumber: {
    type: DataTypes.STRING
  },
  timestamp: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
});

module.exports = Payment;
