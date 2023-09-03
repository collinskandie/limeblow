// routes/products.js
const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController'); 
const categoriesController = require('../controllers/categoriesController'); 
const authenticateToken = require('../middleware/authenticateToken'); // use this for api routes that needs to be verified for auth
const usersRouter = require("./users"); 

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
 