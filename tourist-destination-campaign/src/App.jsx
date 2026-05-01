import { useEffect, useState } from 'react'
import axios from 'axios'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import AboutSection from './components/AboutSection'
import FeaturedDestinations from './components/FeaturedDestinations'
import FleetServices from './components/FleetServices'
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
import Footer from './components/Footer'
import { API_BASE } from './api'

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [destinations, setDestinations] = useState([])
  const [selectedDestination, setSelectedDestination] = useState(null)
  const [selectedService, setSelectedService] = useState(null)
  const [selectedBlog, setSelectedBlog] = useState(null)
  const [demoUserId] = useState('507f1f77bcf86cd799439011')
  const [language, setLanguage] = useState('EN')
  const [currency, setCurrency] = useState('USD')
  const [loadError, setLoadError] = useState('')

  useEffect(() => {
    const bootstrap = async () => {
      setLoadError('')
      try {
        const destRes = await axios.get(`${API_BASE}/destinations`)
        setDestinations(Array.isArray(destRes.data) ? destRes.data : [])
      } catch (err) {
        console.error(err)
        setDestinations([])
        setLoadError('Unable to load tour data. Please ensure the backend server is running.')
      }
    }
    bootstrap()
  }, [])

  // Scroll to top on page change
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
            <FeaturedDestinations
              destinations={destinations}
              onSelectDestination={setSelectedDestination}
              setCurrentPage={setCurrentPage}
              currency={currency}
            />
            <TrustSection setCurrentPage={setCurrentPage} />
            <FleetServices setCurrentPage={setCurrentPage} onSelectService={setSelectedService} />
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
        return <AboutDetail setCurrentPage={setCurrentPage} />
      case 'reviews':
        return <ReviewsPage setCurrentPage={setCurrentPage} />
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
            destinations={destinations}
            setCurrentPage={setCurrentPage}
            apiBase={API_BASE}
            userId={demoUserId}
          />
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        language={language}
        setLanguage={setLanguage}
        currency={currency}
        setCurrency={setCurrency}
      />
      {loadError && (
        <div className="bg-amber-50 border-b border-amber-200 text-amber-900 text-center py-3 px-4 text-sm font-medium">
          ⚠️ {loadError}
        </div>
      )}
      <main>{renderPage()}</main>
      <Footer setCurrentPage={setCurrentPage} />
    </div>
  )
}

export default App
