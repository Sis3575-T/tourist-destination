const mongoose = require('mongoose');

const destinationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
    enum: [
      'Ethiopia', 'Somalia', 'Djibouti', 'Eritrea', 
      'Tanzania', 'Kenya', 'Uganda', 'Rwanda', 
      'Burundi', 'South Sudan', 'Comoros', 'Madagascar', 
      'Seychelles', 'Mauritius'
    ],
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  bestSeason: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: [
      'Camping Tours',
      'Cultural Tours',
      'Adventure Trips',
      'Nature Tours',
      'Coastal & Marine',
      'City & Heritage',
    ],
    required: true,
  },
  image: {
    type: String, // URL to image
  },
  activities: [String],
  duration: String,
  distanceFromAddis: Number,
}, {
  timestamps: true,
});

module.exports = mongoose.model('Destination', destinationSchema);