// models/Dispatch.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Dispatch = sequelize.define("Dispatch", {
  invoiceNumber: {
    type: DataTypes.STRING, // Assuming invoice number is a string
    allowNull: false,
  },
  deliveryPersonName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  timestamp: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
  }, 
  imageURL: {
    type: DataTypes.STRING,
    get() {
      const images = this.getDataValue("imageURL");
      return images ? JSON.parse(images) : [];
    },
    set(images) {
      this.setDataValue("imageURL", JSON.stringify(images));
    },
  },
});

module.exports = Dispatch;
