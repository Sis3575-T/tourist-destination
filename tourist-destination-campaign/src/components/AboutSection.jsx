import { motion } from 'framer-motion'

const AboutSection = ({ setCurrentPage }) => {
  const features = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
        </svg>
      ),
      title: 'Fully Licensed',
      desc: 'Certified by Ethiopian Tourism Authority',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/>
        </svg>
      ),
      title: 'Expert Guides',
      desc: 'Local guides with 10+ years experience',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
      ),
      title: '4 Countries',
      desc: 'Ethiopia, Djibouti, Eritrea & Somalia',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
      ),
      title: '24/7 Support',
      desc: 'Round-the-clock assistance for travelers',
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3]">
              <img
                src="https://images.unsplash.com/photo-1528127269322-539801943592?w=900&fit=crop"
                alt="Ethiopian landscape"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2d3e23]/60 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#d4af37] rounded-xl flex items-center justify-center shrink-0">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-white font-black text-lg">4.9 / 5.0</p>
                    <p className="text-white/70 text-xs">Based on 500+ traveler reviews</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Badge */}
            <div className="absolute -top-4 -right-4 bg-[#2d3e23] text-white rounded-2xl p-4 shadow-xl">
              <p className="text-3xl font-black text-[#d4af37]">10+</p>
              <p className="text-xs text-white/70 uppercase tracking-wider">Years</p>
            </div>
          </motion.div>

          {/* Text Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-[#d4af37] text-xs font-black uppercase tracking-[0.3em] mb-4 block">
              About EthioTour
            </span>
            <h2 className="text-4xl sm:text-5xl font-black text-[#2d3e23] leading-tight mb-6">
              Your Gateway to the<br />
              <span className="text-[#d4af37]">Horn of Africa</span>
            </h2>
            <p className="text-gray-500 leading-relaxed text-lg mb-6 font-light">
              EthioTour has over a decade of experience crafting premium, personalized journeys across Ethiopia, Djibouti, Eritrea, and Somalia. We connect international travelers with the ancient wonders, dramatic landscapes, and vibrant cultures of East Africa.
            </p>
            <p className="text-gray-500 leading-relaxed mb-10 font-light">
              From the rock-hewn churches of Lalibela to the alien landscapes of the Danakil Depression, every journey we design is a once-in-a-lifetime experience backed by expert local knowledge and world-class service.
            </p>

            {/* Feature Grid */}
            <div className="grid grid-cols-2 gap-4 mb-10">
              {features.map(f => (
                <div key={f.title} className="flex items-start gap-3 p-4 bg-[#f8f7f4] rounded-2xl">
                  <div className="w-10 h-10 bg-[#2d3e23] text-[#d4af37] rounded-xl flex items-center justify-center shrink-0">
                    {f.icon}
                  </div>
                  <div>
                    <p className="font-bold text-[#2d3e23] text-sm">{f.title}</p>
                    <p className="text-gray-500 text-xs mt-0.5">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setCurrentPage('about')}
              className="bg-[#2d3e23] text-white px-8 py-4 rounded-2xl font-bold hover:bg-[#3d4a35] transition-all shadow-lg hover:shadow-xl inline-flex items-center gap-2"
            >
              Our Full Story
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
