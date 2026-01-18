const mongoose = require('mongoose');
const Plan = require('./plan');      // Path to your Plan model
const TShirt = require('./merch');

const orderItemSchema = new mongoose.Schema({
  productType: {
    type: String,
    enum: {
      values: ['Plan', 'TShirt'],
      message: 'Product type must be either Plan or TShirt'
    },
    required: [true, 'Product type is required']
  },
  
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'Product ID is required'],
    refPath: 'productType'
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
  },
  
  
  selectedSize: {
    type: String,
    enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    required: function() {
      return this.productType === 'TShirt';
    }
  },
  
  selectedColor: {
    type: String,
    required: function() {
      return this.productType === 'TShirt';
    }
  }
}, {
  timestamps: true
});

orderItemSchema.pre('validate', async function (next) {
  try {
    let product;

    if (this.productType === 'Plan') {
      product = await Plan.findById(this.productId);
    } else if (this.productType === 'TShirt') {
      product = await TShirt.findById(this.productId);
    }

    if (!product) {
      return next(new Error('Product not found'));
    }

    this.unitPrice = product.price;
    this.totalPrice = this.quantity * this.unitPrice;

    next();
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model('OrderItem', orderItemSchema);