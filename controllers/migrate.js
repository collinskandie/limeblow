const { Sequelize } = require("sequelize");
const path = require("path");
const Umzug = require("umzug"); // Import the Umzug library
const config = require("../config/config.json"); // Import your Sequelize configuration
const sequelize = new Sequelize(
  config.development.database,
  config.development.username,
  config.development.password,
  {
    host: config.development.host,
    dialect: config.development.dialect,
  }
);

async function runMigrations(req, res) {
  // Pass res as a parameter
  try {
    const umzug = new Umzug({
      storage: "sequelize",
      storageOptions: {
        sequelize,
      },
      migrations: {
        params: [sequelize.getQueryInterface(), Sequelize],
        path: path.join(__dirname, "../migrations"),
        pattern: /\.js$/,
      },
    });
    const migrations = await umzug.up();
    console.log("Migrations executed:", migrations);
    res
      .status(200)
      .json({ success: true, message: "Migrations executed successfully" });
  } catch (error) {
    console.error("Error running migrations:", error);
    return res
      .status(500)
      .json({ success: false, message: "Error running migrations" });
  } finally {
    sequelize.close();
  }
}
module.exports = {
  runMigrations,
};
