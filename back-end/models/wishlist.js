const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required'],
    unique: true,
    index: true
  },

  items: [{
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Plan',
      required: [true, 'Product ID is required']
    },
    addedAt: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true
});

// Static: find or create wishlist for user
wishlistSchema.statics.findOrCreateWishlist = async function(userId) {
  let wishlist = await this.findOne({ userId });
  if (!wishlist) {
    wishlist = new this({ userId, items: [] });
    await wishlist.save();
  }
  return wishlist;
};

module.exports = mongoose.model('Wishlist', wishlistSchema);
