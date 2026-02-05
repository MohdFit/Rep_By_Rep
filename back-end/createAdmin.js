// Script to create an admin user in the database
const mongoose = require('mongoose');
const User = require('./models/user');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/rep_by_rep';

async function createAdmin() {
  await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

  const exists = await User.findOne({ role: 'admin' });
  if (exists) {
    console.log('Admin user already exists:', exists.email || exists.fullName);
    process.exit(0);
  }

  const admin = new User({
    fullName: 'Admin',
    email: 'admin@admin.com',
    password: 'admin123',
    role: 'admin',
    isActive: true
  });
  await admin.save();
  console.log('Admin user created: admin@admin.com / password: admin123');
  process.exit(0);
}

createAdmin().catch(e => {
  console.error(e);
  process.exit(1);
});
