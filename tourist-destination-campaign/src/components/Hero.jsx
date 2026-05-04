import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const slides = [
  {
    img: '/destinations/lalibela.jpg',
    title: 'Lalibela',
    subtitle: 'Rock-Hewn Churches of Ethiopia',
    tag: 'UNESCO World Heritage',
  },
  {
    img: '/destinations/ras_dashen.jpg',
    title: 'Ras Dashen',
    subtitle: 'Ethiopia\'s Highest Peak — 4,550m',
    tag: 'Mountain Adventure',
  },
  {
    img: '/destinations/semien_mountain.jpg',
    title: 'Simien Mountains',
    subtitle: 'Africa\'s Roof — Trekking Paradise',
    tag: 'Adventure & Wildlife',
  },
  {
    img: '/destinations/danakil.png',
    title: 'Danakil Depression',
    subtitle: 'Earth\'s Most Alien Landscape',
    tag: 'Extreme Expedition',
  },
  {
    img: '/destinations/gonder.jpg',
    title: 'Gondar',
    subtitle: 'The Camelot of Africa',
    tag: 'History & Culture',
  },
]

const Hero = ({ setCurrentPage, destinations }) => {
  const [current, setCurrent] = useState(0)
  const [search, setSearch] = useState('')

  useEffect(() => {
    const timer = setInterval(() => setCurrent(c => (c + 1) % slides.length), 5000)
    return () => clearInterval(timer)
  }, [])

  const slide = slides[current]

  const handleSearch = () => {
    setCurrentPage('explorer')
  }

  return (
    <div className="relative w-full overflow-hidden" style={{ minHeight: '100vh' }}>
      {/* Background Slideshow */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.4 }}
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('${slide.img}')`,
          }}
        />
      </AnimatePresence>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-white text-center">

        {/* Badge */}
        <motion.div
          key={`badge-${current}`}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <span className="bg-[#d4af37]/90 text-white text-xs font-black uppercase tracking-[0.25em] px-5 py-2 rounded-full shadow-lg">
            {slide.tag}
          </span>
        </motion.div>

        {/* Headline */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`title-${current}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.7 }}
            className="mb-4"
          >
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black tracking-tight leading-none mb-3">
              {slide.title}
            </h1>
            <p className="text-xl sm:text-2xl font-light text-white/80 tracking-wide">
              {slide.subtitle}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-base sm:text-lg text-white/60 font-light max-w-xl mx-auto mb-10 mt-4"
        >
          Discover ancient civilizations, dramatic landscapes, and vibrant cultures across the Horn of Africa.
        </motion.p>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="w-full max-w-3xl mx-auto"
        >
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-3 flex flex-col sm:flex-row gap-3 shadow-2xl">
            {/* Destination Input */}
            <div className="flex-1 bg-white/10 rounded-xl px-4 py-3 flex items-center gap-3 border border-white/10">
              <svg className="w-5 h-5 text-[#d4af37] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
              <input
                type="text"
                placeholder="Where do you want to go?"
                value={search}
                onChange={e => setSearch(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSearch()}
                className="bg-transparent text-white placeholder-white/50 focus:outline-none text-sm w-full"
              />
            </div>

            {/* Category */}
            <div className="bg-white/10 rounded-xl px-4 py-3 flex items-center gap-3 border border-white/10 min-w-[160px]">
              <svg className="w-5 h-5 text-[#d4af37] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16"/>
              </svg>
              <select className="bg-transparent text-white/80 focus:outline-none text-sm w-full appearance-none cursor-pointer">
                <option className="text-gray-900" value="">All Types</option>
                <option className="text-gray-900">Cultural Tours</option>
                <option className="text-gray-900">Adventure Trips</option>
                <option className="text-gray-900">Nature Tours</option>
                <option className="text-gray-900">Coastal & Marine</option>
              </select>
            </div>

            {/* Search Button */}
            <button
              onClick={handleSearch}
              className="bg-[#d4af37] hover:bg-[#f1d38a] text-[#2d3e23] font-black px-8 py-3 rounded-xl transition-all hover:scale-105 shadow-lg text-sm uppercase tracking-wider whitespace-nowrap"
            >
              Explore Now
            </button>
          </div>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="mt-12 flex flex-wrap justify-center gap-8 sm:gap-16"
        >
          {[
            { value: `${destinations.length > 0 ? destinations.length : 17}+`, label: 'Destinations' },
            { value: `${destinations.length > 0 ? [...new Set(destinations.map(d => d.country))].filter(Boolean).length : 4}`, label: 'Countries' },
            { value: '500+', label: 'Happy Travelers' },
            { value: '10+', label: 'Years Experience' },
          ].map(stat => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl font-black text-[#d4af37]">{stat.value}</p>
              <p className="text-xs text-white/60 uppercase tracking-widest font-medium mt-1">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === current ? 'w-8 bg-[#d4af37]' : 'w-2 bg-white/30'
              }`}
            />
          ))}
        </div>

        {/* Scroll Hint */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 right-8 hidden sm:flex flex-col items-center gap-2 text-white/40"
        >
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
          </svg>
        </motion.div>
      </div>
    </div>
  )
}

export default Hero
