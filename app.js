const express = require("express");
const bodyParser = require("body-parser");
const expressLayouts = require("express-ejs-layouts");
const sequelize = require("./db");
const Category = require("./models/Category");
require("dotenv").config();
const app = express();

const apiRouter = require("./routes/index"); // Change this to your product router
const Product = require("./models/Product");

const port = process.env.PORT || 3000; // Use a default port if PORT is not set in .env

// Middleware to log requests
app.use((req, res, next) => {
  console.log(`Received ${req.method} request for ${req.originalUrl}`);
  next(); // Pass control to the next middleware
});

app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(expressLayouts);
app.use(bodyParser.json());

// Mount your API routes
app.use("/api", apiRouter);

// Define your other routes here

app.get("/", async (req, res) => {
  try {
    const categories = await Category.findAll(); // Fetch categories from the database
    const products = await Product.findAll();
    const latestproducts = await Product.findAll({
      order: [["createdAt", "DESC"]], // Order the results by createdAt in descending order
      limit: 3, // Limit the result to the last 10 items
    });

    res.render("index", {
      title: "Home",
      layout: "layouts/master",
      categories,
      products,
      latestproducts,
    }); // Pass categories to the view
  } catch (error) {
    console.error(error);
    res.render("index", {
      title: "Home",
      layout: "layouts/master",
      categories: [],
      product: [],
      latestproducts: [],
    }); // Handle error
  }
});
app.get("/index", async (req, res) => {
  try {
    const categories = await Category.findAll(); // Fetch categories from the database
    const products = await Product.findAll();
    const latestproducts = await Product.findAll({
      order: [["createdAt", "DESC"]], // Order the results by createdAt in descending order
      limit: 3, // Limit the result to the last 10 items
    });

    res.render("index", {
      title: "Home",
      layout: "layouts/master",
      categories,
      products,
      latestproducts,
    }); // Pass categories to the view
  } catch (error) {
    console.error(error);
    res.render("index", {
      title: "Home",
      layout: "layouts/master",
      categories: [],
      product: [],
      latestproducts: [],
    }); // Handle error
  }
});
app.get("/contact", async (req, res) => {
  try {
    const categories = await Category.findAll(); // Fetch categories from the database
    res.render("contact", {
      title: "Contact Us",
      layout: "layouts/master",
      categories,
    }); // Pass categories to the view
  } catch (error) {
    console.error(error);
    res.render("contact", {
      title: "Contact Us",
      layout: "layouts/master",
      categories: [],
    }); // Handle error
  }
});
app.get("/blog", async (req, res) => {
  try {
    const categories = await Category.findAll(); // Fetch categories from the database
    res.render("blog", { title: "Blog", layout: "layouts/master", categories }); // Pass categories to the view
  } catch (error) {
    console.error(error);
    res.render("blog", {
      title: "Blog",
      layout: "layouts/master",
      categories: [],
    }); // Handle error
  }
});
app.get("/checkout", async (req, res) => {
  try {
    const categories = await Category.findAll(); // Fetch categories from the database
    res.render("checkout", {
      title: "Checkout",
      layout: "layouts/master",
      categories,
    }); // Pass categories to the view
  } catch (error) {
    console.error(error);
    res.render("checkout", {
      title: "Checkout",
      layout: "layouts/master",
      categories: [],
    }); // Handle error
  }
});
app.get("/shop-details", async (req, res) => {
  try {
    const categories = await Category.findAll(); // Fetch categories from the database
    res.render("shop-details", {
      title: "Shop Details",
      layout: "layouts/master",
      categories,
    }); // Pass categories to the view
  } catch (error) {
    console.error(error);
    res.render("shop-details", {
      title: "Shop Details",
      layout: "layouts/master",
      categories: [],
    }); // Handle error
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
app.get("/shoping-cart", async (req, res) => {
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
    const categories = await Category.findAll(); // Fetch categories from the database
    res.render("shop-grid", {
      title: "Shop",
      layout: "layouts/master",
      categories,
    }); // Pass categories to the view
  } catch (error) {
    console.error(error);
    res.render("shop-grid", {
      title: "Shop",
      layout: "layouts/master",
      categories: [],
    }); // Handle error
  }
});

//page redirects
app.get("/item-details/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;
    const product = await Product.findByPk(productId); // Find product by ID
    const categories = await Category.findAll(); // Fetch categories from the database

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Render your item details page with the product data
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
