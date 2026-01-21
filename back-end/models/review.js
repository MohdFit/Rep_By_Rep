const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  // Reference to user who wrote the review
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required'],
    index: true
  },

  // Type of product being reviewed (TShirt or Plan - training program)
  productType: {
    type: String,
    required: [true, 'Product type is required'],
    enum: ['TShirt', 'Plan'],
    default: 'Plan' // Default to Plan since we focus on training programs
  },

  // Reference to the product being reviewed (dynamic ref based on productType)
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'productType',
    required: [true, 'Product ID is required'],
    index: true
  },

  // Reference to the order this review came from
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: [true, 'Order ID is required']
  },

  // Star rating (1-5)
  rating: {
    type: Number,
    required: [true, 'Rating is required'],
    min: [1, 'Rating must be between 1 and 5'],
    max: [5, 'Rating must be between 1 and 5'],
    enum: [1, 2, 3, 4, 5]
  },

  // Review title
  title: {
    type: String,
    required: [true, 'Review title is required'],
    trim: true,
    minlength: [5, 'Title must be at least 5 characters'],
    maxlength: [100, 'Title cannot exceed 100 characters']
  },

  // Review description
  comment: {
    type: String,
    required: [true, 'Review comment is required'],
    trim: true,
    minlength: [10, 'Comment must be at least 10 characters'],
    maxlength: [1000, 'Comment cannot exceed 1000 characters']
  },

  // Helpful votes
  helpfulCount: {
    type: Number,
    default: 0,
    min: [0, 'Helpful count cannot be negative']
  },

  // Whether the purchase was verified
  verified: {
    type: Boolean,
    default: false
  },

  // Review status (pending approval, approved, rejected)
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },

  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now,
    index: true
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Create compound index to prevent duplicate reviews from same user on same product
reviewSchema.index({ userId: 1, productId: 1 }, { unique: true });

// Update timestamp before saving
reviewSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Calculate average rating for a product
reviewSchema.statics.getAverageRating = async function(productId) {
  const result = await this.aggregate([
    {
      $match: {
        productId: mongoose.Types.ObjectId(productId),
        status: 'approved'
      }
    },
    {
      $group: {
        _id: '$productId',
        averageRating: { $avg: '$rating' },
        totalReviews: { $sum: 1 }
      }
    }
  ]);

  return result.length > 0 ? result[0] : { averageRating: 0, totalReviews: 0 };
};

module.exports = mongoose.model('Review', reviewSchema);
