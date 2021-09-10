const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/devflow';

const seedData = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB connected for seeding...');

    const userCount = await User.countDocuments();
    if (userCount === 0) {
      const user = await User.create({
        name: 'Demo User',
        email: 'demo@example.com',
        avatar: 'https://i.pravatar.cc/150?u=demo'
      });
      console.log('Seeded Demo User:', user._id);
    } else {
      const user = await User.findOne();
      console.log('User already exists:', user._id);
    }

    process.exit();
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedData();
