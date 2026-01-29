const express = require('express');
const router = express.Router();
const { authMiddleware, requireRole } = require('../middleware/authMiddleware');
const statsController = require('../controllers/stats/statsController');

// Admin only - Dashboard statistics
router.get('/stats/dashboard', authMiddleware, requireRole(['admin']), statsController.getDashboardStats);
router.get('/stats/sales', authMiddleware, requireRole(['admin']), statsController.getSalesOverview);
router.get('/stats/products', authMiddleware, requireRole(['admin']), statsController.getProductStats);
router.get('/stats/users', authMiddleware, requireRole(['admin']), statsController.getUserStats);

module.exports = router;
