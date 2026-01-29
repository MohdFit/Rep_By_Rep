const mongoose = require('mongoose');
require('dotenv').config();

const User = require('../models/user');
const Plan = require('../models/plan');
const Order = require('../models/order');
const OrderItem = require('../models/orderItem');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB connected for seeding');
  } catch (err) {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1);
  }
};

const seedData = async () => {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Plan.deleteMany({});
    await Order.deleteMany({});
    await OrderItem.deleteMany({});
    console.log('🗑️ Cleared existing data');

    // Create sample users
    const user = await User.create({
      fullName: 'Faisal Ratrout',
      email: 'faisal.mohratrout@gmail.com',
      password: 'pass123', // Will be hashed by pre-save hook
      phone: '0796190362',
    });
    console.log('✅ Created sample user');

    // Create sample plans
    const plans = await Plan.insertMany([
      {
        title: 'Beginner Plan',
        description: 'Perfect for fitness beginners',
        duration: 4,
        price: 29.99,
        level: 'Beginner',
      },
      {
        title: 'Intermediate Plan',
        description: 'For intermediate fitness enthusiasts',
        duration: 8,
        price: 49.99,
        level: 'Intermediate',
      },
      {
        title: 'Pro Plan',
        description: 'For serious athletes',
        duration: 12,
        price: 79.99,
        level: 'Pro',
      },
    ]);
    console.log('✅ Created sample plans');

    // Create sample order items
    const orderItems = await OrderItem.insertMany([
      {
        productId: plans[0]._id,
        productType: 'Plan',
        quantity: 1,
        price: plans[0].price,
      },
      {
        productId: plans[1]._id,
        productType: 'Plan',
        quantity: 1,
        price: plans[1].price,
      },
    ]);
    console.log('✅ Created sample order items');

    // Create sample order
    const order = await Order.create({
      userId: user._id,
      orderItems: orderItems.map(item => item._id),
      orderNumber: `ORD-${Date.now()}`,
      totalPrice: plans[0].price + plans[1].price,
      status: 'Pending',
      paymentStatus: 'Pending',
    });
    console.log('✅ Created sample order');

    console.log('\n✅ Database seeded successfully!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seeding failed:', err.message);
    process.exit(1);
  }
};

connectDB();
seedData();
