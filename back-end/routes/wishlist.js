const express = require('express');
const { authMiddleware } = require('../middleware/authMiddleware');
const wishlistController = require('../controllers/wishlistController');

const router = express.Router();

// All wishlist routes require authentication
router.use(authMiddleware);

// Get wishlist
router.get('/', wishlistController.getWishlist);

// Add item to wishlist
router.post('/add', wishlistController.addToWishlist);

// Remove item from wishlist
router.delete('/:itemId', wishlistController.removeWishlistItem);

module.exports = router;
