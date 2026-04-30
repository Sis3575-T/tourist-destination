# Ethio Tourist Destination

A full-stack web application for promoting East African tourism, inspired by Brand USA. This platform showcases destinations across Ethiopia, Somalia, Djibouti, and Eritrea, provides personalized recommendations, and enables trip planning and booking.

## 🚀 Features

### Core Features
- **Hero Section**: Stunning Ethiopian landscapes with call-to-action
- **Destination Explorer**: Search and filter destinations by budget, category, duration
- **Smart Recommendations**: AI-like logic for personalized trip suggestions
- **Booking System**: Complete booking flow with traveler details
- **User Dashboard**: Trip history, favorites, and profile management
- **Responsive Design**: Mobile-first approach with Tailwind CSS

### Destination Categories
- **Camping Tours**: Wilderness adventures and camping experiences
- **Cultural Tours**: Historical sites and traditional experiences
- **Adventure Trips**: Thrilling activities and natural wonders

## 🛠️ Technology Stack

### Frontend
- **React 19** with Vite
- **Tailwind CSS** for styling
- **Axios** for API calls
- **React Router** (planned for future)

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose
- **CORS** for cross-origin requests
- **Dotenv** for environment variables

## 📁 Project Structure

```
tourist-destination/
├── tourist-destination-campaign/  # Frontend (React + Vite)
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── FeaturedDestinations.jsx
│   │   │   ├── Categories.jsx
│   │   │   ├── SmartRecommendations.jsx
│   │   │   ├── DestinationExplorer.jsx
│   │   │   ├── Booking.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   └── Footer.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   └── vite.config.js
└── backend/                      # Backend (Node.js + Express)
    ├── models/
    │   ├── User.js
    │   ├── Destination.js
    │   └── Booking.js
    ├── routes/
    │   ├── destinations.js
    │   └── bookings.js
    ├── server.js
    ├── package.json
    └── .env
```

## 🏃‍♂️ Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd tourist-destination
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   # Create .env file with your MongoDB URI
   echo "MONGODB_URI=mongodb://localhost:27017/anbessa-tourism" > .env
   npm start
   ```

3. **Setup Frontend** (in a new terminal)
   ```bash
   cd ../tourist-destination-campaign
   npm install
   npm run dev
   ```

4. **Access the application**
   - Frontend: http://localhost:5173 or http://localhost:5174 (Vite default)
   - Backend API: http://localhost:6000 — set `MONGODB_URI` in `backend/.env` to your [MongoDB Atlas](https://www.mongodb.com/docs/atlas/) connection string

## 🎯 Smart Recommendation Algorithm

The platform uses a simple yet effective recommendation system:

1. **Budget Filtering**: Excludes destinations above user's budget
2. **Interest Matching**: Prioritizes destinations matching user's interests
3. **Season Optimization**: Boosts recommendations for optimal seasons
4. **Relevance Scoring**: Ranks results based on multiple criteria

## 📊 Database Schema

### Destinations Collection
```javascript
{
  name: String,
  location: String,
  description: String,
  price: Number,
  bestSeason: String,
  category: String, // "Camping Tours" | "Cultural Tours" | "Adventure Trips"
  image: String,
  activities: [String],
  duration: String
}
```

### Bookings Collection
```javascript
{
  userId: ObjectId,
  destinationId: ObjectId,
  date: Date,
  status: String, // "pending" | "confirmed" | "cancelled"
  travelers: Number,
  specialRequests: String
}
```

## 🔮 Future Enhancements

- **AI Chatbot**: Tourist assistance and recommendations
- **Real-time Weather**: Weather integration for destinations
- **Payment Integration**: Chapa payment gateway
- **Mobile App**: React Native version
- **User Authentication**: JWT-based auth system
- **Admin Panel**: Content management system
- **Reviews & Ratings**: User feedback system

## 🌍 Ethiopian Destinations Featured

- **Lalibela Rock Churches**: UNESCO World Heritage site
- **Danakil Depression**: Surreal volcanic landscapes
- **Simien Mountains**: UNESCO National Park with camping
- **Axum Obelisks**: Ancient historical monuments
- **Blue Nile Falls**: Majestic waterfalls
- **Erta Ale Volcano**: Active volcano experiences

## 📈 Success Metrics

- User engagement and session duration
- Booking conversion rates
- Destination popularity analytics
- User satisfaction scores
- Revenue from bookings

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Inspired by Brand USA's digital tourism approach
- Ethiopian Tourism Commission for destination data
- Unsplash for beautiful imagery
- Open source community for amazing tools

---

**Made with ❤️ for Ethiopia's tourism industry**