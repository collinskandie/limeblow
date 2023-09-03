// models/Customer.js
const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const bcrypt = require("bcrypt");

const Customer = sequelize.define("Customer", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  phone: {
    type: DataTypes.STRING,
  },
  lastLogin: {
    type: DataTypes.DATE,
  },
  signupDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  lastDeviceInfo: {
    type: DataTypes.STRING,
  },
  confirmationCode: {
    type: DataTypes.STRING, // Add the field for the one-time code
    allowNull: true, // Allow it to be null until it's generated
  },
  confirmed: {
    type: DataTypes.BOOLEAN, // Add the field for confirmation status
    defaultValue: false, // Set it to false by default
  },
  password: {
    type: DataTypes.STRING, // Add the field for the password
    allowNull: false, // Make it required
  },
});

// Hash the password before saving it to the database
Customer.beforeCreate(async (user) => {
  const saltRounds = 10; // Number of salt rounds for bcrypt
  if (user.password) {
    const hashedPassword = await bcrypt.hash(user.password, saltRounds);
    user.password = hashedPassword;
  }
});

// Compare a plain text password with the hashed password in the database
Customer.prototype.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

module.exports = Customer;
