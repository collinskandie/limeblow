// routes/products.js
const express = require("express");
const router = express.Router();
const productsController = require("../controllers/productsController");
const categoriesController = require("../controllers/categoriesController");
const blogController = require("../controllers/blogController");
const paymentsController = require("../controllers/paymentsController");
const usersController = require("../controllers/usersController");
const reportsController = require("../controllers/reportsController");
const usersRouter = require("./users");
const paymentRoutes = require("./payments");
const { validateToken } = require("../middleware/userTokenValidator");

// Define this route after initializing your Express app
router.get("/verifyToken", validateToken, usersController.verifyToken);

// #products api
router.get("/products", productsController.getAllProducts);
router.get("/productsbyId/:productId", productsController.getProduct);
router.post("/addproduct", productsController.addProduct);
router.post("/updateProduct", productsController.updateProduct);
router.delete("/deleteProduct/:productId", productsController.deleteProduct);
router.get("/generate-test-products", productsController.generateTestProducts);

router.get("/salesperyear",reportsController.salePerYear)
router.get("/recenttransactions",reportsController.recentTransactions)
router.get("/recentsales",reportsController.recentSales)
// router.get('/copy', copyImage);

// categories
router.get("/categories", categoriesController.getAllCategories);
router.delete(
  "/deleteCategory/:categoryId",
  categoriesController.deleteCategory
);
router.post("/updateCategory", categoriesController.editCategory);
router.post("/addcategories", categoriesController.AddCategories);

// subcategories apis

router.delete(
  "/deletesubcategory/:subcategoryId",
  categoriesController.deletesubCategory
);
router.post("/updatesubcategory", categoriesController.editsubCategory);
router.post("/addsubcategories", categoriesController.AddsubCategories);

//manage users
router.use("/users", usersRouter);
router.use("/payments", paymentRoutes);
router.use("/savePayment", paymentRoutes);

// blog routes
router.post("/addblogs", blogController.addBlog);
router.delete("/deleteblog/:blogId", blogController.deleteBlog);
// router.post("/deleteblog", blogController.deleteBlog);

router.post("/dispatch", paymentsController.saveDispatch);
router.get("/getdispatch/:invoiceId", paymentsController.getDispatch);
router.post("/addAdmin", usersController.addAdmin);
router.post("/admin/login", usersController.adminLogin);
router.post("/subscribe",usersController.userSubscribe);
module.exports = router;
