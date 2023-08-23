// models/Product.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db'); // Your database connection

const Product = sequelize.define('Product', {
  productid: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT
  },
  imagesurl: {
    type: DataTypes.ARRAY(DataTypes.STRING)
  },
  cost: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  size: {
    type: DataTypes.STRING
  },
  weight: {
    type: DataTypes.DECIMAL(10, 2)
  },
  color: {
    type: DataTypes.STRING
  },
  availability: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  timestamp: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updatedby: {
    type: DataTypes.STRING
  }
});

module.exports = Product;
