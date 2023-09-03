// routes/products.js
const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController'); 
const categoriesController = require('../controllers/categoriesController'); 
// const copyImage = require('../controllers/pasteImages'); 
// const users = require("./users");
const usersRouter = require("./users"); // Require the users router

// #products api 
router.get('/products', productsController.getAllProducts);
router.get('/productsbyId/:productId', productsController.getProduct);
router.post('/addproducts', productsController.addProduct);
router.get('/generate-test-products', productsController.generateTestProducts);
// router.get('/copy', copyImage);

// categories
router.get('/categories', categoriesController.getAllCategories);
router.post('/addcategories', categoriesController.AddCategories);
//manage users
router.use('/users', usersRouter);


module.exports = router;
 