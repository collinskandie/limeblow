const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/db"); // Import your Sequelize instance

class Transaction extends Model {}

Transaction.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    trans_id: {
      type: DataTypes.STRING,
    },
    trans_date: {
      type: DataTypes.DATE,
    },
  },
  {
    sequelize, // Pass your Sequelize instance
    modelName: "Transaction", // Specify the model name
    timestamps: true, // Enable timestamps (createdAt and updatedAt)
    underscored: true, // Use underscored naming for columns (e.g., created_at)
    tableName: "transaction", // Optional, specify the table name
  }
);
module.exports = Transaction;
