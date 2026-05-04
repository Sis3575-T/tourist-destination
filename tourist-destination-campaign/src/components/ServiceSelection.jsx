import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { API_BASE } from '../api'
import fleetFallback from '../data/fleet-fallback'

const terrainMultipliers = {
  'Danakil Depression Expedition': { multiplier: 1.8, label: 'Extreme Off-road & Remote', difficulty: 'Extreme', color: 'red' },
  'Simien Mountains Trek':         { multiplier: 1.6, label: 'High Altitude & Rugged',    difficulty: 'Hard',    color: 'orange' },
  'Omo Valley Cultural Encounter': { multiplier: 1.5, label: 'Remote Southern Region',    difficulty: 'Hard',    color: 'orange' },
  'Lalibela Rock-Hewn Churches':   { multiplier: 1.3, label: 'Mountainous Road Access',   difficulty: 'Medium',  color: 'yellow' },
  'Axum Historical Route':         { multiplier: 1.2, label: 'Northern Historic Circuit',  difficulty: 'Medium',  color: 'yellow' },
  'Gondar Castles & Fasil Ghebbi': { multiplier: 1.1, label: 'Highland Highway',           difficulty: 'Easy',    color: 'green' },
  'Blue Nile Falls Escape':        { multiplier: 1.1, label: 'Highland Highway',           difficulty: 'Easy',    color: 'green' },
}

const difficultyColors = {
  Extreme: 'bg-red-100 text-red-700',
  Hard:    'bg-orange-100 text-orange-700',
  Medium:  'bg-yellow-100 text-yellow-700',
  Easy:    'bg-green-100 text-green-700',
}

const ServiceSelection = ({ destination, selectedDuration, onSelectService, setCurrentPage }) => {
  const [fleets, setFleets] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`${API_BASE}/fleet`)
      .then(r => r.json())
      .then(data => {
        let list = Array.isArray(data) ? data : fleetFallback
        // Patch fleet items with correct local images from fallback
        list = list.map(f => {
          const fallback = fleetFallback.find(fb => fb.name === f.name)
          return { ...f, image: fallback?.image || f.image }
        })
        setFleets(list); setLoading(false)
      })
      .catch(() => { setFleets(fleetFallback); setLoading(false) })
  }, [])

  const getTerrain = (dest) => {
    if (!dest) return { multiplier: 1.0, label: 'Standard Route', difficulty: 'Easy', color: 'green' }
    let t = terrainMultipliers[dest.name]
    if (!t) {
      const key = Object.keys(terrainMultipliers).find(k => dest.name.includes(k.split(' ')[0]))
      t = key ? terrainMultipliers[key] : { multiplier: 1.0, label: 'Standard Route', difficulty: 'Easy', color: 'green' }
    }
    return t
  }

  const terrain = getTerrain(destination)

  const getPrice = (fleet) => Math.round(fleet.pricePerDay * terrain.multiplier)

  const handleSelect = (fleet) => {
    const price = getPrice(fleet)
    onSelectService({
      ...fleet,
      type: 'transport',
      pricePerDay: price,
      terrainLabel: terrain.label,
    })
    setCurrentPage('booking')
  }

  return (
    <div className="min-h-screen bg-[#fcfbf7] pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-10">
          <button
            onClick={() => setCurrentPage('details')}
            className="flex items-center gap-2 text-gray-400 hover:text-[#2d3e23] transition-colors mb-4 text-sm font-medium"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/>
            </svg>
            Back to Destination Details
          </button>

          <h1 className="text-4xl font-black text-[#2d3e23] mb-2">
            Choose Your Transport
          </h1>
          <p className="text-gray-500 text-lg">
            for <span className="font-bold text-[#2d3e23]">{destination?.name}</span>
          </p>

          {/* Show chosen duration */}
          {selectedDuration && (
            <div className="mt-4 inline-flex items-center gap-3 bg-[#2d3e23] text-white px-5 py-2.5 rounded-2xl text-sm">
              <svg className="w-4 h-4 text-[#d4af37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <span className="font-bold">{selectedDuration.label} — {selectedDuration.days} days</span>
              <span className="text-[#d4af37] font-black">${selectedDuration.price.toLocaleString()}</span>
            </div>
          )}
        </div>

        {/* Terrain Info Banner */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-10 flex flex-col sm:flex-row items-start sm:items-center gap-4"
        >
          <div className="w-12 h-12 bg-[#2d3e23] rounded-xl flex items-center justify-center shrink-0">
            <svg className="w-6 h-6 text-[#d4af37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/>
            </svg>
          </div>
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-3 mb-1">
              <p className="font-black text-[#2d3e23]">Terrain Assessment: {terrain.label}</p>
              <span className={`text-xs font-bold px-3 py-1 rounded-full ${difficultyColors[terrain.difficulty]}`}>
                {terrain.difficulty} Terrain
              </span>
            </div>
            <p className="text-gray-400 text-sm">
              Prices are adjusted based on terrain difficulty and distance from Addis Ababa.
              {terrain.multiplier > 1 && ` A ${Math.round((terrain.multiplier - 1) * 100)}% terrain surcharge applies.`}
            </p>
          </div>
          {destination?.distanceFromAddis && (
            <div className="text-right shrink-0">
              <p className="text-2xl font-black text-[#2d3e23]">{destination.distanceFromAddis} km</p>
              <p className="text-xs text-gray-400">from Addis Ababa</p>
            </div>
          )}
        </motion.div>

        {/* Fleet Cards */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1,2,3].map(i => (
              <div key={i} className="bg-white rounded-3xl h-80 animate-pulse border border-gray-100" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {fleets.map((fleet, idx) => {
              const price = getPrice(fleet)
              return (
                <motion.div
                  key={fleet._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-100 flex flex-col hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                >
                  {/* Image */}
                  <div className="h-48 relative overflow-hidden">
                    <img
                      src={fleet.image}
                      alt={fleet.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      onError={(e) => { e.target.style.display = 'none' }}
                    />
                    <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-3 py-2 rounded-xl shadow-lg text-center">
                      <p className="text-lg font-black text-[#2d3e23]">${price}</p>
                      <p className="text-[10px] text-gray-400 uppercase tracking-wider">per day</p>
                    </div>
                    {terrain.multiplier > 1 && (
                      <div className="absolute top-4 left-4 bg-[#d4af37] text-white text-[10px] font-black px-2 py-1 rounded-lg uppercase tracking-wider">
                        +{Math.round((terrain.multiplier - 1) * 100)}% terrain
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-2xl">{fleet.icon}</span>
                      <h3 className="text-lg font-black text-[#2d3e23]">{fleet.name}</h3>
                    </div>
                    <p className="text-gray-500 text-sm leading-relaxed mb-4 flex-1">{fleet.description}</p>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-5">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className={`w-4 h-4 ${i < Math.floor(fleet.rating) ? 'text-amber-400' : 'text-gray-200'} fill-current`} viewBox="0 0 24 24">
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                          </svg>
                        ))}
                      </div>
                      <span className="text-sm font-bold text-gray-600">{fleet.rating}</span>
                    </div>

                    <button
                      onClick={() => handleSelect(fleet)}
                      className="w-full bg-[#2d3e23] text-white py-3.5 rounded-2xl font-black hover:bg-[#3d4a35] transition-all shadow-md active:scale-95"
                    >
                      Select & Continue →
                    </button>
                  </div>
                </motion.div>
              )
            })}
          </div>
        )}

        {!loading && fleets.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">No transport options available. Please try again later.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ServiceSelection
