import { motion } from 'framer-motion'

const currencyRates   = { USD: 1, EUR: 0.92, GBP: 0.79, ETB: 55 }
const currencySymbols = { USD: '$', EUR: '€', GBP: '£', ETB: 'Br' }

const categoryColors = {
  'Cultural Tours':   'bg-purple-100 text-purple-700',
  'Adventure Trips':  'bg-red-100 text-red-700',
  'Nature Tours':     'bg-green-100 text-green-700',
  'Camping Tours':    'bg-amber-100 text-amber-700',
  'Coastal & Marine': 'bg-blue-100 text-blue-700',
  'City & Heritage':  'bg-rose-100 text-rose-700',
}

const FeaturedDestinations = ({ destinations, onSelectDestination, setCurrentPage, currency }) => {
  const fmt = (price) => {
    const rate = currencyRates[currency] || 1
    const sym  = currencySymbols[currency] || '$'
    return `${sym}${Math.round(price * rate).toLocaleString()}`
  }

  // Parse duration string to number of days
  const parseDays = (dur = '') => {
    const m = dur.match(/(\d+)/)
    return m ? parseInt(m[1]) : 1
  }

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-[#d4af37] text-xs font-black uppercase tracking-[0.3em] mb-3 block">
            Handpicked For You
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-[#2d3e23] mb-4">
            Featured Destinations
          </h2>
          <p className="text-gray-400 text-lg font-light max-w-xl mx-auto">
            Iconic journeys across the Horn of Africa — each one a story waiting to be lived.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {destinations.slice(0, 3).map((dest, idx) => {
            const days = parseDays(dest.duration)
            const pricePerDay = Math.round(dest.price / days)
            const catColor = categoryColors[dest.category] || 'bg-gray-100 text-gray-600'

            return (
              <motion.div
                key={dest._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.12 }}
                className="dest-card group bg-white rounded-3xl overflow-hidden shadow-md border border-gray-100 flex flex-col"
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={dest.image}
                    alt={dest.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    onError={(e) => { e.target.style.display = 'none' }}
                  />
                  {/* Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className={`text-xs font-black px-3 py-1.5 rounded-full ${catColor}`}>
                      {dest.category}
                    </span>
                  </div>

                  {/* Price Badge */}
                  <div className="absolute top-4 right-4 price-badge bg-white/95 backdrop-blur-sm rounded-2xl px-3 py-2 text-center shadow-lg">
                    <p className="text-base font-black text-[#2d3e23]">{fmt(dest.price)}</p>
                    <p className="text-[10px] text-gray-400 font-medium">total</p>
                  </div>

                  {/* Duration on image bottom */}
                  <div className="absolute bottom-4 left-4 flex items-center gap-2">
                    <div className="bg-[#2d3e23]/80 backdrop-blur-sm text-white px-3 py-1.5 rounded-xl flex items-center gap-1.5 text-xs font-bold">
                      <svg className="w-3.5 h-3.5 text-[#d4af37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                      {dest.duration}
                    </div>
                    <div className="bg-[#d4af37]/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-xl text-xs font-bold">
                      {fmt(pricePerDay)}/day
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-black text-[#2d3e23] mb-1">{dest.name}</h3>

                  <div className="flex items-center gap-1 text-gray-400 text-sm mb-3">
                    <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                    </svg>
                    {dest.location}
                  </div>

                  <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 mb-4 flex-1 font-light">
                    {dest.description}
                  </p>

                  {/* Trip Info Row */}
                  <div className="flex items-center gap-3 mb-5 text-xs text-gray-400">
                    <span className="flex items-center gap-1">
                      <svg className="w-3.5 h-3.5 text-[#d4af37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                      </svg>
                      Best: {dest.bestSeason?.split(' ').slice(0,2).join(' ')}
                    </span>
                    <span className="w-1 h-1 bg-gray-300 rounded-full" />
                    <span className="flex items-center gap-1">
                      <svg className="w-3.5 h-3.5 text-[#d4af37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0"/>
                      </svg>
                      {dest.activities?.length || 3} activities
                    </span>
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
        </div>

        {/* View All */}
        <div className="text-center">
          <button
            onClick={() => setCurrentPage('explorer')}
            className="inline-flex items-center gap-3 bg-[#2d3e23] text-white px-10 py-4 rounded-2xl font-black hover:bg-[#3d4a35] transition-all shadow-xl hover:shadow-2xl hover:-translate-y-0.5"
          >
            Explore All Destinations
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}

export default FeaturedDestinations
