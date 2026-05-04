import { motion } from 'framer-motion'

const BlogDetail = ({ blog, setCurrentPage }) => {
  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fcfbf7]">
        <div className="text-center">
          <div className="text-6xl mb-4">📰</div>
          <h2 className="text-2xl font-bold text-[#2d3e23] mb-4">Blog post not found</h2>
          <button onClick={() => setCurrentPage('home')} className="bg-[#2d3e23] text-white px-8 py-3 rounded-2xl font-bold hover:bg-[#3d4a35] transition-all">
            Back to Home
          </button>
        </div>
      </div>
    )
  }

  // Use content from DB if available, otherwise use excerpt
  const paragraphs = blog.content
    ? blog.content.split('\n').filter(p => p.trim())
    : [blog.excerpt]

  return (
    <div className="min-h-screen bg-white">

      {/* Hero */}
      <div className="relative h-[50vh] md:h-[65vh] overflow-hidden">
        <motion.img
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          src={blog.image}
          alt={blog.title}
          className="w-full h-full object-cover"
          onError={(e) => { e.target.src = '/destinations/lalibela.jpg' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => setCurrentPage('home')}
          className="absolute top-8 left-6 glass text-white px-5 py-2.5 rounded-2xl flex items-center gap-2 font-bold text-sm hover:bg-white/30 transition-all"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7"/>
          </svg>
          Back to Blog
        </motion.button>

        <div className="absolute bottom-10 left-6 right-6 md:left-16 md:right-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <span className="bg-[#d4af37] text-white text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-wider mb-4 inline-block">
              Travel Guide
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight">{blog.title}</h1>
          </motion.div>
        </div>
      </div>

      {/* Article */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-6 text-gray-400 text-sm mb-12 pb-8 border-b border-gray-100">
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
            </svg>
            Ethiopian Tourist Destination Editorial
          </span>
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
            </svg>
            5 min read
          </span>
        </div>

        {/* Content */}
        <div className="space-y-6 text-gray-700 text-lg leading-relaxed font-light">
          {paragraphs.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 bg-[#2d3e23] rounded-3xl p-10 text-center text-white">
          <h3 className="text-2xl font-black mb-3">Ready to Experience This?</h3>
          <p className="text-white/60 mb-6 font-light">Turn this story into your own adventure. Browse our destinations and book your journey today.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setCurrentPage('explorer')}
              className="bg-[#d4af37] text-[#2d3e23] px-8 py-3 rounded-2xl font-black hover:bg-[#f1d38a] transition-all shadow-xl"
            >
              Browse Destinations
            </button>
            <button
              onClick={() => setCurrentPage('recommendations')}
              className="border border-white/20 text-white px-8 py-3 rounded-2xl font-bold hover:bg-white/10 transition-all"
            >
              Get Recommendations
            </button>
          </div>
        </div>

        {/* Share */}
        <div className="mt-10 flex items-center gap-4">
          <span className="text-sm font-bold text-gray-500">Share:</span>
          {[
            { label: 'Facebook', color: 'hover:bg-blue-600' },
            { label: 'Twitter', color: 'hover:bg-sky-500' },
            { label: 'WhatsApp', color: 'hover:bg-green-500' },
          ].map(s => (
            <button key={s.label} className={`text-xs font-bold text-gray-400 border border-gray-200 px-4 py-2 rounded-xl ${s.color} hover:text-white hover:border-transparent transition-all`}>
              {s.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default BlogDetail
