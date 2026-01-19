const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required'],
    index: true
  },
  
  orderItems: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'OrderItem',
    required: true
  }],
  
  orderNumber: {
    type: String,
    unique: true,
    required: [true, 'Order number is required']
  },
   shippingInfo: {
    street: {
      type: String,
      trim: true
    },
    apartment: {
      type: String,
      trim: true
    },
    city: {
      type: String,
      trim: true
    },
    state: {
      type: String,
      trim: true
    },
    zipCode: {
      type: String,
      trim: true
    },
    country: {
      type: String,
      trim: true,
      default: 'USA'
    }
  },
shippingCost: {
    type: Number,
    default: 0,
    min: [0, 'Shipping cost cannot be negative']
  },
  total: {
    type: Number,
    // required: [true, 'Total is required'],
    min: [0, 'Total cannot be negative']
  },
  
  // Order Status
  status: {
    type: String,
    enum: {
      values: ['Pending', 'Processing', 'Shipping', 'Delivered', 'Cancelled'],
      message: 'Invalid order status'
    },
    default: 'Pending',
    index: true
  },
  paidAt: Date,
  
  shippedAt: Date,
  
  deliveredAt: Date,
  
  cancelledAt: Date,
  
  refundedAt: Date
}, {
  timestamps: true
});


// Pre-save middleware to generate order number
orderSchema.pre('save', async function(next) {
  if (this.isNew && !this.orderNumber) {
    const year = new Date().getFullYear();
    const count = await this.constructor.countDocuments();
    this.orderNumber = `ORD-${year}-${String(count + 1).padStart(6, '0')}`;
  }
  next();
});


orderSchema.virtual('shippingAddress').get(function() {
  const info = this.shippingInfo;
  if (!info.street) return null;
  
  let address = info.street;
  if (info.apartment) address += `, ${info.apartment}`;
  address += `\n${info.city}, ${info.state} ${info.zipCode}`;
  if (info.country && info.country !== 'USA') address += `\n${info.country}`;
  
  return address;
});

orderSchema.statics.findByUser = function(userId) {
  return this.find({ userId })
    .populate({
      path: 'orderItems',
      populate: {
        path: 'productId'
      }
    })
    .sort({ createdAt: -1 });
};

orderSchema.statics.findByStatus = function(status) {
  return this.find({ status })
    .populate({
      path: 'orderItems',
      populate: {
        path: 'productId'
      }
    })
    .sort({ createdAt: -1 });
};


module.exports = mongoose.model('Order', orderSchema);