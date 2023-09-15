const { DataTypes } = require("sequelize");
const sequelize = require("../config/db"); // Your database connection

const Sale = sequelize.define("Sale", {
  invoiceNumber: {
    type: DataTypes.STRING,
    primaryKey: true,
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
  status: {
    type: DataTypes.STRING,
    defaultValue: "to be delivered", // Default status
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
