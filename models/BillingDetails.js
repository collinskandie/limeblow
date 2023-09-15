const { DataTypes } = require("sequelize");
const sequelize = require('../config/db'); // Import your Sequelize instance

const BillingDetails = sequelize.define("BillingDetails", {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  country: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  streetAddress: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  apartment: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  state: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  postcode: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: true, // Accepts null for userId
  },
  defaultPayment: {
    type: DataTypes.STRING, // Assuming it's a string value
    allowNull: true, // Adjust as needed
  },
});

module.exports = BillingDetails;
