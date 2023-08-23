// models/Customer.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db'); // Your database connection

const Customer = sequelize.define('Customer', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  phone: {
    type: DataTypes.STRING
  },
  lastLogin: {
    type: DataTypes.DATE
  },
  signupDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  lastDeviceInfo: {
    type: DataTypes.STRING
  }
});

module.exports = Customer;
