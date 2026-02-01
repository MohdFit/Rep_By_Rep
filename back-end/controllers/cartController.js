const Cart = require('../models/cart');
const Plan = require('../models/plan');

const cartController = {
  // Add item to cart
  addToCart: async (req, res) => {
    try {
      const { userId } = req.user;
      const { productId, productType, quantity } = req.body;

      if (!productId || !productType || !quantity) {
        return res.status(400).json({
          success: false,
          message: 'productId, productType, and quantity are required'
        });
      }

      // Only support Plans
      if (productType !== 'Plan') {
        return res.status(400).json({
          success: false,
          message: 'Only training plans are supported'
        });
      }

      // Fetch plan to get price
      const product = await Plan.findById(productId);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: 'Plan not found'
        });
      }

      // Find or create cart
      let cart = await Cart.findOrCreateCart(userId);

      // Check if item already in cart
      const existingItem = cart.items.find(
        item => item.productId.toString() === productId && item.productType === productType
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.items.push({
          productId,
          productType,
          quantity,
          price: product.price
        });
      }

      await cart.save();

      res.status(200).json({
        success: true,
        message: 'Item added to cart',
        data: cart
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to add item to cart',
        error: error.message
      });
    }
  },

  // Get cart
  getCart: async (req, res) => {
    try {
      const { userId } = req.user;

      const cart = await Cart.findOrCreateCart(userId);

      res.status(200).json({
        success: true,
        data: cart
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to fetch cart',
        error: error.message
      });
    }
  },

  // Update cart item quantity
  updateCartItem: async (req, res) => {
    try {
      const { userId } = req.user;
      const { itemId } = req.params;
      const { quantity } = req.body;

      if (!quantity || quantity < 1) {
        return res.status(400).json({
          success: false,
          message: 'Quantity must be at least 1'
        });
      }

      const cart = await Cart.findOne({ userId });
      if (!cart) {
        return res.status(404).json({
          success: false,
          message: 'Cart not found'
        });
      }

      const item = cart.items.id(itemId);
      if (!item) {
        return res.status(404).json({
          success: false,
          message: 'Item not found in cart'
        });
      }

      item.quantity = quantity;
      await cart.save();

      res.status(200).json({
        success: true,
        message: 'Cart updated',
        data: cart
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to update cart',
        error: error.message
      });
    }
  },

  // Remove item from cart
  removeCartItem: async (req, res) => {
    try {
      const { userId } = req.user;
      const { itemId } = req.params;

      const cart = await Cart.findOne({ userId });
      if (!cart) {
        return res.status(404).json({
          success: false,
          message: 'Cart not found'
        });
      }

      cart.items.id(itemId).deleteOne();
      await cart.save();

      res.status(200).json({
        success: true,
        message: 'Item removed from cart',
        data: cart
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to remove item',
        error: error.message
      });
    }
  },

  // Clear cart
  clearCart: async (req, res) => {
    try {
      const { userId } = req.user;

      const cart = await Cart.findOne({ userId });
      if (!cart) {
        return res.status(404).json({
          success: false,
          message: 'Cart not found'
        });
      }

      cart.items = [];
      cart.subTotal = 0;
      cart.tax = 0;
      cart.total = 0;
      await cart.save();

      res.status(200).json({
        success: true,
        message: 'Cart cleared',
        data: cart
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to clear cart',
        error: error.message
      });
    }
  }
};

module.exports = cartController;
