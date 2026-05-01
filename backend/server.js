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

// Allow requests from frontend origin
const allowedOrigins = [
  'https://tourist-destination-2.onrender.com',
  process.env.CLIENT_URL,
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, curl, server-to-server)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    callback(new Error(`CORS blocked: ${origin}`));
  },
  credentials: true,
}));
app.use(express.json());

// MongoDB
const mongoUri = process.env.MONGODB_URI;
mongoose.connect(mongoUri, {
  serverSelectionTimeoutMS: 10000,
})
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => {
    console.error('❌ MongoDB connection failed:');
    console.error(err);
  });

// API Routes — must be registered BEFORE static files
app.use('/api/destinations', require('./routes/destinations'));
app.use('/api/bookings', require('./routes/bookings'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/workers', require('./routes/workers'));
app.use('/api/demo', require('./routes/demo'));
app.use('/api/blogs', require('./routes/blogs'));
app.use('/api/reviews', require('./routes/reviews'));
app.use('/api/fleet', require('./routes/fleet'));

// Serve built React frontend (production)
const campaignDist = path.join(__dirname, '..', 'tourist-destination-campaign', 'dist');
const spaIndex = path.join(campaignDist, 'index.html');

if (fs.existsSync(spaIndex)) {
  app.use(express.static(campaignDist));
  // All non-API GET requests → React app (client-side routing)
  app.get('*', (req, res) => {
    if (req.path.startsWith('/api')) return res.status(404).json({ message: 'Not found' });
    res.sendFile(spaIndex);
  });
} else {
  app.get('/', (req, res) => {
    res.type('text').send('Ethio Tourist Destination API — run "npm run build" first.');
  });
}

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  console.log(`📦 Booking model: v2 (servicePreview, totalAmount, nationality, paymentMethod)`);
});
