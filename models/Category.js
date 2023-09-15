// models/Category.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Your database connection

const Category = sequelize.define('Category', {
  id: {
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
  imageUrl: {
    type: DataTypes.STRING
  },
  createdBy: {
    type: DataTypes.STRING
  },
  timestamp: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
});

module.exports = Category;
