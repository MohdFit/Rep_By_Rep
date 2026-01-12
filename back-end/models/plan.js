const mongoose = require('mongoose');

const planSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Plan title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  
  description: {
    type: String,
    required: [true, 'Plan description is required'],
    trim: true,
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  
  price: {
    type: Number,
    required: [true, 'Plan price is required'],
    min: [0, 'Price cannot be negative'],
    validate: {
      validator: function(value) {
        return Number(value.toFixed(2)) === value;
      },
      message: 'Price can only have up to 2 decimal places'
    }
  },
  
  level: {
    type: String,
    required: [true, 'Plan level is required'],
    enum: {
      values: ['Beginner', 'Intermediate', 'Pro'],
      message: 'Level must be either Beginner, Intermediate, or Pro'
    }
  },
   isActive: {
    type: Boolean,
    default: true
  },
  
  duration: {
    type: Number, // Duration in weeks
    required: [true, 'Plan duration is required'],
    min: [1, 'Duration must be at least 1 week']
  }}
)

planSchema.index({ level: 1, isActive: 1 });
planSchema.index({ price: 1 });

planSchema.statics.findByLevel = function(level) {
  return this.find({ level: level, isActive: true });
};

planSchema.statics.findAvailableInPriceRange = function(minPrice, maxPrice) {
  return this.find({
    price: { $gte: minPrice, $lte: maxPrice },
    isActive: true
  });
};

module.exports = mongoose.model('Plan', planSchema);