const mongoose = require('mongoose');
const Destination = require('./models/Destination');
const Blog = require('./models/Blog');
const Review = require('./models/Review');
const Fleet = require('./models/Fleet');
const destinationSeedData = require('./data/destinations');
const blogSeedData = require('./data/blogs');
const reviewSeedData = require('./data/reviews');
const fleetSeedData = require('./data/fleet');
const dns = require('dns');
require('dotenv').config();

// Fix for querySrv ECONNREFUSED in some network environments
dns.setServers(['8.8.8.8', '8.8.4.4']);

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 15000,
      family: 4,
    });
    console.log('Connected to MongoDB');

    // Clear existing data
    await Destination.deleteMany({});
    await Blog.deleteMany({});
    await Review.deleteMany({});
    await Fleet.deleteMany({});
    console.log('Cleared existing data');

    // Insert seed data
    await Destination.insertMany(destinationSeedData);
    console.log(`✅ ${destinationSeedData.length} destinations inserted`);

    await Blog.insertMany(blogSeedData);
    console.log(`✅ ${blogSeedData.length} blogs inserted`);

    await Review.insertMany(reviewSeedData);
    console.log(`✅ ${reviewSeedData.length} reviews inserted`);

    await Fleet.insertMany(fleetSeedData);
    console.log(`✅ ${fleetSeedData.length} fleet items inserted`);

    console.log('\nDatabase seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await mongoose.connection.close();
    console.log('Database connection closed');
  }
}

seedDatabase();
