// models/Transaction.js

const Sequelize = require("sequelize");
const db = require("../config/db"); // Your database connection

const Transaction = db.define("transaction", {
  status: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  phone: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  amount: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
  },
  trans_id: {
    type: Sequelize.STRING,
  },
  trans_date: {
    type: Sequelize.DATE,
  },
});

module.exports = Transaction;
