const express = require("express");
const bodyParser = require("body-parser");
const expressLayouts = require("express-ejs-layouts");
const session = require("express-session");

const sequelize = require("./db");
const Category = require("./models/Category");
require("dotenv").config();
const app = express();

const apiRouter = require("./routes/index");
const useAdmin = require("./routes/admin");
const usersController = require("./controllers/usersController");
const Product = require("./models/Product");

const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../public/img/uploads/"); // Specify the directory where files will be stored
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Specify the file name
  },
});

const upload = multer({ storage: storage });
app.use("/uploads", express.static("uploads"));
app.use(upload.single("image"));
//
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

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(expressLayouts);
// app.use(bodyParser.json());

// file uploads

// Mount your API routes
app.use("/api", apiRouter);
//admin routes
app.use("/admin", useAdmin);
app.post("/login", usersController.login);
const runMigration = require("./controllers/migrate");
const Blog = require("./models/blog"); 
app.get("/run-migrations", runMigration.runMigrations);

// Define your other routes here

app.get("/", async (req, res) => {
  try {
    const categories = await Category.findAll();
    const products = await Product.findAll();
    const latestproducts = await Product.findAll({
      order: [["createdAt", "DESC"]],
      limit: 3,
    });
    const blogs = await Blog.findAll({
      order: [["createdAt", "DESC"]],
      limit: 3,
    });

    res.render("index", {
      title: "Home",
      layout: "layouts/master",
      categories,
      products,
      blogs,
      latestproducts,
    });
  } catch (error) {
    console.error(error);
    res.render("index", {
      title: "Home",
      layout: "layouts/master",
      categories: [],
      product: [],
      blogs: [],
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
    const blogs = await Blog.findAll({
      order: [["createdAt", "DESC"]],
      limit: 3,
    });
    res.render("index", {
      title: "Home",
      layout: "layouts/master",
      categories,
      products,
      blogs,
      latestproducts,
    });
  } catch (error) {
    console.error(error);
    res.render("index", {
      title: "Home",
      layout: "layouts/master",
      categories: [],
      product: [],
      blogs: [],
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
app.post("/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;
    console.log(email);
    const saveMessage = await usersController.newMessage(name, email, message);
    console.log(saveMessage);
    const categories = await Category.findAll();
    res.render("contact", {
      title: "Contact Us",
      layout: "layouts/master",
      categories,
      saveMessage,
      sucsess: "Message saved",
    });
  } catch (error) {
    console.error(error);
    res.render("contact", {
      title: "Contact Us",
      layout: "layouts/master",
      categories: [],
      success: "Failed to save message", // Add an error message to display to the user
    });
  }
});

app.get("/blog", async (req, res) => {
  try {
    const categories = await Category.findAll();
    const blogs = await Blog.findAll();
    res.render("blog", {
      title: "Blog",
      layout: "layouts/master",
      categories,
      blogs,
    });
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

app.get("/blog-details/:blogId", async (req, res) => {
  try {
    const blogid = req.params.blogId;
    const blogDetails = await Blog.findByPk(blogid);
    const recentBlogs = await Blog.findAll({
      order: [["createdAt", "DESC"]],
      limit: 3,
    });
    const blogs = await Blog.findAll();

    const categories = await Category.findAll();
    res.render("blog-details", {
      title: "Blog Details",
      layout: "layouts/master",
      categories,
      blogDetails,
      blogs,
      recentBlogs,
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
  res.render("signup", {
    title: "Sign Up",
    layout: "layouts/master",
    userSessionExists, // Pass the session status to the view
  });
});

// departments/categories redirect page
app.get("/department/:categoryid", async (req, res) => {
  try {
    const categoryid = req.params.categoryid;
    const category = await Category.findByPk(categoryid);

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    const products_Category = await Product.findAll({
      where: {
        category: category.id, // Assuming you have a 'categoryId' field in your Product model
        // id: { [Op.ne]: productid }, // Exclude the current product
      },
    });
    const categories = await Category.findAll();
    res.render("category-details", {
      title: "Category Details",
      layout: "layouts/master",
      category,
      categories,
      products_Category,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ err: error });
  }
});

//page redirects
app.get("/item-details/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;
    const product = await Product.findByPk(productId); // Find product by ID
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    // Find related products based on category ID
    const relatedProducts = await Product.findAll({
      where: {
        category: product.category, // Assuming you have a 'categoryId' field in your Product model
        // id: { [Op.ne]: productid }, // Exclude the current product
      },
    });
    const categories = await Category.findAll();
    res.render("item-details", {
      title: "Item Details",
      layout: "layouts/master",
      categories,
      product,
      relatedProducts,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching product details" });
  }
});
app.get("/search", async (req, res) => {
  const userInput = req.query.query; // Get the user's input from the query parameter

  const products = await Product.findAll();
  const suggestions = products.filter((product) =>
    product.name.toLowerCase().includes(userInput.toLowerCase())
  );

  res.json(suggestions);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
