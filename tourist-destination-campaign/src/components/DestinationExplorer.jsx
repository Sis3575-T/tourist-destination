import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function applyFilters(destinations, filters) {
  let filtered = destinations

  if (filters.search) {
    const q = filters.search.toLowerCase()
    filtered = filtered.filter(
      (dest) =>
        dest.name.toLowerCase().includes(q) ||
        dest.location.toLowerCase().includes(q) ||
        dest.description.toLowerCase().includes(q),
    )
  }

  if (filters.budget) {
    const budgetLimit = parseInt(filters.budget, 10)
    filtered = filtered.filter((dest) => dest.price <= budgetLimit)
  }

  if (filters.category) {
    filtered = filtered.filter((dest) => dest.category === filters.category)
  }

  if (filters.duration) {
    const filterDays = parseInt(filters.duration, 10)
    filtered = filtered.filter((dest) => {
      const rangeMatch = dest.duration.match(/(\d+)\s*-\s*(\d+)/)
      const singleMatch = dest.duration.match(/(\d+)\s*days?/i)
      if (rangeMatch) {
        const minDays = parseInt(rangeMatch[1], 10)
        const maxDays = parseInt(rangeMatch[2], 10)
        return filterDays >= minDays && filterDays <= maxDays
      }
      if (singleMatch) {
        const d = parseInt(singleMatch[1], 10)
        return d <= filterDays
      }
      return false
    })
  }

  return filtered
}

const DestinationExplorer = ({ destinations, onSelectDestination, setCurrentPage, currency }) => {
  const [filters, setFilters] = useState({
    search: '',
    budget: '',
    category: '',
    duration: '',
  })

  const filteredDestinations = useMemo(() => applyFilters(destinations, filters), [destinations, filters])

  const currencyRates = { USD: 1, EUR: 0.92, GBP: 0.79, ETB: 55 }
  const currencySymbols = { USD: '$', EUR: '€', GBP: '£', ETB: 'Br' }

  const formatPrice = (price) => {
    const rate = currencyRates[currency] || 1
    const symbol = currencySymbols[currency] || '$'
    return `${symbol}${Math.round(price * rate).toLocaleString()}`
  }

  const handleBookNow = (destination) => {
    onSelectDestination(destination)
    setCurrentPage('service-selection')
  }

  const handleViewDetails = (destination) => {
    onSelectDestination(destination)
    setCurrentPage('details')
  }

  return (
    <div className="min-h-screen bg-[#fcfbf7] py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-extrabold text-[#2d3e23] mb-4 tracking-tight">Explore Our Destinations</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto font-light">
            Curated journeys across Ethiopia, Djibouti, and the Horn of Africa.
          </p>
        </motion.div>

        {/* Premium Filter Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass rounded-3xl p-8 mb-12 shadow-xl"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Search</label>
              <input
                type="text"
                placeholder="Where to?"
                value={filters.search}
                onChange={(e) => setFilters((f) => ({ ...f, search: e.target.value }))}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#d4af37] transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Budget</label>
              <select
                value={filters.budget}
                onChange={(e) => setFilters((f) => ({ ...f, budget: e.target.value }))}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#d4af37] transition-all cursor-pointer"
              >
                <option value="">Any Budget</option>
                <option value="500">$0 - $500</option>
                <option value="1000">$500 - $1000</option>
                <option value="1500">$1000 - $1500</option>
                <option value="2000">$1500+</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Experience</label>
              <select
                value={filters.category}
                onChange={(e) => setFilters((f) => ({ ...f, category: e.target.value }))}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#d4af37] transition-all cursor-pointer"
              >
                <option value="">All Categories</option>
                {['Camping Tours', 'Cultural Tours', 'Adventure Trips', 'Nature Tours', 'Coastal & Marine', 'City & Heritage'].map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Duration</label>
              <select
                value={filters.duration}
                onChange={(e) => setFilters((f) => ({ ...f, duration: e.target.value }))}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#d4af37] transition-all cursor-pointer"
              >
                <option value="">Any Duration</option>
                <option value="3">Up to 3 days</option>
                <option value="7">Up to 7 days</option>
                <option value="14">Up to 14 days</option>
              </select>
            </div>
          </div>
        </motion.div>

        <div className="flex items-center justify-between mb-10">
          <p className="text-gray-500 font-medium">
            Found <span className="text-[#2d3e23] font-bold">{filteredDestinations.length}</span> destinations
          </p>
        </div>

        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          <AnimatePresence>
            {filteredDestinations.map((destination, idx) => (
              <motion.div 
                key={destination._id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="group bg-white rounded-[2rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 flex flex-col"
              >
                <div className="relative h-64 overflow-hidden">
                  <motion.img
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm text-[#2d3e23] px-4 py-2 rounded-2xl text-lg font-bold shadow-lg">
                    {formatPrice(destination.price)}
                  </div>
                  <div className="absolute bottom-6 left-6">
                    <span className="bg-[#d4af37] text-white px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase">
                      {destination.category}
                    </span>
                  </div>
                </div>

                <div className="p-8 flex-1 flex flex-col">
                  <h3 className="text-2xl font-bold text-[#2d3e23] mb-2">{destination.name}</h3>
                  <div className="flex items-center text-gray-500 text-sm mb-4">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                    {destination.location}
                  </div>
                  <p className="text-gray-600 mb-6 font-light leading-relaxed line-clamp-3">
                    {destination.description}
                  </p>

                  <div className="mt-auto pt-6 border-t border-gray-50 flex items-center justify-between">
                    <div className="flex items-center text-gray-400 text-sm">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                      {destination.duration}
                    </div>
                    <div className="flex space-x-3">
                      <button
                        onClick={() => handleViewDetails(destination)}
                        className="flex-1 border border-[#2d3e23] text-[#2d3e23] px-6 py-2.5 rounded-xl hover:bg-[#2d3e23] hover:text-white transition-all font-bold text-sm"
                      >
                        View Details
                      </button>
                      <button
                        onClick={() => handleBookNow(destination)}
                        className="bg-[#2d3e23] text-white px-6 py-2.5 rounded-xl hover:bg-[#3d4a35] transition-all font-bold text-sm shadow-md"
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredDestinations.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-gray-500 text-xl font-light">No destinations match your filters. Try exploring something new.</p>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default DestinationExplorer
