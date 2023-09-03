const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

router.post('/signup', usersController.AddUsers);

module.exports = router; // Export the router object
