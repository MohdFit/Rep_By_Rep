const mongoose = require('mongoose');
const Plan = require('./plan');

const orderItemSchema = new mongoose.Schema({
  productType: {
    type: String,
    enum: {
      values: ['Plan'],
      message: 'Product type must be Plan'
    },
    required: [true, 'Product type is required'],
    default: 'Plan'
  },
  
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'Product ID is required'],
    ref: 'Plan'
  },
  
  quantity: {
    type: Number,
    required: [true, 'Quantity is required'],
    min: [1, 'Quantity must be at least 1'],
    default: 1
  },
  
  unitPrice: {
    type: Number,
    min: [0, 'Unit price cannot be negative']
  },
  
  totalPrice: {
    type: Number,
    min: [0, 'Total price cannot be negative']
  }
}, {
  timestamps: true
});

orderItemSchema.pre('validate', async function (next) {
  try {
    const product = await Plan.findById(this.productId);

    if (!product) {
      return next(new Error('Plan not found'));
    }

    this.unitPrice = product.price;
    this.totalPrice = this.quantity * this.unitPrice;

    next();
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model('OrderItem', orderItemSchema);