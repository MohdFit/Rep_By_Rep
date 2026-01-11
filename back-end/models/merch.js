const mongoose = require('mongoose');

const tShirtSchema = new mongoose.Schema({
  customId: {
    type: Number,
    unique: true
  },
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxLength: [100, 'Title cannot exceed 100 characters']
  },
  
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
    maxLength: [500, 'Description cannot exceed 500 characters']
  },
  
  sizes: [{
    type: String,
    enum: {
      values: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
      message: 'Invalid size. Available sizes: XS, S, M, L, XL, XXL, XXXL'
    },
    required: true
  }],
  
  colors: [{
    type: String,
    required: true,
    trim: true
  }],
  
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price must be positive']
  },
  
  stock: {
    type: Number,
    default: 0,
    min: [0, 'Stock cannot be negative']
  },
  
  image: {
    type: String,
    default: 'default-tshirt.jpg'
  },
  
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Pre-save middleware to auto-increment customId
tShirtSchema.pre('save', async function(next) {
  if (!this.customId) {
    try {

      const lastTShirt = await this.constructor.findOne({}, {}, { sort: { 'customId': -1 } });
      

      this.customId = lastTShirt ? lastTShirt.customId + 1 : 0;
    } catch (error) {
      return next(error);
    }
  }
  next();
});

tShirtSchema.index({ title: 1, isActive: 1 });

tShirtSchema.virtual('formattedPrice').get(function() {
  return `$${this.price.toFixed(2)}`;
});

tShirtSchema.methods.isVariantAvailable = function(size, color) {
  return this.sizes.includes(size) && this.colors.includes(color) && this.stock > 0;
};


tShirtSchema.statics.findActive = function() {
  return this.find({ isActive: true });
};

tShirtSchema.statics.toggleAllActive = async function() {
  try {
    
    const allTShirts = await this.find({}, { isActive: 1 });
    
    const result = await this.updateMany(
      {}, // Empty filter = all documents
      [
        {
          $set: {
            isActive: { $not: "$isActive" } // Toggle: true becomes false, false becomes true
          }
        }
      ]
    );
    
    return {
      success: true,
      modifiedCount: result.modifiedCount,
      message: `Toggled isActive status for ${result.modifiedCount} T-shirts`
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
};



module.exports = mongoose.model('TShirt', tShirtSchema);