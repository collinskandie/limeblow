const express = require("express");
const router = express.Router();
const Category = require("../models/Category");
const Product = require("../models/Product");
const Subcategory = require("../models/Subcategory");
const Blog = require("../models/blog");
const Sale = require("../models/Sale");

router.get("/", async (req, res) => {
  try {
    res.render("admin/index", {
      title: "Dashboard",
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
router.get("/subcategories", async (req, res) => {
  try {
    const subcategories = await Subcategory.findAll();
    res.render("admin/subcategories", {
      title: "System subcategories",
      layout: "layouts/admin_layout",
      subcategories,
    });
  } catch (error) {
    console.error(error);
    res.status(404).json(error);
  }
});
router.get("/list-products", async (req, res) => {
  try {
    const productlist = await Product.findAll();
    const subcategories = await Subcategory.findAll();
    const categories = await Category.findAll();
    res.render("admin/productlist", {
      title: "System Products",
      layout: "layouts/admin_layout",
      productlist,
      subcategories,
      categories,
    });
  } catch (error) {
    console.error(error);
    res.status(404).json(error);
  }
});
router.get("/blogs", async (req, res) => {
  try {
    const productlist = await Product.findAll();
    const subcategories = await Subcategory.findAll();
    const categories = await Category.findAll();
    const blogs = await Blog.findAll();
    res.render("admin/bloglist", {
      title: "System blogs",
      layout: "layouts/admin_layout",
      productlist,
      subcategories,
      categories,
      blogs,
    });
  } catch (error) {
    console.error(error);
    res.status(404).json(error);
  }
});
router.get("/allorders", async (req, res) => {
  try {
    const sales = await Sale.findAll();
    res.render("admin/allorders", {
      title: "System Orders",
      layout: "layouts/admin_layout",
      sales,
    });
  } catch (error) {
    console.error(error);
    res.status(404).json(error);
  }
});
router.get("/delivered", async (req, res) => {
  try {
    const sales = await Sale.findAll();
    res.render("admin/delivered", {
      title: "Delivery Status",
      layout: "layouts/admin_layout",
      sales,
    });
  } catch (error) {
    console.error(error);
    res.status(404).json(error);
  }
});
module.exports = router;
