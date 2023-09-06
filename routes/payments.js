const express = require("express");
const router = express.Router();
const paymentsController = require("../controllers/paymentsController");
const { generateToken } = require("../middleware/authenticateToken");
router.post("/mpesa", generateToken, paymentsController.newMpesa);
router.post("/card", paymentsController.newCard);

// router.post("/newaddress", usersController.addAddress);

module.exports = router; // Export the router object
