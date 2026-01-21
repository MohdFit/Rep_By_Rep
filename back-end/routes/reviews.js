const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const { authMiddleware, requireRole } = require('../middleware/authMiddleware');

// PUBLIC ROUTES
router.get('/product/:productId', reviewController.getProductReviews);
router.get('/:reviewId', reviewController.getReviewById);

// AUTHENTICATED USER ROUTES
router.post('/', authMiddleware, reviewController.createReview);
router.get('/user/:userId', authMiddleware, reviewController.getUserReviews);
router.put('/:reviewId', authMiddleware, reviewController.updateReview);
router.delete('/:reviewId', authMiddleware, reviewController.deleteReview);

// ADMIN ROUTES
router.get('/admin/pending', authMiddleware, requireRole('admin'), reviewController.getPendingReviews);
router.patch('/admin/:reviewId/status', authMiddleware, requireRole('admin'), reviewController.updateReviewStatus);

module.exports = router;