const mongoose = require('mongoose');
const Destination = require('./models/Destination');
const destinationSeedData = require('./data/destinations');
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
    console.log('Cleared existing destinations');

    // Insert sample data
    await Destination.insertMany(destinationSeedData);
    console.log('Sample destinations inserted successfully');

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await mongoose.connection.close();
    console.log('Database connection closed');
  }
}

seedDatabase();