const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const { authenticate, authorize } = require('../middleware/authMiddleware');

// PUBLIC ROUTES

// Get all reviews for a product
router.get('/product/:productId', reviewController.getProductReviews);

// Get single review
router.get('/:reviewId', reviewController.getReviewById);

// AUTHENTICATED USER ROUTES

// Create review (must be authenticated)
router.post('/', authenticate, reviewController.createReview);

// Get user's reviews
router.get('/user/:userId', reviewController.getUserReviews);

// Update review (user can only update their own)
router.put('/:reviewId', authenticate, reviewController.updateReview);

// Delete review (user can only delete their own)
router.delete('/:reviewId', authenticate, reviewController.deleteReview);

// ADMIN ROUTES

// Get pending reviews (admin only)
router.get('/admin/pending', authenticate, authorize('admin'), reviewController.getPendingReviews);

// Update review status (admin only)
router.patch('/admin/:reviewId/status', authenticate, authorize('admin'), reviewController.updateReviewStatus);

module.exports = router;
