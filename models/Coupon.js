const { DataTypes } = require("sequelize");
const sequelize = require("../config/db"); // Your database connection

const Coupon = sequelize.define("Coupon", {
  code: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  userEmail: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  generatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  expiryDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  timestamps: false, // Disable timestamps
});

module.exports = Coupon;
