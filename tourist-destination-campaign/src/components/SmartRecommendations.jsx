import { useState, useRef } from 'react'
import fallbackDestinations from '../data/destinations-fallback'
import { motion, AnimatePresence } from 'framer-motion'

const SmartRecommendations = ({ destinations, onSelectDestination, setCurrentPage, currency }) => {
  const [preferences, setPreferences] = useState({
    budget: '',
    interest: '',
    season: '',
    country: '',
  })
  const [recommendations, setRecommendations] = useState([])
  const [searched, setSearched] = useState(false)
  const [loading, setLoading] = useState(false)
  const resultsRef = useRef(null)

  const currencyRates = { USD: 1, EUR: 0.92, GBP: 0.79, ETB: 55 }
  const currencySymbols = { USD: '$', EUR: '€', GBP: '£', ETB: 'Br' }

  const formatPrice = (price) => {
    const rate = currencyRates[currency] || 1
    const symbol = currencySymbols[currency] || '$'
    return `${symbol}${Math.round(price * rate).toLocaleString()}`
  }

  const handlePreferenceChange = (field, value) => {
    setPreferences(prev => ({ ...prev, [field]: value }))
  }

  // Get unique countries from destinations
  const countries = [...new Set((destinations.length > 0 ? destinations : fallbackDestinations).map(d => d.country))].filter(Boolean).sort()

  const getRecommendations = () => {
    setLoading(true)
    setSearched(false)

    // Small delay for UX feedback
    setTimeout(() => {
      const sourceList = (Array.isArray(destinations) && destinations.length > 0) ? destinations : fallbackDestinations

      const scoredDestinations = sourceList.map(dest => {
        let score = 0

        // 1. Country match
        if (preferences.country && dest.country === preferences.country) score += 8

        // 2. Interest / category match (highest priority)
        if (preferences.interest && dest.category === preferences.interest) score += 10

        // 3. Budget match
        if (preferences.budget) {
          const budgetLimit = parseInt(preferences.budget)
          if (budgetLimit === 2000) {
            if (dest.price >= 1500) score += 7
            else if (dest.price >= 1000) score += 2
          } else {
            if (dest.price <= budgetLimit) score += 7
            else if (dest.price <= budgetLimit * 1.2) score += 2
          }
        }

        // 4. Season match
        if (preferences.season) {
          const seasonMap = {
            dry: ['october', 'november', 'december', 'january', 'february', 'march', 'april', 'may'],
            rainy: ['june', 'july', 'august', 'september'],
            cool: ['december', 'january', 'february'],
          }
          const targetMonths = seasonMap[preferences.season] || []
          const bestSeason = dest.bestSeason.toLowerCase()
          if (targetMonths.some(month => bestSeason.includes(month))) score += 5
        }

        return { ...dest, recommendationScore: score }
      })

      const hasPreferences = preferences.budget || preferences.interest || preferences.season || preferences.country

      const results = scoredDestinations
        .filter(dest => !hasPreferences || dest.recommendationScore > 0)
        .sort((a, b) => b.recommendationScore - a.recommendationScore)
        .slice(0, 6)

      // If no preferences selected, show all destinations sorted by score
      const finalResults = hasPreferences ? results : scoredDestinations.slice(0, 6)

      setRecommendations(finalResults)
      setSearched(true)
      setLoading(false)

      // Scroll to results
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 100)
    }, 500)
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
    <div className="min-h-screen bg-[#fcfbf7] py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-extrabold text-[#2d3e23] mb-4">Smart Recommendations</h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto font-light">
            Tell us about your preferences and we'll curate the perfect journey just for you.
          </p>
        </motion.div>

        {/* Preference Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass rounded-[2.5rem] p-10 md:p-14 mb-20 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#d4af37]/5 rounded-full blur-3xl -mr-32 -mt-32"></div>

          <h2 className="text-2xl font-bold text-[#2d3e23] mb-8 flex items-center gap-3">
            <span className="w-8 h-8 bg-[#2d3e23] text-white rounded-lg flex items-center justify-center text-sm italic">?</span>
            Plan Your Ideal Trip
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            <div className="group">
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-3 ml-1 group-hover:text-[#2d3e23] transition-colors">
                Country
              </label>
              <select
                value={preferences.country}
                onChange={(e) => handlePreferenceChange('country', e.target.value)}
                className="w-full px-6 py-4 bg-white border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#d4af37] shadow-sm transition-all cursor-pointer"
              >
                <option value="">All Countries</option>
                {countries.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div className="group">
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-3 ml-1 group-hover:text-[#2d3e23] transition-colors">
                Max Budget ({currency})
              </label>
              <select
                value={preferences.budget}
                onChange={(e) => handlePreferenceChange('budget', e.target.value)}
                className="w-full px-6 py-4 bg-white border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#d4af37] shadow-sm transition-all cursor-pointer"
              >
                <option value="">Any Budget</option>
                <option value="500">$0 – $500</option>
                <option value="1000">$500 – $1,000</option>
                <option value="1500">$1,000 – $1,500</option>
                <option value="2000">$1,500+</option>
              </select>
            </div>

            <div className="group">
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-3 ml-1 group-hover:text-[#2d3e23] transition-colors">
                Primary Interest
              </label>
              <select
                value={preferences.interest}
                onChange={(e) => handlePreferenceChange('interest', e.target.value)}
                className="w-full px-6 py-4 bg-white border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#d4af37] shadow-sm transition-all cursor-pointer"
              >
                <option value="">Any Interest</option>
                {['Camping Tours', 'Cultural Tours', 'Adventure Trips', 'Nature Tours', 'Coastal & Marine', 'City & Heritage'].map(i => (
                  <option key={i} value={i}>{i}</option>
                ))}
              </select>
            </div>

            <div className="group">
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-3 ml-1 group-hover:text-[#2d3e23] transition-colors">
                Preferred Season
              </label>
              <select
                value={preferences.season}
                onChange={(e) => handlePreferenceChange('season', e.target.value)}
                className="w-full px-6 py-4 bg-white border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#d4af37] shadow-sm transition-all cursor-pointer"
              >
                <option value="">Any Season</option>
                <option value="dry">Dry Season (Oct–May)</option>
                <option value="rainy">Rainy Season (Jun–Sep)</option>
                <option value="cool">Cool Season (Dec–Feb)</option>
              </select>
            </div>
          </div>

          <div className="mt-12 flex justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={getRecommendations}
              disabled={loading}
              className="bg-[#2d3e23] text-white px-12 py-5 rounded-2xl font-bold text-lg shadow-xl shadow-[#2d3e23]/20 hover:bg-[#3d4a35] transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-3"
            >
              {loading ? (
                <>
                  <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                  </svg>
                  Finding Matches...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                  </svg>
                  Discover Best Matches
                </>
              )}
            </motion.button>
          </div>
        </motion.div>

        {/* Results */}
        <div ref={resultsRef}>
          <AnimatePresence>
            {searched && recommendations.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-16"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-3xl font-bold text-[#2d3e23] flex items-center gap-3">
                    <span className="w-10 h-px bg-[#d4af37]"></span>
                    Top Recommendations
                  </h2>
                  <span className="text-sm text-gray-400 font-medium">
                    {recommendations.length} destination{recommendations.length !== 1 ? 's' : ''} found
                  </span>
                </div>

                {/* Group recommendations by category */}
                {(() => {
                  const grouped = recommendations.reduce((acc, dest) => {
                    const cat = dest.category || 'Other'
                    if (!acc[cat]) acc[cat] = []
                    acc[cat].push(dest)
                    return acc
                  }, {})

                  const categoryColors = {
                    'Camping Tours': { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-800', badge: 'bg-amber-100 text-amber-800' },
                    'Cultural Tours': { bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-800', badge: 'bg-purple-100 text-purple-800' },
                    'Adventure Trips': { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-800', badge: 'bg-red-100 text-red-800' },
                    'Nature Tours': { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-800', badge: 'bg-green-100 text-green-800' },
                    'Coastal & Marine': { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-800', badge: 'bg-blue-100 text-blue-800' },
                    'City & Heritage': { bg: 'bg-gray-50', border: 'border-gray-200', text: 'text-gray-800', badge: 'bg-gray-100 text-gray-800' },
                  }

                  const categoryOrder = ['Camping Tours', 'Cultural Tours', 'Adventure Trips', 'Nature Tours', 'Coastal & Marine', 'City & Heritage']
                  const sortedCategories = Object.keys(grouped).sort((a, b) => {
                    const aIdx = categoryOrder.indexOf(a)
                    const bIdx = categoryOrder.indexOf(b)
                    return (aIdx === -1 ? 999 : aIdx) - (bIdx === -1 ? 999 : bIdx)
                  })

                  return sortedCategories.map((category, catIdx) => {
                    const catStyle = categoryColors[category] || categoryColors['City & Heritage']
                    const dests = grouped[category]

                    return (
                      <motion.div
                        key={category}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: catIdx * 0.1 }}
                        className={`${catStyle.bg} border ${catStyle.border} rounded-[2.5rem] p-8 md:p-10`}
                      >
                        <div className="flex items-center justify-between mb-8">
                          <h3 className={`text-2xl font-bold ${catStyle.text} flex items-center gap-3`}>
                            <span className="w-8 h-px bg-current opacity-50"></span>
                            {category}
                          </h3>
                          <span className={`${catStyle.badge} px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest`}>
                            {dests.length} destination{dests.length !== 1 ? 's' : ''}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                          {dests.map((destination, idx) => (
                            <motion.div
                              key={destination._id || destination.name}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: (catIdx * 0.1) + (idx * 0.08) }}
                              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-50 flex flex-col group"
                            >
                              <div className="relative h-56 overflow-hidden">
                                <img
                                  src={destination.image}
                                  alt={destination.name}
                                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                  onError={(e) => { e.target.style.display = 'none' }}
                                />
                                <div className="absolute top-4 right-4 bg-[#2d3e23] text-white px-3 py-1.5 rounded-2xl text-base font-bold shadow-lg">
                                  {formatPrice(destination.price)}
                                </div>
                                {destination.recommendationScore >= 10 && (
                                  <div className="absolute top-4 left-4 bg-[#d4af37] text-white px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                                    Best Match
                                  </div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#2d3e23]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                                  <p className="text-white text-sm font-light leading-relaxed line-clamp-3">
                                    {destination.description}
                                  </p>
                                </div>
                              </div>

                              <div className="p-6 flex flex-col flex-1">
                                <h4 className="text-lg font-bold text-[#2d3e23] mb-3">{destination.name}</h4>

                                <div className="flex items-center text-gray-400 text-sm mb-2">
                                  <svg className="w-4 h-4 mr-1 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                                  </svg>
                                  {destination.location}
                                </div>

                                <div className="flex items-center text-gray-400 text-sm mb-4">
                                  <svg className="w-4 h-4 mr-1 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                  </svg>
                                  {destination.duration}
                                </div>

                                <div className="mt-auto flex gap-2">
                                  <button
                                    onClick={() => handleViewDetails(destination)}
                                    className="flex-1 border border-[#2d3e23] text-[#2d3e23] py-2.5 rounded-2xl font-bold hover:bg-[#2d3e23] hover:text-white transition-all text-xs"
                                  >
                                    Details
                                  </button>
                                  <button
                                    onClick={() => handleBookNow(destination)}
                                    className="flex-1 bg-[#2d3e23] text-white py-2.5 rounded-2xl font-bold hover:bg-[#3d4a35] transition-all shadow-md text-xs"
                                  >
                                    Book Now
                                  </button>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )
                  })
                })()}
              </motion.div>
            )}

            {searched && recommendations.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20 bg-white rounded-[2.5rem] shadow-sm border border-gray-100"
              >
                <div className="text-5xl mb-4">🔍</div>
                <p className="text-gray-500 text-xl font-light mb-2">No destinations match your filters.</p>
                <p className="text-gray-400 text-sm">Try broadening your preferences or selecting "Any" for some fields.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export default SmartRecommendations
