import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const Hero = ({ setCurrentPage, destinations }) => {
  const [bgImage, setBgImage] = useState('/destinations/gonder.jpg')

  const names =
    destinations && destinations.length > 0
      ? [...new Set(destinations.map((d) => d.name))].slice(0, 8).concat(['Explore all…'])
      : ['Lalibela', 'Danakil Depression', 'Simien Mountains', 'Explore all…']

  const trendingTags = [
    { name: 'Lalibela', img: '/destinations/lalibela.jpg' },
    { name: 'Danakil', img: 'https://images.unsplash.com/photo-1544085311-11a028465b0c?w=1600&h=900&fit=crop' },
    { name: 'Omo Valley', img: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1600&h=900&fit=crop' },
    { name: 'Simien', img: '/destinations/semien_mountain.jpg' },
    { name: 'Gonder', img: '/destinations/gonder.jpg' }
  ]

  return (
    <div
      className="relative flex flex-col items-center justify-center text-white overflow-hidden"
      style={{ minHeight: '650px' }}
    >
      {/* Dynamic Background with Transition */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={bgImage}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url('${bgImage}')`
          }}
        />
      </AnimatePresence>

      <div className="relative z-10 text-center px-4 max-w-5xl">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl sm:text-6xl lg:text-7xl font-extrabold mb-6 tracking-tight leading-tight"
        >
          Discover the Heart <br/>
          <span className="text-[#d4af37]">of Ethiopia</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl sm:text-2xl font-light tracking-wide opacity-90 mb-12 max-w-3xl mx-auto"
        >
          Experience ancient history, breathtaking landscapes, and vibrant cultures with our premium guided journeys.
        </motion.p>

        {/* Search Bar - Glassmorphism */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="w-full max-w-4xl mx-auto"
        >
          <div className="bg-white/10 backdrop-blur-md p-4 flex flex-col md:flex-row items-center gap-4 rounded-2xl border border-white/20 shadow-2xl">
            <div className="flex-1 w-full bg-white/5 rounded-xl border border-white/10 px-2 text-left">
              <label className="block text-[10px] uppercase tracking-widest text-white/50 ml-4 mt-2">Destination</label>
              <select
                className="w-full px-4 py-2 bg-transparent text-white focus:outline-none text-sm appearance-none cursor-pointer"
                onChange={(e) => {
                  if (e.target.value === 'Explore all…') setCurrentPage('explorer')
                }}
                defaultValue=""
              >
                <option value="" disabled className="text-gray-900">Where are you going?</option>
                {names.map((n) => (
                  <option key={n} value={n} className="text-gray-900">{n}</option>
                ))}
              </select>
            </div>
            <div className="flex-1 w-full bg-white/5 rounded-xl border border-white/10 px-2 text-left">
              <label className="block text-[10px] uppercase tracking-widest text-white/50 ml-4 mt-2">Season</label>
              <select className="w-full px-4 py-2 bg-transparent text-white focus:outline-none text-sm appearance-none cursor-pointer">
                <option className="text-gray-900">Dry Season</option>
                <option className="text-gray-900">Rainy Season</option>
                <option className="text-gray-900">Anytime</option>
              </select>
            </div>
            <div className="w-full md:w-auto">
              <button
                type="button"
                onClick={() => setCurrentPage('explorer')}
                className="w-full md:w-auto bg-[#d4af37] text-[#2d3e23] px-10 py-4 font-bold rounded-xl hover:bg-[#f1d38a] transition-all transform hover:scale-105 shadow-lg"
              >
                Explore Now
              </button>
            </div>
          </div>
        </motion.div>

        {/* Interactive Trending Tags */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-8 flex flex-wrap justify-center gap-4 text-sm font-medium"
        >
          <span className="text-white/60 py-1">Popular:</span>
          {trendingTags.map(tag => (
            <button 
              key={tag.name} 
              onClick={() => setBgImage(tag.img)}
              className={`px-4 py-1 rounded-full border transition-all duration-500 ${
                bgImage === tag.img 
                ? 'bg-[#d4af37] border-[#d4af37] text-[#2d3e23]' 
                : 'bg-white/5 border-white/10 hover:bg-white/20'
              }`}
            >
              {tag.name}
            </button>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

export default Hero
