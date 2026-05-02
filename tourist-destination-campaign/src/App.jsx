import { useEffect, useState } from 'react'
import axios from 'axios'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import AboutSection from './components/AboutSection'
import FeaturedDestinations from './components/FeaturedDestinations'
import FleetServices from './components/FleetServices'
import FleetPage from './components/FleetPage'
import BlogAndReviews from './components/BlogAndReviews'
import TrustSection from './components/TrustSection'
import SmartRecommendations from './components/SmartRecommendations'
import DestinationExplorer from './components/DestinationExplorer'
import DestinationDetail from './components/DestinationDetail'
import ServiceDetail from './components/ServiceDetail'
import ServiceSelection from './components/ServiceSelection'
import AboutDetail from './components/AboutDetail'
import BlogDetail from './components/BlogDetail'
import ReviewsPage from './components/ReviewsPage'
import Booking from './components/Booking'
import Dashboard from './components/Dashboard'
import AdminPanel from './components/AdminPanel'
import ContactForm from './components/ContactForm'
import Login from './components/Login'
import Footer from './components/Footer'
import { API_BASE } from './api'

function App() {
  const [currentPage, setCurrentPage]           = useState('home')
  const [destinations, setDestinations]         = useState([])
  const [selectedDestination, setSelectedDestination] = useState(null)
  const [selectedService, setSelectedService]   = useState(null)
  const [selectedBlog, setSelectedBlog]         = useState(null)
  const [selectedDuration, setSelectedDuration] = useState(null)
  const [language, setLanguage]                 = useState('EN')
  const [currency, setCurrency]                 = useState('USD')
  const [loadError, setLoadError]               = useState('')

  // ── Auth state ──────────────────────────────────────────────
  const [user, setUser]     = useState(() => {
    try { return JSON.parse(localStorage.getItem('ethiotour_user')) || null } catch { return null }
  })
  const [userId, setUserId] = useState(() => localStorage.getItem('ethiotour_userId') || null)

  const handleLogin = (userData, uid) => {
    setUser(userData)
    setUserId(uid)
    localStorage.setItem('ethiotour_user', JSON.stringify(userData))
    localStorage.setItem('ethiotour_userId', uid)
    setCurrentPage('home')
  }

  const handleLogout = () => {
    setUser(null)
    setUserId(null)
    localStorage.removeItem('ethiotour_user')
    localStorage.removeItem('ethiotour_userId')
    setCurrentPage('home')
  }
  // ────────────────────────────────────────────────────────────

  useEffect(() => {
    axios.get(`${API_BASE}/destinations`)
      .then(res => setDestinations(Array.isArray(res.data) ? res.data : []))
      .catch(() => {
        setDestinations([])
        setLoadError('Unable to load tour data.')
      })
  }, [])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [currentPage])

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <>
            <Hero setCurrentPage={setCurrentPage} destinations={destinations} />
            <AboutSection setCurrentPage={setCurrentPage} />
            <FeaturedDestinations destinations={destinations} onSelectDestination={setSelectedDestination} setCurrentPage={setCurrentPage} currency={currency} />
            <TrustSection setCurrentPage={setCurrentPage} />
            <FleetServices setCurrentPage={setCurrentPage} onSelectService={setSelectedService} />
            <BlogAndReviews setCurrentPage={setCurrentPage} onSelectBlog={setSelectedBlog} />
          </>
        )
      case 'explorer':
        return <DestinationExplorer destinations={destinations} onSelectDestination={setSelectedDestination} setCurrentPage={setCurrentPage} currency={currency} />
      case 'details':
        return <DestinationDetail destination={selectedDestination} setCurrentPage={setCurrentPage} currency={currency} onDurationSelect={setSelectedDuration} />
      case 'fleet':
        return <FleetPage destinations={destinations} onSelectService={setSelectedService} onSelectDestination={setSelectedDestination} setCurrentPage={setCurrentPage} />
      case 'service-details':
        return <ServiceDetail service={selectedService} setCurrentPage={setCurrentPage} />
      case 'service-selection':
        return <ServiceSelection destination={selectedDestination} selectedDuration={selectedDuration} onSelectService={setSelectedService} setCurrentPage={setCurrentPage} />
      case 'about':
        return <AboutDetail setCurrentPage={setCurrentPage} />
      case 'reviews':
        return <ReviewsPage setCurrentPage={setCurrentPage} />
      case 'blog-detail':
        return <BlogDetail blog={selectedBlog} setCurrentPage={setCurrentPage} />
      case 'recommendations':
        return <SmartRecommendations destinations={destinations} onSelectDestination={setSelectedDestination} setCurrentPage={setCurrentPage} currency={currency} />
      case 'booking':
        return (
          <Booking
            destination={selectedDestination}
            service={selectedService}
            selectedDuration={selectedDuration}
            setCurrentPage={setCurrentPage}
            currency={currency}
            apiBase={API_BASE}
            userId={userId}
            travelerEmail={user?.email || ''}
          />
        )
      case 'dashboard':
        return (
          <Dashboard
            destinations={destinations}
            setCurrentPage={setCurrentPage}
            apiBase={API_BASE}
            userId={userId}
            user={user}
            onLogout={handleLogout}
          />
        )
      case 'login':
        return <Login onLogin={handleLogin} setCurrentPage={setCurrentPage} apiBase={API_BASE} />
      case 'contact':
        return <ContactForm setCurrentPage={setCurrentPage} prefillEmail={user?.email || ''} />
      case 'admin':
        return <AdminPanel apiBase={API_BASE} setCurrentPage={setCurrentPage} />
      default:
        return null
    }
  }

  const isAdmin = currentPage === 'admin'

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {!isAdmin && (
        <Navbar
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          language={language}
          setLanguage={setLanguage}
          currency={currency}
          setCurrency={setCurrency}
          user={user}
          onLogout={handleLogout}
        />
      )}
      {loadError && (
        <div className="bg-amber-50 border-b border-amber-200 text-amber-900 text-center py-3 px-4 text-sm font-medium">
          ⚠️ {loadError}
        </div>
      )}
      <main>{renderPage()}</main>
      {!isAdmin && <Footer setCurrentPage={setCurrentPage} />}
    </div>
  )
}

export default App
