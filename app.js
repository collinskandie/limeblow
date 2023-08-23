const express = require("express");
const bodyParser = require("body-parser");
const expressLayouts = require("express-ejs-layouts");
const mysql = require("mysql");
const app = express();

const port = 3000;

// Sample product data (in a real-world scenario, this would come from a database)

app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(expressLayouts);

// api endpoints start
const db = mysql.createConnection({
  host: "localhost", 
  user: "root",
  password: "Collin@Admin", 
  database: "limebow", 
});

db.connect((err) => {
  if (err) {
    console.error("Database connection error:", err);
    return;
  }
  
  console.log("Connected to MySQL database");
});

global.db = db;

app.get("/", (req, res) => {
  res.render("index", { title: "Home", layout: "layouts/master" });
});
app.get("/index", (req, res) => {
  res.render("index", { title: "Home", layout: "layouts/master" });
});


app.get("/blog", (req, res) => {
  res.render("blog", { title: "Blog", layout: "layouts/master" });
});

app.get("/checkout", (req, res) => {
  res.render("checkout", { title: "Checkout", layout: "layouts/master" });
});
app.get("/contact", (req, res) => {
  res.render("contact", { title: "Contact Us", layout: "layouts/master" });
});
app.get("/shop-details", (req, res) => {
  res.render("shop-details", {
    title: "Shop Details",
    layout: "layouts/master",
  });
});
app.get("/shop-grid", (req, res) => {
  res.render("shop-grid", { title: "Sho", layout: "layouts/master" });
});
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
