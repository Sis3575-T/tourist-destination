import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { API_BASE } from '../api'
import fleetFallback from '../data/fleet-fallback'

const FleetPage = ({ destinations, onSelectService, onSelectDestination, setCurrentPage }) => {
  const [fleets, setFleets] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedFleet, setSelectedFleet] = useState(null)

  useEffect(() => {
    fetch(`${API_BASE}/fleet`)
      .then(r => r.json())
      .then(data => {
        let list = Array.isArray(data) ? data : fleetFallback
        list = list.map(f => {
          const fallback = fleetFallback.find(fb => fb.name === f.name)
          return { ...f, image: fallback?.image || f.image }
        })
        setFleets(list); setLoading(false)
      })
      .catch(() => { setFleets(fleetFallback); setLoading(false) })
  }, [])

  const features = {
    '4x4 SUV Adventure': [
      'Heavy-duty 4WD for extreme terrains',
      'High ground clearance',
      'Reinforced suspension & off-road tires',
      'Rooftop luggage carrier',
      'Expert off-road driver included',
      'AC & charging ports',
    ],
    'Standard Minibus': [
      'Seats up to 12–15 passengers',
      'Dual-zone air conditioning',
      'Large scenic windows',
      'Ample luggage space',
      'PA system for guide',
      'Ideal for group tours',
    ],
    'Luxury Coach': [
      'Reclining ergonomic seats',
      'On-board restroom',
      'Multimedia entertainment',
      'On-board Wi-Fi',
      'Under-floor luggage compartments',
      'Professional service crew',
    ],
  }

  const handleSelectVehicle = (fleet) => {
    setSelectedFleet(fleet)
    window.scrollTo({ top: document.getElementById('pick-destination')?.offsetTop - 80 || 0, behavior: 'smooth' })
  }

  const handlePickDestination = (dest) => {
    onSelectService({ ...selectedFleet, type: 'transport', pricePerDay: selectedFleet.pricePerDay })
    onSelectDestination(dest)
    setCurrentPage('booking')
  }

  return (
    <div className="min-h-screen bg-[#fcfbf7] pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-14">
          <span className="text-[#d4af37] text-xs font-black uppercase tracking-[0.3em] mb-3 block">Premium Transport</span>
          <h1 className="text-5xl font-black text-[#2d3e23] mb-4">Our Full Fleet</h1>
          <p className="text-gray-400 text-lg font-light max-w-2xl mx-auto">
            Choose your vehicle, then pick your destination. Every journey starts with the right ride.
          </p>
        </motion.div>

        {/* Step 1: Choose Vehicle */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-8 h-8 bg-[#2d3e23] text-white rounded-full flex items-center justify-center font-black text-sm">1</div>
            <h2 className="text-2xl font-black text-[#2d3e23]">Select Your Vehicle</h2>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1,2,3].map(i => <div key={i} className="bg-white rounded-3xl h-80 animate-pulse border border-gray-100" />)}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {fleets.map((fleet, idx) => {
                const isSelected = selectedFleet?._id === fleet._id
                const featureList = features[fleet.name] || []
                return (
                  <motion.div
                    key={fleet._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    onClick={() => handleSelectVehicle(fleet)}
                    className={`cursor-pointer rounded-3xl overflow-hidden border-2 transition-all duration-300 ${
                      isSelected
                        ? 'border-[#d4af37] shadow-2xl shadow-[#d4af37]/20 scale-[1.02]'
                        : 'border-gray-100 bg-white shadow-md hover:shadow-xl hover:-translate-y-1'
                    }`}
                  >
                    <div className="relative h-52 overflow-hidden">
                      <img src={fleet.image} alt={fleet.name} className="w-full h-full object-cover" onError={(e) => { e.target.style.display = 'none' }} />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      {isSelected && (
                        <div className="absolute top-4 right-4 w-8 h-8 bg-[#d4af37] rounded-full flex items-center justify-center shadow-lg">
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/>
                          </svg>
                        </div>
                      )}
                      <div className="absolute bottom-4 left-4 flex items-center gap-2">
                        <span className="text-2xl">{fleet.icon}</span>
                        <span className="bg-white/90 text-[#2d3e23] text-xs font-black px-3 py-1 rounded-xl">
                          ${fleet.pricePerDay}/day
                        </span>
                      </div>
                    </div>
                    <div className={`p-6 ${isSelected ? 'bg-[#2d3e23]' : 'bg-white'}`}>
                      <h3 className={`text-lg font-black mb-2 ${isSelected ? 'text-white' : 'text-[#2d3e23]'}`}>{fleet.name}</h3>
                      <p className={`text-sm mb-4 font-light line-clamp-2 ${isSelected ? 'text-white/70' : 'text-gray-500'}`}>{fleet.description}</p>
                      <div className="grid grid-cols-2 gap-1.5">
                        {featureList.slice(0, 4).map(f => (
                          <div key={f} className={`flex items-center gap-1.5 text-xs ${isSelected ? 'text-white/80' : 'text-gray-500'}`}>
                            <svg className={`w-3 h-3 shrink-0 ${isSelected ? 'text-[#d4af37]' : 'text-green-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"/>
                            </svg>
                            {f}
                          </div>
                        ))}
                      </div>
                      {isSelected && (
                        <div className="mt-4 bg-[#d4af37] text-[#2d3e23] text-center py-2 rounded-xl text-sm font-black">
                          ✓ Selected — Now pick a destination below
                        </div>
                      )}
                    </div>
                  </motion.div>
                )
              })}
            </div>
          )}
        </div>

        {/* Step 2: Pick Destination */}
        <AnimatePresence>
          {selectedFleet && (
            <motion.div
              id="pick-destination"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-8 h-8 bg-[#d4af37] text-[#2d3e23] rounded-full flex items-center justify-center font-black text-sm">2</div>
                <h2 className="text-2xl font-black text-[#2d3e23]">
                  Pick Your Destination for <span className="text-[#d4af37]">{selectedFleet.name}</span>
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {destinations.map((dest, idx) => (
                  <motion.div
                    key={dest._id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.04 }}
                    onClick={() => handlePickDestination(dest)}
                    className="cursor-pointer group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="relative h-36 overflow-hidden">
                      <img src={dest.image} alt={dest.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" onError={(e) => { e.target.style.display = 'none' }} />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-3 left-3 right-3">
                        <p className="text-white font-black text-sm leading-tight">{dest.name}</p>
                        <p className="text-white/70 text-xs">{dest.location}</p>
                      </div>
                    </div>
                    <div className="p-4 flex items-center justify-between">
                      <div>
                        <p className="text-xs text-gray-400">{dest.duration}</p>
                        <p className="font-black text-[#2d3e23] text-sm">${dest.price}</p>
                      </div>
                      <div className="w-8 h-8 bg-[#2d3e23] rounded-xl flex items-center justify-center group-hover:bg-[#d4af37] transition-colors">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                        </svg>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {!selectedFleet && !loading && (
          <div className="text-center py-10 text-gray-400 text-sm">
            ↑ Select a vehicle above to continue
          </div>
        )}
      </div>
    </div>
  )
}

export default FleetPage
