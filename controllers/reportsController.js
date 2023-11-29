const Sale = require("../models/Sale");
const sequelize = require("../config/db"); // Make sure to import the Sequelize instance
const Transaction = require("../models/Transaction");

const salePerYear = async (req, res) => {
  try {
    const totalSales = await Sale.findAll({
      attributes: [
        [sequelize.fn("YEAR", sequelize.col("timestamp")), "year"],
        [sequelize.fn("SUM", sequelize.col("totalCost")), "totalSales"],
      ],
      group: [sequelize.fn("YEAR", sequelize.col("timestamp"))],
    });

    const salesData = totalSales.map((result) => ({
      year: result.dataValues.year,
      totalSales: result.dataValues.totalSales,
    }));

    res.status(200).json(salesData);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message });
  }
};
const recentTransactions = async (req, res) => {
  try {
    const recentTransactions = await Transaction.findAll({
      limit: 5, // Limit the number of records to 5
      order: [["createdAt", "DESC"]], // Order by the 'createdAt' column in descending order
    });

    res.status(200).json(recentTransactions);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message });
  }
};
const recentSales = async (req, res) => {
  try {
    const recentSales = await Sale.findAll({
      limit: 5, // Limit the number of records to 5
      order: [["createdAt", "DESC"]], // Order by the 'createdAt' column in descending order
    });

    res.status(200).json(recentSales);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  salePerYear,
  recentTransactions,
  recentSales,
};
