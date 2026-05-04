import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const currencyRates   = { USD: 1, EUR: 0.92, GBP: 0.79, ETB: 55 }
const currencySymbols = { USD: '$', EUR: '€', GBP: '£', ETB: 'Br' }

const categoryColors = {
  'Cultural Tours':   'bg-purple-100 text-purple-700 border-purple-200',
  'Adventure Trips':  'bg-red-100 text-red-700 border-red-200',
  'Nature Tours':     'bg-green-100 text-green-700 border-green-200',
  'Camping Tours':    'bg-amber-100 text-amber-700 border-amber-200',
  'Coastal & Marine': 'bg-blue-100 text-blue-700 border-blue-200',
  'City & Heritage':  'bg-rose-100 text-rose-700 border-rose-200',
}

function applyFilters(destinations, filters) {
  let f = destinations
  if (filters.search) {
    const q = filters.search.toLowerCase()
    f = f.filter(d => d.name.toLowerCase().includes(q) || d.location.toLowerCase().includes(q) || d.description.toLowerCase().includes(q))
  }
  if (filters.budget) {
    f = f.filter(d => d.price <= parseInt(filters.budget))
  }
  if (filters.category) {
    f = f.filter(d => d.category === filters.category)
  }
  if (filters.country) {
    f = f.filter(d => d.country === filters.country)
  }
  if (filters.duration) {
    const max = parseInt(filters.duration)
    f = f.filter(d => {
      const m = d.duration?.match(/(\d+)/)
      return m ? parseInt(m[1]) <= max : true
    })
  }
  return f
}

const parseDays = (dur = '') => {
  const m = dur.match(/(\d+)/)
  return m ? parseInt(m[1]) : 1
}

