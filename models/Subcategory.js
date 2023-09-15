// models/Subcategory.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Your database connection

const Subcategory = sequelize.define('Subcategory', {
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
  timestamp: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  createdBy: {
    type: DataTypes.STRING
  }
});

module.exports = Subcategory;
