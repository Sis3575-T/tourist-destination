import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { API_BASE } from '../api'

const FleetServices = ({ setCurrentPage, onSelectService }) => {
  const [fleets, setFleets] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`${API_BASE}/fleet`)
      .then(r => r.json())
      .then(data => { setFleets(Array.isArray(data) ? data : []); setLoading(false) })
      .catch(() => { setFleets([]); setLoading(false) })
  }, [])

  const Stars = ({ rating }) => (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => (
        <svg key={i} className={`w-3.5 h-3.5 fill-current ${i < Math.floor(rating) ? 'text-amber-400' : 'text-gray-200'}`} viewBox="0 0 24 24">
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
        </svg>
      ))}
      <span className="text-xs font-bold text-gray-500 ml-1">{rating}</span>
    </div>
  )

  return (
    <section className="py-24 bg-[#f8f7f4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-[#d4af37] text-xs font-black uppercase tracking-[0.3em] mb-3 block">
            Premium Transport
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-[#2d3e23] mb-4">
            Our Fleet & Services
          </h2>
          <p className="text-gray-400 text-lg font-light max-w-xl mx-auto">
            Every vehicle is maintained to the highest standard — your safety and comfort are our priority.
          </p>
        </motion.div>

        {/* Cards */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1,2,3].map(i => <div key={i} className="bg-white rounded-3xl h-72 animate-pulse border border-gray-100" />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {fleets.map((fleet, idx) => (
              <motion.div
                key={fleet._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="dest-card group bg-white rounded-3xl overflow-hidden shadow-md border border-gray-100 flex flex-col"
              >
                {/* Image */}
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={fleet.image}
                    alt={fleet.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4 price-badge bg-white/95 backdrop-blur-sm rounded-2xl px-3 py-2 text-center shadow-lg">
                    <p className="text-base font-black text-[#2d3e23]">${fleet.pricePerDay}</p>
                    <p className="text-[10px] text-gray-400">per day</p>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <span className="text-2xl">{fleet.icon}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-lg font-black text-[#2d3e23] mb-2">{fleet.name}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4 flex-1 font-light line-clamp-2">{fleet.description}</p>

                  <div className="mb-5">
                    <Stars rating={fleet.rating} />
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <button
                      onClick={() => { onSelectService(fleet); setCurrentPage('service-details') }}
                      className="flex-1 border-2 border-[#2d3e23] text-[#2d3e23] py-2.5 rounded-2xl text-sm font-black hover:bg-[#2d3e23] hover:text-white transition-all"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => { onSelectService(fleet); setCurrentPage('explorer') }}
                      className="flex-1 bg-[#d4af37] text-[#2d3e23] py-2.5 rounded-2xl text-sm font-black hover:bg-[#f1d38a] transition-all shadow-md"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* View All Vehicles → fleet page */}
        <div className="text-center">
          <button
            onClick={() => setCurrentPage('fleet')}
            className="inline-flex items-center gap-3 bg-[#2d3e23] text-white px-10 py-4 rounded-2xl font-black hover:bg-[#3d4a35] transition-all shadow-xl hover:-translate-y-0.5"
          >
            View All Vehicles
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}

export default FleetServices
