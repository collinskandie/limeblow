// models/PaymentMethod.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Your database connection

const PaymentMethod = sequelize.define('PaymentMethod', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  methodName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  timestamp: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
});

module.exports = PaymentMethod;
