// models/CustomerAddress.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Your database connection

const CustomerAddress = sequelize.define('CustomerAddress', {
  recordId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  customerId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false
  },
  geoLocation: {
    type: DataTypes.STRING
  },
  isDefault: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
});

module.exports = CustomerAddress;
