const Wishlist = require('../models/wishlist');
const Plan = require('../models/plan');

const wishlistController = {
  // Get wishlist
  getWishlist: async (req, res) => {
    try {
      if ( !req.user || !req.user.id ){
        return res.status(401).json({ success : false , message : 'Unauthorized : user not found ' });  
      }
   
      const { userId } = req.user;
      const wishlist = await Wishlist.findOrCreateWishlist(userId)
        .populate({ path: 'items.productId', select: 'title price image' });

      // Normalize for frontend
      const data = {
        _id: wishlist._id,
        userId: wishlist.userId,
        items: wishlist.items.map(it => ({
          _id: it._id,
          productId: it.productId?._id || it.productId,
          product: it.productId ? {
            _id: it.productId._id,
            title: it.productId.title,
            price: it.productId.price,
            image: it.productId.image
          } : null,
          addedAt: it.addedAt
        }))
      };

      res.status(200).json({ success: true, data });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to fetch wishlist',
        error: error.message
      });
    }
  },

  // Add item to wishlist
  addToWishlist: async (req, res) => {
    try {
      const { userId } = req.user;
      const { productId } = req.body;

      if (!productId) {
        return res.status(400).json({ success: false, message: 'productId is required' });
      }

      const plan = await Plan.findById(productId).select('title price image');
      if (!plan) {
        return res.status(404).json({ success: false, message: 'Plan not found' });
      }

      const wishlist = await Wishlist.findOrCreateWishlist(userId);

      const exists = wishlist.items.find(it => String(it.productId) === String(productId));
      if (exists) {
        return res.status(200).json({ success: true, message: 'Already in wishlist' });
      }

      wishlist.items.push({ productId });
      await wishlist.save();

      res.status(200).json({ success: true, message: 'Added to wishlist' });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to add to wishlist',
        error: error.message
      });
    }
  },

  // Remove item from wishlist
  removeWishlistItem: async (req, res) => {
    try {
      const { userId } = req.user;
      const { itemId } = req.params;

      const wishlist = await Wishlist.findOne({ userId });
      if (!wishlist) {
        return res.status(404).json({ success: false, message: 'Wishlist not found' });
      }

      const item = wishlist.items.id(itemId);
      if (!item) {
        return res.status(404).json({ success: false, message: 'Item not found in wishlist' });
      }

      item.deleteOne();
      await wishlist.save();

      res.status(200).json({ success: true, message: 'Item removed', data: wishlist });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to remove item',
        error: error.message
      });
    }
  }
};

module.exports = wishlistController;
