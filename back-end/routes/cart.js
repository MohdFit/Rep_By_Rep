const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const cartController = require('../controllers/cartController');

const router = express.Router();

// All cart routes require authentication
router.use(authMiddleware);

// Get cart
router.get('/', cartController.getCart);

// Add item to cart
router.post('/add', cartController.addToCart);

// Update cart item quantity
router.put('/:itemId', cartController.updateCartItem);

// Remove item from cart
router.delete('/:itemId', cartController.removeCartItem);

// Clear cart
router.delete('/', cartController.clearCart);

module.exports = router;
