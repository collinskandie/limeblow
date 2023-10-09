const express = require("express");
const router = express.Router();
const paymentsController = require("../controllers/paymentsController");
const { generateToken } = require("../middleware/authenticateToken");
// router.post("/mpesa",  paymentsController.newMpesa);
router.post("/mpesa", generateToken, paymentsController.newMpesa);
router.post("/card", paymentsController.newCard);
router.post("/callback", paymentsController.mpesaCallBack);
module.exports = router; // Export the router object

router.post('/confirmation',paymentsController.savePayment); // save payemnt as a transaction