import { useEffect, useState } from 'react'
import axios from 'axios'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import AboutSection from './components/AboutSection'
import FeaturedDestinations from './components/FeaturedDestinations'
import FleetServices from './components/FleetServices'
import BlogAndReviews from './components/BlogAndReviews'
import SmartRecommendations from './components/SmartRecommendations'
import DestinationExplorer from './components/DestinationExplorer'
import DestinationDetail from './components/DestinationDetail'
import ServiceDetail from './components/ServiceDetail'
import ServiceSelection from './components/ServiceSelection'
import AboutDetail from './components/AboutDetail'
import BlogDetail from './components/BlogDetail'
import ReviewsPage from './components/ReviewsPage'
import Login from './components/Login'
import Booking from './components/Booking'
import Dashboard from './components/Dashboard'
import Footer from './components/Footer'
import { API_BASE } from './api'

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [destinations, setDestinations] = useState([])
  const [selectedDestination, setSelectedDestination] = useState(null)
  const [selectedService, setSelectedService] = useState(null)
  const [selectedBlog, setSelectedBlog] = useState(null)
  const [user, setUser] = useState(null)
  const [demoUserId, setDemoUserId] = useState(null)
  const [language, setLanguage] = useState('EN')
  const [currency, setCurrency] = useState('USD')
  const [loadError, setLoadError] = useState('')

  useEffect(() => {
    const bootstrap = async () => {
      setLoadError('')
      try {
        const demoRes = await axios.get(`${API_BASE}/demo/user`).catch(() => ({
          data: { userId: '507f1f77bcf86cd799439011', user: { name: 'Demo Traveler', email: 'explorer@demo.local' } },
        }))
        const demoPayload = demoRes.data || {}
        setUser(demoPayload.user || { name: 'Demo Traveler', email: 'explorer@demo.local' })
        setDemoUserId(demoPayload.userId || '507f1f77bcf86cd799439011')

        try {
          const destRes = await axios.get(`${API_BASE}/destinations`)
          setDestinations(Array.isArray(destRes.data) ? destRes.data : [])
        } catch (err) {
          console.error(err)
          setDestinations([])
          setLoadError(
            `Unable to load tour data. Please ensure the backend server is running on port 6005.`,
          )
        }
      } catch (err) {
        console.error(err)
        setUser({ name: 'Demo Traveler', email: 'explorer@demo.local' })
        setDemoUserId('user1')
        setLoadError(`Cannot reach API (${err.message || 'network error'}).`)
        setDestinations([])
      }
    }

    bootstrap()
  }, [])

  const handleLogout = () => {
    setUser(null)
    setDemoUserId(null)
    setCurrentPage('home')
  }

  const handleLogin = (userData, userId) => {
    setUser(userData)
    setDemoUserId(userId)
    setCurrentPage('home')
  }

  const renderPage = () => {
    // Auth Gate: If no user is logged in, force the Login page
    if (!user) {
      return (
        <Login
          onLogin={handleLogin}
          setCurrentPage={setCurrentPage}
          apiBase={API_BASE}
        />
      )
    }

    switch (currentPage) {
      case 'home':
        return (
          <>
            <Hero setCurrentPage={setCurrentPage} destinations={destinations} />
            <AboutSection setCurrentPage={setCurrentPage} />
            <FeaturedDestinations
              destinations={destinations}
              onSelectDestination={setSelectedDestination}
              setCurrentPage={setCurrentPage}
              currency={currency}
            />
            <div className="max-w-6xl mx-auto"><hr className="border-gray-300" /></div>
            <FleetServices setCurrentPage={setCurrentPage} onSelectService={setSelectedService} />
            <AboutSection setCurrentPage={setCurrentPage} />
            <BlogAndReviews setCurrentPage={setCurrentPage} onSelectBlog={setSelectedBlog} />
          </>
        )
      case 'explorer':
        return (
          <DestinationExplorer
            destinations={destinations}
            onSelectDestination={setSelectedDestination}
            setCurrentPage={setCurrentPage}
            currency={currency}
          />
        )
      case 'details':
        return (
          <DestinationDetail
            destination={selectedDestination}
            setCurrentPage={setCurrentPage}
            currency={currency}
          />
        )
      case 'service-details':
        return (
          <ServiceDetail
            service={selectedService}
            setCurrentPage={setCurrentPage}
          />
        )
      case 'service-selection':
        return (
          <ServiceSelection
            destination={selectedDestination}
            onSelectService={setSelectedService}
            setCurrentPage={setCurrentPage}
          />
        )
      case 'about':
        return (
          <AboutDetail
            setCurrentPage={setCurrentPage}
          />
        )
      case 'login':
        return (
          <Login
            onLogin={handleLogin}
            setCurrentPage={setCurrentPage}
            apiBase={API_BASE}
          />
        )
      case 'reviews':
        return (
          <ReviewsPage
            setCurrentPage={setCurrentPage}
          />
        )
      case 'blog-detail':
        return (
          <BlogDetail
            blog={selectedBlog}
            setCurrentPage={setCurrentPage}
          />
        )
      case 'recommendations':
        return (
          <SmartRecommendations
            destinations={destinations}
            onSelectDestination={setSelectedDestination}
            setCurrentPage={setCurrentPage}
            currency={currency}
          />
        )
      case 'booking':
        return (
          <Booking
            destination={selectedDestination}
            service={selectedService}
            setCurrentPage={setCurrentPage}
            currency={currency}
            apiBase={API_BASE}
            userId={demoUserId}
          />
        )
      case 'dashboard':
        return (
          <Dashboard
            user={user}
            destinations={destinations}
            setCurrentPage={setCurrentPage}
            apiBase={API_BASE}
            userId={demoUserId}
          />
        )
      case 'client-dashboard':
        return <ClientDashboard user={user} apiBase={API_BASE} />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        user={user}
        onLogout={handleLogout}
        language={language}
        setLanguage={setLanguage}
        currency={currency}
        setCurrency={setCurrency}
      />
      {loadError ? (
        <div className="bg-amber-50 border-b border-amber-200 text-amber-900 text-center py-3 px-4 text-sm">
          {loadError}
        </div>
      ) : null}
      <main>{renderPage()}</main>
      <Footer setCurrentPage={setCurrentPage} user={user} />
    </div>
  )
}

export default App
