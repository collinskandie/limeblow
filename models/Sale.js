const { DataTypes } = require("sequelize");
const sequelize = require("../db"); // Your database connection

const Sale = sequelize.define("Sale", {
  invoiceNumber: {
    type: DataTypes.STRING,
    primaryKey: true, // Use an existing column as the primary key
    allowNull: false,
    unique: true,
  },
  itemsCount: {
    type: DataTypes.INTEGER,
  },
  totalCost: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  paymentReceipt: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  timestamp: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  user: {
    type: DataTypes.STRING,
  },
});

module.exports = Sale;
