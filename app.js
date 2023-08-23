const express = require("express");
const bodyParser = require("body-parser");
const expressLayouts = require('express-ejs-layouts');
const app = express();

const port = 3000;

// Sample product data (in a real-world scenario, this would come from a database)
const products = [
  { id: 1, name: "Custom Mug", price: 10.99 },
  { id: 2, name: "Personalized Art Print", price: 25.99 },
  // Add more products here...
];

app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(expressLayouts);

app.get("/", (req, res) => {
  res.render("index", { title: 'Home', products, layout: 'layouts/master' });
});
app.get("/index", (req, res) => {
  res.render("index", { title: 'Home', products, layout: 'layouts/master' });
});

app.get("/blog", (req, res) => {
  res.render("blog", { title: 'Blog', products, layout: 'layouts/master' });
});

app.get("/checkout", (req, res) => { 
  res.render("checkout",{ title: 'Checkout', products, layout: 'layouts/master' });
});
app.get("/contact", (req, res) => {
  res.render("contact",{ title: 'Contact Us', products, layout: 'layouts/master' });
});
app.get("/shop-details", (req, res) => { 
  res.render("shop-details",{ title: 'Shop Details', products, layout: 'layouts/master' });
});
app.get("/shop-grid", (req, res) => {
  res.render("shop-grid",{ title: 'Sho', products, layout: 'layouts/master' });
});
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
