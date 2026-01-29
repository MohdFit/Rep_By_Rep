const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
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
      required: [true, 'Product ID is required'],
      refPath: 'items.productType'
    },
    productType: {
      type: String,
      enum: ['TShirt', 'Plan'],
      required: [true, 'Product type is required']
    },
    quantity: {
      type: Number,
      required: [true, 'Quantity is required'],
      min: [1, 'Quantity must be at least 1'],
      default: 1
    },
    selectedSize: {
      type: String,
      enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL']
    },
    selectedColor: {
      type: String
    },
    price: {
      type: Number,
      required: [true, 'Price is required']
    },
    addedAt: {
      type: Date,
      default: Date.now
    }
  }],
  
  subTotal: {
    type: Number,
    default: 0,
    min: [0, 'SubTotal cannot be negative']
  },
  
  tax: {
    type: Number,
    default: 0,
    min: [0, 'Tax cannot be negative']
  },
  
  shippingCost: {
    type: Number,
    default: 0,
    min: [0, 'Shipping cost cannot be negative']
  },
  
  total: {
    type: Number,
    default: 0,
    min: [0, 'Total cannot be negative']
  }
}, {
  timestamps: true
});

// Pre-save: Calculate totals
cartSchema.pre('save', function(next) {
  this.subTotal = this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  this.tax = parseFloat((this.subTotal * 0.08).toFixed(2));
  this.total = parseFloat((this.subTotal + this.tax + this.shippingCost).toFixed(2));
  next();
});

// Static method: Find or create cart for user
cartSchema.statics.findOrCreateCart = async function(userId) {
  let cart = await this.findOne({ userId });
  if (!cart) {
    cart = new this({ userId, items: [] });
    await cart.save();
  }
  return cart;
};

module.exports = mongoose.model('Cart', cartSchema);
