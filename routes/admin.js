const express = require("express");
const router = express.Router();
const Category = require("../models/Category");
const Product = require("../models/Product");

router.get("/", async (req, res) => {
  try {
    res.render("admin/index", {
      title: "Login",
      layout: "layouts/admin_layout",
    });
  } catch (error) {
    console.error(error);
    res.status(404).json(error);
  }
});
router.get("/admin_login", async (req, res) => {
  try {
    res.render("admin/admin_login", {
      title: "Login",
      layout: "layouts/admin_layout",
    });
  } catch (error) {
    console.error(error);
    res.status(404).json(error);
  }
});
router.get("/categories", async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.render("admin/categories", {
      title: "System Categories",
      layout: "layouts/admin_layout",
      categories,
    });
  } catch (error) {
    console.error(error);
    res.status(404).json(error);
  }
});
module.exports = router;
