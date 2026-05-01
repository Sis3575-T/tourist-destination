import { motion } from 'framer-motion'

const TrustSection = ({ setCurrentPage }) => {
  const stats = [
    { value: '500+', label: 'International Travelers', icon: '🌍' },
    { value: '17+', label: 'Curated Destinations', icon: '📍' },
    { value: '4.9★', label: 'Average Rating', icon: '⭐' },
    { value: '10+', label: 'Years of Excellence', icon: '🏆' },
  ]

  const awards = [
    { name: 'TripAdvisor', label: "Traveler's Choice 2024" },
    { name: 'UNESCO', label: 'Heritage Tour Partner' },
    { name: 'IATA', label: 'Certified Travel Agency' },
    { name: 'ETA', label: 'Ethiopian Tourism Authority' },
  ]

  return (
    <section className="py-20 bg-[#2d3e23] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#d4af37] rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#d4af37] rounded-full blur-[120px] translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center p-8 bg-white/5 rounded-3xl border border-white/10 hover:bg-white/10 transition-all"
            >
              <div className="text-4xl mb-3">{stat.icon}</div>
              <p className="text-4xl font-black text-[#d4af37] mb-2">{stat.value}</p>
              <p className="text-white/60 text-sm font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[#d4af37]/10 border border-[#d4af37]/20 rounded-3xl p-10 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8 mb-20"
        >
          <div>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-3">
              Ready for Your Next Adventure?
            </h2>
            <p className="text-white/60 text-lg font-light max-w-xl">
              Join hundreds of international travelers who have discovered the magic of the Horn of Africa with us.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 shrink-0">
            <button
              onClick={() => setCurrentPage('explorer')}
              className="bg-[#d4af37] text-[#2d3e23] px-8 py-4 rounded-2xl font-black hover:bg-[#f1d38a] transition-all shadow-xl whitespace-nowrap"
            >
              Browse Destinations
            </button>
            <button
              onClick={() => setCurrentPage('recommendations')}
              className="border border-white/20 text-white px-8 py-4 rounded-2xl font-bold hover:bg-white/10 transition-all whitespace-nowrap"
            >
              Get Recommendations
            </button>
          </div>
        </motion.div>

        {/* Trust Badges */}
        <div className="text-center">
          <p className="text-white/40 text-xs uppercase tracking-[0.3em] font-bold mb-8">Trusted & Certified By</p>
          <div className="flex flex-wrap justify-center gap-6">
            {awards.map(a => (
              <div key={a.name} className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-center hover:bg-white/10 transition-all">
                <p className="text-white font-black text-sm">{a.name}</p>
                <p className="text-white/40 text-xs mt-1">{a.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default TrustSection
