const orderController = require('../controllers/orders/orderController');
const { authMiddleware } = require('../middleware/authMiddleware');

const express = require('express');
const router = express.Router();




router.post('/orders',authMiddleware, orderController.createOrder);



module.exports = router;