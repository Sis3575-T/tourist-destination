const mongoose = require('mongoose');
const Destination = require('./models/Destination');
const Fleet = require('./models/Fleet');
const { downloadAllImages } = require('./utils/imageDownloader');
const destinationSeedData = require('./data/destinations');
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
    await Fleet.deleteMany({});
    console.log('Cleared existing data');

    // Download images and update paths
    console.log('\nDownloading destination images...');
    const destResults = await downloadAllImages(destinationSeedData, 'destination');
    const destWithLocalImages = destinationSeedData.map((dest, idx) => {
      const result = destResults[idx];
      if (result.status === 'success') {
        return { ...dest, image: result.localPath };
      }
      return dest;
    });

    console.log('\nDownloading fleet images...');
    const fleetResults = await downloadAllImages(fleetSeedData, 'fleet');
    const fleetWithLocalImages = fleetSeedData.map((item, idx) => {
      const result = fleetResults[idx];
      if (result.status === 'success') {
        return { ...item, image: result.localPath };
      }
      return item;
    });

    // Insert seed data with local image paths
    await Destination.insertMany(destWithLocalImages);
    console.log(`✅ ${destWithLocalImages.length} destinations inserted with local images`);

    await Fleet.insertMany(fleetWithLocalImages);
    console.log(`✅ ${fleetWithLocalImages.length} fleet items inserted with local images`);

    // Print download results
    console.log('\nImage Download Results:');
    console.log('Destinations:');
    destResults.forEach(r => console.log(`  ${r.id}: ${r.status} ${r.error || r.filename || ''}`));
    console.log('\nFleet:');
    fleetResults.forEach(r => console.log(`  ${r.id}: ${r.status} ${r.error || r.filename || ''}`));

    console.log('\nDatabase seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await mongoose.connection.close();
    console.log('Database connection closed');
  }
}

seedDatabase();
