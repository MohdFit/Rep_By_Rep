const orderController = require('../controllers/orders/orderController');
const { authMiddleware, requireRole } = require('../middleware/authMiddleware');

const express = require('express');
const router = express.Router();

// User routes
router.post('/orders', authMiddleware, orderController.createOrder);
router.get('/orders/user/:userId', authMiddleware, orderController.getUserOrders);
router.get('/orders/:orderId', authMiddleware, orderController.getOrderById);

// Admin routes
router.get('/orders', authMiddleware, requireRole(['admin']), orderController.getAllOrders);
router.put('/orders/:orderId/status', authMiddleware, requireRole(['admin']), orderController.updateOrderStatus);
router.delete('/orders/:orderId', authMiddleware, requireRole(['admin']), orderController.deleteOrder);
router.get('/orders/stats/dashboard', authMiddleware, requireRole(['admin']), orderController.getOrderStats);

module.exports = router;