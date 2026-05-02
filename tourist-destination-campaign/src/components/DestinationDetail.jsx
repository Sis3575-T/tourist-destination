import { useState } from 'react'
import { motion } from 'framer-motion'

const currencyRates   = { USD: 1, EUR: 0.92, GBP: 0.79, ETB: 55 }
const currencySymbols = { USD: '$', EUR: '€', GBP: '£', ETB: 'Br' }

const categoryColors = {
  'Cultural Tours':   'bg-purple-500',
  'Adventure Trips':  'bg-red-500',
  'Nature Tours':     'bg-green-500',
  'Camping Tours':    'bg-amber-500',
  'Coastal & Marine': 'bg-blue-500',
  'City & Heritage':  'bg-rose-500',
}

const DestinationDetail = ({ destination, setCurrentPage, currency, onDurationSelect }) => {
  const [selectedDays, setSelectedDays] = useState(null)

  if (!destination) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#fcfbf7]">
        <div className="text-6xl mb-4">🗺️</div>
        <p className="text-xl text-gray-500 mb-6">No destination selected.</p>
        <button onClick={() => setCurrentPage('explorer')} className="bg-[#2d3e23] text-white px-8 py-3 rounded-2xl font-bold hover:bg-[#3d4a35] transition-all">
          Browse Destinations
        </button>
      </div>
    )
  }

  const fmt = (price) => {
    const rate = currencyRates[currency] || 1
    const sym  = currencySymbols[currency] || '$'
    return `${sym}${Math.round(price * rate).toLocaleString()}`
  }

  // Parse base duration days from string like "4 days", "6 days"
  const parseBaseDays = (dur = '') => {
    const m = dur.match(/(\d+)/)
    return m ? parseInt(m[1]) : 3
  }

  const baseDays = parseBaseDays(destination.duration)
  const pricePerDay = Math.round(destination.price / baseDays)

  // Duration options: base, base+2 (relaxed), base+4 (extended), base+7 (immersive)
  const durationOptions = [
    { label: 'Standard',  days: baseDays,       tag: 'Recommended' },
    { label: 'Relaxed',   days: baseDays + 2,   tag: '+2 rest days' },
    { label: 'Extended',  days: baseDays + 4,   tag: '+4 rest days' },
    { label: 'Immersive', days: baseDays + 7,   tag: '+7 rest days' },
  ]

  const chosenDays  = selectedDays ?? baseDays
  const totalPrice  = pricePerDay * chosenDays
  const catColor    = categoryColors[destination.category] || 'bg-gray-500'

  const handleBook = () => {
    // Pass chosen duration + price up to App before navigating
    onDurationSelect?.({
      days: chosenDays,
      price: totalPrice,
      label: durationOptions.find(o => o.days === chosenDays)?.label || 'Standard',
      pricePerDay,
    })
    setCurrentPage('service-selection')
  }

  return (
    <div className="bg-[#fcfbf7] min-h-screen pb-24">

      {/* Hero */}
      <div className="relative h-[65vh] overflow-hidden">
        <motion.img
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.8, ease: 'easeOut' }}
          src={destination.image}
          alt={destination.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 hero-overlay-gradient" />

        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => setCurrentPage('explorer')}
          className="absolute top-8 left-6 md:left-10 glass text-white px-5 py-2.5 rounded-2xl flex items-center gap-2 font-bold text-sm hover:bg-white/30 transition-all"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7"/>
          </svg>
          Back
        </motion.button>

        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-14">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className={`${catColor} text-white text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-wider`}>
                {destination.category}
              </span>
              <span className="glass text-white text-xs font-bold px-4 py-1.5 rounded-full">
                {destination.country}
              </span>
            </div>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-white mb-3 leading-tight">
              {destination.name}
            </h1>
            <p className="text-white/80 text-lg flex items-center gap-2 font-light">
              <svg className="w-5 h-5 text-[#d4af37] shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
              </svg>
              {destination.location}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* Left: Info */}
          <div className="lg:col-span-2 space-y-8">

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4"
            >
              {[
                { icon: '🕐', label: 'Duration', value: destination.duration },
                { icon: '🌤️', label: 'Best Season', value: destination.bestSeason?.split(' ').slice(0,3).join(' ') },
                { icon: '📍', label: 'Distance', value: destination.distanceFromAddis ? `${destination.distanceFromAddis} km` : 'Varies' },
                { icon: '💰', label: 'From', value: `${fmt(pricePerDay)}/day` },
              ].map(s => (
                <div key={s.label} className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm text-center">
                  <div className="text-2xl mb-1">{s.icon}</div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider font-bold mb-1">{s.label}</p>
                  <p className="font-black text-[#2d3e23] text-sm">{s.value}</p>
                </div>
              ))}
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100"
            >
              <h2 className="text-2xl font-black text-[#2d3e23] mb-5 flex items-center gap-3">
                <span className="w-8 h-0.5 bg-[#d4af37]" />
                The Experience
              </h2>
              <p className="text-gray-600 leading-relaxed text-lg font-light">
                {destination.description}
              </p>
            </motion.div>

            {/* Activities */}
            {destination.activities?.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100"
              >
                <h2 className="text-2xl font-black text-[#2d3e23] mb-6 flex items-center gap-3">
                  <span className="w-8 h-0.5 bg-[#d4af37]" />
                  Included Activities
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {destination.activities.map((act, i) => (
                    <div key={i} className="flex items-center gap-3 p-4 bg-[#f8f7f4] rounded-2xl group hover:bg-[#2d3e23] transition-all cursor-default">
                      <div className="w-8 h-8 bg-[#d4af37] rounded-xl flex items-center justify-center text-white font-black text-sm shrink-0">
                        {i + 1}
                      </div>
                      <span className="font-bold text-[#2d3e23] group-hover:text-white transition-colors text-sm">{act}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Duration & Relaxation Selector */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100"
            >
              <h2 className="text-2xl font-black text-[#2d3e23] mb-2 flex items-center gap-3">
                <span className="w-8 h-0.5 bg-[#d4af37]" />
                Choose Your Stay Duration
              </h2>
              <p className="text-gray-400 text-sm mb-6 font-light">
                Add relaxation days to slow down and truly soak in the destination. Price adjusts automatically.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {durationOptions.map(opt => {
                  const optPrice = pricePerDay * opt.days
                  const isActive = chosenDays === opt.days
                  return (
                    <button
                      key={opt.label}
                      onClick={() => setSelectedDays(opt.days)}
                      className={`duration-tab rounded-2xl p-4 text-center transition-all ${isActive ? 'active' : 'bg-[#f8f7f4]'}`}
                    >
                      <p className={`text-xs font-black uppercase tracking-wider mb-1 ${isActive ? 'text-[#d4af37]' : 'text-gray-400'}`}>
                        {opt.label}
                      </p>
                      <p className={`text-2xl font-black mb-1 ${isActive ? 'text-white' : 'text-[#2d3e23]'}`}>
                        {opt.days}
                      </p>
                      <p className={`text-xs mb-2 ${isActive ? 'text-white/70' : 'text-gray-400'}`}>days</p>
                      <p className={`text-sm font-black duration-price ${isActive ? 'text-[#d4af37]' : 'text-[#2d3e23]'}`}>
                        {fmt(optPrice)}
                      </p>
                      <p className={`text-[10px] mt-0.5 ${isActive ? 'text-white/50' : 'text-gray-300'}`}>
                        {opt.tag}
                      </p>
                    </button>
                  )
                })}
              </div>

              <div className="mt-5 bg-[#f8f7f4] rounded-2xl p-4 flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-400 font-medium">Selected: <strong className="text-[#2d3e23]">{chosenDays} days</strong></p>
                  <p className="text-xs text-gray-400 font-medium mt-0.5">{fmt(pricePerDay)} × {chosenDays} days</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-400 font-medium">Total Package</p>
                  <p className="text-2xl font-black text-[#2d3e23]">{fmt(totalPrice)}</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right: Booking Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-1"
          >
            <div className="sticky top-28 bg-[#2d3e23] rounded-3xl p-8 text-white shadow-2xl overflow-hidden relative">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full" />
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-[#d4af37]/10 rounded-full" />

              <div className="relative z-10">
                <p className="text-white/50 text-xs font-black uppercase tracking-[0.25em] mb-2">
                  {chosenDays}-Day Package
                </p>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-5xl font-black text-[#d4af37]">{fmt(totalPrice)}</span>
                </div>
                <p className="text-white/40 text-xs mb-6">{fmt(pricePerDay)} per day × {chosenDays} days</p>

                {/* Inclusions */}
                <div className="space-y-3 mb-8">
                  {[
                    'Expert local guide',
                    'Private transport',
                    'Accommodation included',
                    'All entrance fees',
                    'Meals as per itinerary',
                    '24/7 support',
                  ].map(item => (
                    <div key={item} className="flex items-center gap-3 text-sm">
                      <svg className="w-4 h-4 text-[#d4af37] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"/>
                      </svg>
                      <span className="text-white/80 font-medium">{item}</span>
                    </div>
                  ))}
                </div>

                {/* Best Season */}
                <div className="bg-white/10 rounded-2xl p-4 mb-6">
                  <p className="text-xs text-[#d4af37] font-black uppercase tracking-wider mb-1">Best Time to Visit</p>
                  <p className="text-white font-bold text-sm">{destination.bestSeason}</p>
                </div>

                <button
                  onClick={handleBook}
                  className="w-full bg-[#d4af37] text-[#2d3e23] py-4 rounded-2xl font-black text-lg hover:bg-[#f1d38a] transition-all shadow-xl hover:scale-105 active:scale-95"
                >
                  Book Now — Choose Transport
                </button>

                <p className="text-center mt-4 text-white/30 text-xs">
                  Free cancellation · Secure checkout
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default DestinationDetail
