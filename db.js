const { Sequelize } = require("sequelize");
const config = require("./config/config.json");

// Create a Sequelize instance and set up the connection
const sequelize = new Sequelize(
  config.development.database, // Use the correct database based on environment
  config.development.username,
  config.development.password,
  {
    host: config.development.host,
    dialect: config.development.dialect,
    logging: false, // Set to true to log SQL queries
  }
);

// Import your Sequelize models and set up associations here
// For example:
// const Product = sequelize.import("./models/Product");
// ...

// Sync models with the database
sequelize
  .sync()
  .then(() => {
    console.log("Connected to Sequelize database");
  })
  .catch((error) => {
    console.error("Database connection error:", error);
  });

module.exports = sequelize; // Export the Sequelize instance
