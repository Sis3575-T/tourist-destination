import { motion } from 'framer-motion'

const vehicleFeatures = {
  '4x4 SUV Adventure': [
    'Heavy-duty 4WD system for extreme terrains',
    'High ground clearance for deep river crossings',
    'Reinforced suspension and off-road tires',
    'Rooftop luggage carrier and spare fuel tanks',
    'Experienced off-road driver-guide included',
    'Air conditioning and charging ports',
  ],
  'Standard Minibus': [
    'Comfortable seating for up to 12–15 passengers',
    'Dual-zone climate control / Air conditioning',
    'Large windows for scenic viewing',
    'Ample luggage space in the rear or on top',
    'Ideal for group sightseeing and airport transfers',
    'PA system for guide announcements',
  ],
  'Luxury Coach': [
    'Reclining ergonomic seats with extra legroom',
    'Full climate control and on-board restroom',
    'Multimedia entertainment system',
    'On-board Wi-Fi (subject to network coverage)',
    'Large under-floor luggage compartments',
    'Refreshments and professional service crew',
  ],
}

const ServiceDetail = ({ service, setCurrentPage }) => {
  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fcfbf7]">
        <div className="text-center">
          <div className="text-6xl mb-4">🚗</div>
          <h2 className="text-2xl font-bold text-[#2d3e23] mb-4">Vehicle not found</h2>
          <button onClick={() => setCurrentPage('fleet')} className="bg-[#2d3e23] text-white px-8 py-3 rounded-2xl font-bold hover:bg-[#3d4a35] transition-all">
            View All Vehicles
          </button>
        </div>
      </div>
    )
  }

  const features = vehicleFeatures[service.name] || [
    'Professional driver included',
    'Air conditioning',
    'Luggage space',
    'Safety equipment',
    '24/7 support',
    'Fully insured',
  ]

  return (
    <div className="min-h-screen bg-[#fcfbf7]">

      {/* Hero */}
      <div className="relative h-[55vh] overflow-hidden">
        <motion.img
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          src={service.image}
          alt={service.name}
          className="w-full h-full object-cover"
          onError={(e) => { e.target.style.display = 'none' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => setCurrentPage('fleet')}
          className="absolute top-8 left-6 glass text-white px-5 py-2.5 rounded-2xl flex items-center gap-2 font-bold text-sm hover:bg-white/30 transition-all"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7"/>
          </svg>
          All Vehicles
        </motion.button>

        <div className="absolute bottom-10 left-6 md:left-14">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-4xl">{service.icon}</span>
              <span className="bg-[#d4af37] text-white text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-wider">
                Premium Transport
              </span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-black text-white mb-2">{service.name}</h1>
            <p className="text-white/70 text-lg font-light">Travel in Style, Comfort & Safety</p>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* Main */}
          <div className="lg:col-span-2 space-y-10">

            {/* Overview */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-black text-[#2d3e23] mb-5 flex items-center gap-3">
                <span className="w-8 h-0.5 bg-[#d4af37]" />
                Service Overview
              </h2>
              <p className="text-gray-600 leading-relaxed text-lg font-light">
                {service.description} Our {service.name} service is designed to provide the ultimate travel experience in the Horn of Africa. Whether traversing the rugged salt flats of Danakil or the paved highways between historic cities, we prioritize your comfort and safety above all else.
              </p>
            </motion.div>

            {/* Features */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-black text-[#2d3e23] mb-6 flex items-center gap-3">
                <span className="w-8 h-0.5 bg-[#d4af37]" />
                Key Features & Amenities
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {features.map((f, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 bg-[#f8f7f4] rounded-2xl group hover:bg-[#2d3e23] transition-all cursor-default">
                    <svg className="w-5 h-5 text-green-500 group-hover:text-[#d4af37] shrink-0 mt-0.5 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"/>
                    </svg>
                    <span className="text-gray-700 group-hover:text-white font-medium text-sm transition-colors">{f}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Why Us */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
              className="bg-[#2d3e23] rounded-3xl p-8 text-white">
              <h2 className="text-2xl font-black mb-4 flex items-center gap-3">
                <span className="w-8 h-0.5 bg-[#d4af37]" />
                Why Choose Our Fleet?
              </h2>
              <p className="text-white/70 leading-relaxed mb-6 font-light">
                We maintain our own fleet with a dedicated maintenance team. Every vehicle undergoes a rigorous safety check before each expedition. Our drivers are experienced professionals with deep knowledge of local routes and cultures.
              </p>
              <div className="flex flex-wrap gap-3">
                {['24/7 Support', 'Professional Drivers', 'Fully Insured', 'GPS Tracked', 'Safety Certified'].map(tag => (
                  <span key={tag} className="bg-white/10 border border-white/20 text-white text-xs font-bold px-4 py-2 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
            className="lg:col-span-1">
            <div className="sticky top-28 bg-white rounded-3xl p-8 shadow-sm border border-gray-100">

              {/* Price */}
              <div className="text-center mb-6 pb-6 border-b border-gray-100">
                <p className="text-xs text-gray-400 uppercase tracking-widest font-bold mb-1">Starting From</p>
                <p className="text-5xl font-black text-[#2d3e23]">${service.pricePerDay}</p>
                <p className="text-gray-400 text-sm">per day</p>
              </div>

              {/* Rating */}
              <div className="flex items-center justify-between mb-6">
                <span className="text-gray-500 text-sm">Rating</span>
                <div className="flex items-center gap-2">
                  <span className="font-black text-[#2d3e23]">{service.rating}</span>
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className={`w-4 h-4 fill-current ${i < Math.floor(service.rating) ? 'text-amber-400' : 'text-gray-200'}`} viewBox="0 0 24 24">
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                      </svg>
                    ))}
                  </div>
                </div>
              </div>

              {/* CTAs */}
              <div className="space-y-3 mb-8">
                <button
                  onClick={() => setCurrentPage('fleet')}
                  className="w-full bg-[#d4af37] text-[#2d3e23] py-4 rounded-2xl font-black text-lg hover:bg-[#f1d38a] transition-all shadow-xl hover:scale-[1.02] active:scale-95"
                >
                  Book This Vehicle
                </button>
                <a
                  href="tel:+251935756054"
                  className="w-full border-2 border-[#2d3e23] text-[#2d3e23] py-4 rounded-2xl font-bold text-lg hover:bg-[#2d3e23] hover:text-white transition-all flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                  </svg>
                  Call for Quote
                </a>
              </div>

              {/* Testimonial */}
              <div className="bg-[#f8f7f4] rounded-2xl p-5">
                <p className="text-gray-600 text-sm italic mb-4 leading-relaxed">
                  "The most reliable transport we found in Ethiopia. The driver was a true expert on the mountain roads."
                </p>
                <div className="flex items-center gap-3">
                  <img src="https://i.pravatar.cc/150?u=4" alt="Reviewer" className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <p className="text-sm font-black text-[#2d3e23]">David Wilson</p>
                    <p className="text-xs text-gray-400">Adventure Traveler, UK</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default ServiceDetail
