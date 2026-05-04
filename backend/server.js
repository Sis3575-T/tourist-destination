const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const dns = require('dns');
require('dotenv').config();

dns.setServers(['8.8.8.8', '8.8.4.4']);

const app = express();
const PORT = process.env.PORT || 6005;

// CORS — accept all onrender.com origins + any configured CLIENT_URL
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile, curl, server-to-server)
    if (!origin) return callback(null, true);
    // Allow any onrender.com subdomain
    if (origin.endsWith('.onrender.com')) return callback(null, true);
    // Allow localhost for development
    if (origin.startsWith('http://localhost')) return callback(null, true);
    // Allow configured CLIENT_URL
    if (process.env.CLIENT_URL && origin === process.env.CLIENT_URL) return callback(null, true);
    // Block everything else
    callback(new Error(`CORS blocked: ${origin}`));
  },
  credentials: true,
}));
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));

// MongoDB
mongoose.connect(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 10000 })
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection failed:', err));

// Health check — shows connection status
app.get('/api/health', async (req, res) => {
  const mongoState = ['disconnected','connected','connecting','disconnecting']
  res.json({
    status: 'ok',
    mongo: mongoState[mongoose.connection.readyState] || 'unknown',
    mongoUri: process.env.MONGODB_URI ? process.env.MONGODB_URI.replace(/:([^@]+)@/, ':***@') : 'NOT SET',
    email: process.env.EMAIL_PASS ? 'configured' : 'not configured',
    time: new Date().toISOString(),
  })
})

// API Routes
app.use('/api/destinations', require('./routes/destinations'));
app.use('/api/bookings',     require('./routes/bookings'));
app.use('/api/auth',         require('./routes/auth'));
app.use('/api/workers',      require('./routes/workers'));
app.use('/api/demo',         require('./routes/demo'));
app.use('/api/blogs',        require('./routes/blogs'));
app.use('/api/reviews',      require('./routes/reviews'));
app.use('/api/fleet',        require('./routes/fleet'));
app.use('/api/messages',     require('./routes/messages'));

// Test email endpoint — GET /api/test-email?to=someone@gmail.com
app.get('/api/test-email', async (req, res) => {
  try {
    const { sendBookingConfirmation } = require('./utils/emailService');
    const to = req.query.to || 'sisay3575@gmail.com';
    await sendBookingConfirmation({
      to,
      name: 'Test Traveler',
      destination: 'Lalibela Rock-Hewn Churches',
      ref: 'TEST001',
      status: 'confirmed',
      adminNote: 'This is a test email from EthioTour.',
      rejectionReason: '',
    });
    res.json({ success: true, message: `Email sent to ${to}` });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Auto-seed empty collections on first startup
async function autoSeed() {
  try {
    const Destination = require('./models/Destination');
    const Fleet       = require('./models/Fleet');
    const Blog        = require('./models/Blog');
    const Review      = require('./models/Review');

    const fleetData   = require('./data/fleet');
    const reviewData  = require('./data/reviews');

    const [dCount, fCount, bCount, rCount] = await Promise.all([
      Destination.countDocuments(),
      Fleet.countDocuments(),
      Blog.countDocuments(),
      Review.countDocuments(),
    ]);

    if (dCount === 0) {
      await Destination.insertMany(require('./data/destinations'));
      console.log('✅ Auto-seeded destinations');
    }

    // Always re-seed fleet if count doesn't match (new vehicles added)
    if (fCount !== fleetData.length) {
      await Fleet.deleteMany({});
      await Fleet.insertMany(fleetData);
      console.log(`✅ Auto-seeded fleet (${fleetData.length} vehicles)`);
    }

    if (bCount === 0) {
      await Blog.insertMany(require('./data/blogs'));
      console.log('✅ Auto-seeded blogs');
    }

    // Always re-seed reviews if count doesn't match (new reviews added)
    if (rCount !== reviewData.length) {
      await Review.deleteMany({});
      await Review.insertMany(reviewData);
      console.log(`✅ Auto-seeded reviews (${reviewData.length} reviews)`);
    }
  } catch (err) {
    console.error('Auto-seed error:', err.message);
  }
}

// Run auto-seed once DB is connected
mongoose.connection.once('open', autoSeed);

// Serve static images
const publicDir = path.join(__dirname, 'public');
app.use('/images', express.static(path.join(publicDir, 'images')));

// Serve built React frontend (production)
const campaignDist = path.join(__dirname, '..', 'tourist-destination-campaign', 'dist');
const spaIndex = path.join(campaignDist, 'index.html');

if (fs.existsSync(spaIndex)) {
  app.use(express.static(campaignDist));
  app.get('/{*path}', (req, res) => {
    if (req.path.startsWith('/api')) return res.status(404).json({ message: 'Not found' });
    res.sendFile(spaIndex);
  });
} else {
  app.get('/', (req, res) => {
    res.type('text').send('Ethio Tourist Destination API — run "npm run build" first.');
  });
}

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT} — build ${Date.now()}`);
  console.log(`📧 Email: ${process.env.EMAIL_PASS ? 'Gmail ✅' : '⚠️ NOT CONFIGURED'}`);
});
