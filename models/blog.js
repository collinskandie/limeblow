const { DataTypes } = require("sequelize");
const sequelize = require("../config/db"); 
const Blog = sequelize.define("Blog", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = Blog;