const DestinationExplorer = ({ destinations, onSelectDestination, setCurrentPage, currency }) => {
  const [filters, setFilters] = useState({ search: '', budget: '', category: '', country: '', duration: '' })
  const filtered = useMemo(() => applyFilters(destinations, filters), [destinations, filters])

  const fmt = (price) => {
    const rate = currencyRates[currency] || 1
    const sym  = currencySymbols[currency] || '$'
    return `${sym}${Math.round(price * rate).toLocaleString()}`
  }

  const countries = [...new Set(destinations.map(d => d.country))].filter(Boolean)

  return (
    <div className="min-h-screen bg-[#fcfbf7] pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <span className="text-[#d4af37] text-xs font-black uppercase tracking-[0.3em] mb-3 block">
            All Destinations
          </span>
          <h1 className="text-5xl font-black text-[#2d3e23] mb-4">Explore the Horn of Africa</h1>
          <p className="text-gray-400 text-lg font-light max-w-2xl mx-auto">
            {destinations.length} curated journeys across Ethiopia, Djibouti, Eritrea & Somalia
          </p>
        </motion.div>

        {/* Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 mb-10"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Search */}
            <div className="lg:col-span-2 relative">
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
              <input
                type="text"
                placeholder="Search destinations..."
                value={filters.search}
                onChange={e => setFilters(f => ({ ...f, search: e.target.value }))}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#d4af37] text-sm bg-[#f8f7f4]"
              />
            </div>

            {/* Country */}
            <select
              value={filters.country}
              onChange={e => setFilters(f => ({ ...f, country: e.target.value }))}
              className="px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#d4af37] text-sm bg-[#f8f7f4] cursor-pointer"
            >
              <option value="">All Countries</option>
              {countries.map(c => <option key={c} value={c}>{c}</option>)}
            </select>

            {/* Category */}
            <select
              value={filters.category}
              onChange={e => setFilters(f => ({ ...f, category: e.target.value }))}
              className="px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#d4af37] text-sm bg-[#f8f7f4] cursor-pointer"
            >
              <option value="">All Types</option>
              {['Camping Tours','Cultural Tours','Adventure Trips','Nature Tours','Coastal & Marine','City & Heritage'].map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>

            {/* Budget */}
            <select
              value={filters.budget}
              onChange={e => setFilters(f => ({ ...f, budget: e.target.value }))}
              className="px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#d4af37] text-sm bg-[#f8f7f4] cursor-pointer"
            >
              <option value="">Any Budget</option>
              <option value="500">Under $500</option>
              <option value="1000">Under $1,000</option>
              <option value="1500">Under $1,500</option>
              <option value="2000">Under $2,000</option>
            </select>
          </div>

          {/* Active filters + count */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
            <p className="text-sm text-gray-400">
              Showing <span className="font-black text-[#2d3e23]">{filtered.length}</span> of {destinations.length} destinations
            </p>
            {(filters.search || filters.budget || filters.category || filters.country) && (
              <button
                onClick={() => setFilters({ search: '', budget: '', category: '', country: '', duration: '' })}
                className="text-xs text-red-400 hover:text-red-600 font-bold transition-colors"
              >
                Clear filters ×
              </button>
            )}
          </div>
        </motion.div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filtered.map((dest, idx) => {
              const days = parseDays(dest.duration)
              const pricePerDay = Math.round(dest.price / days)
              const catColor = categoryColors[dest.category] || 'bg-gray-100 text-gray-600 border-gray-200'

              return (
                <motion.div
                  key={dest._id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: Math.min(idx * 0.04, 0.3) }}
                  className="dest-card group bg-white rounded-3xl overflow-hidden shadow-md border border-gray-100 flex flex-col"
                >
                  {/* Image */}
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={dest.image}
                      alt={dest.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      onError={(e) => { e.target.style.display = 'none' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    {/* Category */}
                    <div className="absolute top-4 left-4">
                      <span className={`text-xs font-black px-3 py-1.5 rounded-full border ${catColor}`}>
                        {dest.category}
                      </span>
                    </div>

                    {/* Price */}
                    <div className="absolute top-4 right-4 price-badge bg-white/95 backdrop-blur-sm rounded-2xl px-3 py-2 text-center shadow-lg">
                      <p className="text-sm font-black text-[#2d3e23]">{fmt(dest.price)}</p>
                      <p className="text-[10px] text-gray-400">total</p>
                    </div>

                    {/* Duration + per day */}
                    <div className="absolute bottom-4 left-4 flex items-center gap-2">
                      <span className="bg-[#2d3e23]/80 backdrop-blur-sm text-white px-3 py-1 rounded-xl text-xs font-bold flex items-center gap-1">
                        <svg className="w-3 h-3 text-[#d4af37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                        {dest.duration}
                      </span>
                      <span className="bg-[#d4af37]/90 text-white px-3 py-1 rounded-xl text-xs font-bold">
                        {fmt(pricePerDay)}/day
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-lg font-black text-[#2d3e23] mb-1">{dest.name}</h3>

                    <div className="flex items-center gap-1 text-gray-400 text-xs mb-3">
                      <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                      </svg>
                      {dest.location} · {dest.country}
                    </div>

                    <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 mb-4 flex-1 font-light">
                      {dest.description}
                    </p>

                    {/* Info chips */}
                    <div className="flex flex-wrap gap-2 mb-5">
                      <span className="bg-[#f8f7f4] text-gray-500 text-xs px-3 py-1 rounded-full font-medium">
                        🌤 {dest.bestSeason?.split(' ').slice(0,2).join(' ')}
                      </span>
                      {dest.activities?.slice(0,2).map(a => (
                        <span key={a} className="bg-[#f8f7f4] text-gray-500 text-xs px-3 py-1 rounded-full font-medium truncate max-w-[120px]">
                          {a}
                        </span>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3">
                      <button
                        onClick={() => { onSelectDestination(dest); setCurrentPage('details') }}
                        className="flex-1 border-2 border-[#2d3e23] text-[#2d3e23] py-2.5 rounded-2xl text-sm font-black hover:bg-[#2d3e23] hover:text-white transition-all"
                      >
                        Details
                      </button>
                      <button
                        onClick={() => { onSelectDestination(dest); setCurrentPage('service-selection') }}
                        className="flex-1 bg-[#d4af37] text-[#2d3e23] py-2.5 rounded-2xl text-sm font-black hover:bg-[#f1d38a] transition-all shadow-md"
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filtered.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-24">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-gray-400 text-xl font-light mb-4">No destinations match your filters.</p>
            <button
              onClick={() => setFilters({ search: '', budget: '', category: '', country: '', duration: '' })}
              className="bg-[#2d3e23] text-white px-8 py-3 rounded-2xl font-bold hover:bg-[#3d4a35] transition-all"
            >
              Clear All Filters
            </button>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default DestinationExplorer
