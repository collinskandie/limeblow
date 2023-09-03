const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

router.post('/signup', usersController.AddUsers);
router.post('/login', usersController.login);

module.exports = router; // Export the router object
