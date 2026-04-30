const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const dns = require('dns');
require('dotenv').config();

// Fix for querySrv ECONNREFUSED in some network environments
dns.setServers(['8.8.8.8', '8.8.4.4']);

const app = express();
const PORT = process.env.PORT || 6005;

app.use(cors());
app.use(express.json());

// ✅ MongoDB URI from .env
const mongoUri = process.env.MONGODB_URI;

mongoose.connect(mongoUri, {
  serverSelectionTimeoutMS: 10000,
})
  .then(() => console.log("MongoDB connected"))
  .catch(err => {
    console.error("❌ MongoDB connection failed:");
    console.error(err);
  });

// Routes
app.use('/api/destinations', require('./routes/destinations'));
app.use('/api/bookings', require('./routes/bookings'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/workers', require('./routes/workers'));
app.use('/api/demo', require('./routes/demo'));

// Frontend handling
const campaignDist = path.join(__dirname, '..', 'tourist-destination-campaign', 'dist');
const spaIndex = path.join(campaignDist, 'index.html');
const spaReady = fs.existsSync(spaIndex);

if (spaReady) {
  app.use(express.static(campaignDist));
  app.use((req, res, next) => {
    if ((req.method !== 'GET' && req.method !== 'HEAD') || req.path.startsWith('/api')) {
      return next();
    }
    res.sendFile(spaIndex);
  });
} else {
  app.get('/', (req, res) => {
    res.type('text').send(
      'Ethio Tourist Destination API — run "npm run build" first.'
    );
  });
}

// ✅ SERVER START
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
