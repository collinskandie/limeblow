const express = require("express");
const bodyParser = require("body-parser");
const expressLayouts = require("express-ejs-layouts");
const session = require('express-session');

const sequelize = require("./db");
const Category = require("./models/Category");
require("dotenv").config();
const app = express();

const apiRouter = require("./routes/index");
const usersController = require('./controllers/usersController');
const Product = require("./models/Product");

const port = process.env.PORT || 3000;
app.use(
  session({
    secret: process.env.SECRETE, // Replace with your own secret key
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Adjust settings as needed
  })
);

// Middleware to log requests
app.use((req, res, next) => {
  console.log(`Received ${req.method} request for ${req.originalUrl}`);
  next(); // Pass control to the next middleware
});

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(expressLayouts);
// app.use(bodyParser.json());

// Mount your API routes
app.use("/api", apiRouter);
app.post('/login', usersController.login);

// Define your other routes here

app.get("/", async (req, res) => {
  try {
    const categories = await Category.findAll();
    const products = await Product.findAll();
    const latestproducts = await Product.findAll({
      order: [["createdAt", "DESC"]],
      limit: 3,
    });

    res.render("index", {
      title: "Home",
      layout: "layouts/master",
      categories,
      products,
      latestproducts,
    });
  } catch (error) {
    console.error(error);
    res.render("index", {
      title: "Home",
      layout: "layouts/master",
      categories: [],
      product: [],
      latestproducts: [],
    });
  }
});
app.get("/index", async (req, res) => {
  try {
    const categories = await Category.findAll();
    const products = await Product.findAll();
    const latestproducts = await Product.findAll({
      order: [["createdAt", "DESC"]],
      limit: 3,
    });

    res.render("index", {
      title: "Home",
      layout: "layouts/master",
      categories,
      products,
      latestproducts,
    });
  } catch (error) {
    console.error(error);
    res.render("index", {
      title: "Home",
      layout: "layouts/master",
      categories: [],
      product: [],
      latestproducts: [],
    });
  }
});
app.get("/contact", async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.render("contact", {
      title: "Contact Us",
      layout: "layouts/master",
      categories,
    });
  } catch (error) {
    console.error(error);
    res.render("contact", {
      title: "Contact Us",
      layout: "layouts/master",
      categories: [],
    });
  }
});
app.get("/blog", async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.render("blog", { title: "Blog", layout: "layouts/master", categories });
  } catch (error) {
    console.error(error);
    res.render("blog", {
      title: "Blog",
      layout: "layouts/master",
      categories: [],
    });
  }
});
app.get("/checkout", async (req, res) => {
  try {
    const categories = await Category.findAll();
    // Check if user session exists
    const userSessionExists = req.session && req.session.user; // Modify this based on your session management logic

    res.render("checkout", {
      title: "Checkout",
      layout: "layouts/master",
      categories,
      userSessionExists, // Pass the session status to the view
    });
  } catch (error) {
    console.error(error);
    res.render("checkout", {
      title: "Checkout",
      layout: "layouts/master",
      categories: [],
    });
  }
});
app.get("/payments", async (req, res) => {
  try {
    const categories = await Category.findAll();   
    const userSessionExists = req.session && req.session.user; 
    res.render("payments", {
      title: "Payments",
      layout: "layouts/master",
      categories,
      userSessionExists, 
    });
  } catch (error) {
    console.error(error);
    res.render("checkout", {
      title: "Checkout",
      layout: "layouts/master",
      categories: [],
    });
  }
});

app.get("/shop-details", async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.render("shop-details", {
      title: "Shop Details",
      layout: "layouts/master",
      categories,
    });
  } catch (error) {
    console.error(error);
    res.render("shop-details", {
      title: "Shop Details",
      layout: "layouts/master",
      categories: [],
    });
  }
});

app.get("/blog-details", async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.render("blog-details", {
      title: "Blog Details",
      layout: "layouts/master",
      categories,
    });
  } catch (error) {
    console.error(error);
    res.render("blog-details", {
      title: "Blog Details",
      layout: "layouts/master",
      categories: [],
    });
  }
});
app.get("/cart", async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.render("shoping-cart", {
      title: "shoping-cart",
      layout: "layouts/master",
      categories,
    });
  } catch (error) {
    console.error(error);
    res.render("shoping-cart", {
      title: "shoping-cart",
      layout: "layouts/master",
      categories: [],
    });
  }
});
app.get("/shop-grid", async (req, res) => {
  try {
    const categories = await Category.findAll();
    const products = await Product.findAll();
    const latestproducts = await Product.findAll({
      order: [["createdAt", "DESC"]],
      limit: 3,
    });
    res.render("shop-grid", {
      title: "Shop",
      layout: "layouts/master",
      categories,
      products,
      latestproducts,
    });
  } catch (error) {
    console.error(error);
    res.render("shop-grid", {
      title: "Shop",
      layout: "layouts/master",
      categories: [],
    });
  }
});
app.get("/login", (req, res) => {
  res.render("login", {
    title: "Login",
    layout: "layouts/master",
  });
});
app.get("/signup", (req, res) => {
  const userSessionExists = req.session && req.session.user; // Modify this based on your session management logic
  res.render("signup", { title: "Sign Up", layout: "layouts/master",
  userSessionExists, // Pass the session status to the view
 });
});

//page redirects
app.get("/item-details/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;
    const product = await Product.findByPk(productId); // Find product by ID
    const categories = await Category.findAll();

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.render("item-details", {
      title: "Item Details",
      layout: "layouts/master",
      categories,
      product,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching product details" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
