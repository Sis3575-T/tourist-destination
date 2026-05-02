import { useEffect, useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { API_BASE } from '../api'

const Stars = ({ rating, size = 'sm' }) => {
  const sz = size === 'lg' ? 'w-6 h-6' : 'w-4 h-4'
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => (
        <svg key={i} className={`${sz} fill-current ${i < rating ? 'text-amber-400' : 'text-gray-200'}`} viewBox="0 0 24 24">
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
        </svg>
      ))}
    </div>
  )
}

const tagColors = {
  'Adventure':       'bg-red-100 text-red-700',
  'Cultural Tour':   'bg-purple-100 text-purple-700',
  'Nature & Trekking': 'bg-green-100 text-green-700',
  'Coastal & Marine': 'bg-blue-100 text-blue-700',
  'City & Heritage': 'bg-rose-100 text-rose-700',
  'Corporate Travel': 'bg-gray-100 text-gray-700',
  'Wildlife & Safari': 'bg-amber-100 text-amber-700',
}

const ReviewsPage = ({ setCurrentPage }) => {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('All')
  const [sort, setSort] = useState('newest')
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ name: '', location: '', rating: 5, tag: '', text: '' })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    fetch(`${API_BASE}/reviews`)
      .then(r => r.json())
      .then(data => { setReviews(Array.isArray(data) ? data : []); setLoading(false) })
      .catch(() => { setReviews([]); setLoading(false) })
  }, [])

  const tags = ['All', ...new Set(reviews.map(r => r.tag).filter(Boolean))]

  const filtered = useMemo(() => {
    let r = filter === 'All' ? reviews : reviews.filter(r => r.tag === filter)
    if (sort === 'highest') r = [...r].sort((a, b) => b.rating - a.rating)
    else if (sort === 'lowest') r = [...r].sort((a, b) => a.rating - b.rating)
    return r
  }, [reviews, filter, sort])

  // Stats
  const avgRating = reviews.length ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1) : 0
  const ratingCounts = [5,4,3,2,1].map(n => ({
    n,
    count: reviews.filter(r => r.rating === n).length,
    pct: reviews.length ? Math.round((reviews.filter(r => r.rating === n).length / reviews.length) * 100) : 0
  }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      const res = await fetch(`${API_BASE}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(form.name)}&background=2d3e23&color=d4af37&size=150`,
          date: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
          verified: true,
        }),
      })
      const newReview = await res.json()
      setReviews(prev => [newReview, ...prev])
      setSubmitted(true)
      setForm({ name: '', location: '', rating: 5, tag: '', text: '' })
      setTimeout(() => { setSubmitted(false); setShowForm(false) }, 3000)
    } catch {
      alert('Failed to submit review. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#fcfbf7] pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Back */}
        <button
          onClick={() => setCurrentPage('home')}
          className="flex items-center gap-2 text-gray-400 hover:text-[#2d3e23] transition-colors mb-8 text-sm font-medium"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/>
          </svg>
          Back to Home
        </button>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-14">
          <span className="text-[#d4af37] text-xs font-black uppercase tracking-[0.3em] mb-3 block">
            Verified Traveler Reviews
          </span>
          <h1 className="text-5xl font-black text-[#2d3e23] mb-4">What Our Travelers Say</h1>
          <p className="text-gray-400 text-lg font-light max-w-2xl mx-auto">
            Real experiences from real travelers across the Horn of Africa. Every review is verified.
          </p>
        </motion.div>

        {/* Stats Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 mb-10"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

            {/* Overall Score */}
            <div className="text-center md:text-left flex flex-col md:flex-row items-center gap-6">
              <div>
                <p className="text-8xl font-black text-[#2d3e23]">{avgRating}</p>
                <Stars rating={Math.round(avgRating)} size="lg" />
                <p className="text-gray-400 text-sm mt-2 font-medium">{reviews.length} verified reviews</p>
              </div>
              <div className="hidden md:block w-px h-24 bg-gray-100" />
              <div className="text-center">
                <p className="text-4xl font-black text-[#d4af37]">98%</p>
                <p className="text-gray-400 text-sm font-medium">Would recommend</p>
                <p className="text-3xl font-black text-[#2d3e23] mt-3">{reviews.filter(r => r.rating >= 4).length}</p>
                <p className="text-gray-400 text-sm font-medium">4★ or higher</p>
              </div>
            </div>

            {/* Rating Breakdown */}
            <div className="space-y-2">
              {ratingCounts.map(({ n, count, pct }) => (
                <div key={n} className="flex items-center gap-3">
                  <span className="text-sm font-bold text-gray-500 w-4">{n}</span>
                  <svg className="w-3.5 h-3.5 text-amber-400 fill-current shrink-0" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                  </svg>
                  <div className="flex-1 bg-gray-100 rounded-full h-2.5 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ delay: 0.3, duration: 0.8 }}
                      className="h-full bg-[#d4af37] rounded-full"
                    />
                  </div>
                  <span className="text-xs text-gray-400 w-8 text-right">{count}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Filters + Sort + Write Review */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          {/* Tag Filters */}
          <div className="flex flex-wrap gap-2">
            {tags.map(tag => (
              <button
                key={tag}
                onClick={() => setFilter(tag)}
                className={`text-xs font-bold px-4 py-2 rounded-full border transition-all ${
                  filter === tag
                    ? 'bg-[#2d3e23] text-white border-[#2d3e23]'
                    : 'bg-white text-gray-500 border-gray-200 hover:border-[#2d3e23] hover:text-[#2d3e23]'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {/* Sort */}
            <select
              value={sort}
              onChange={e => setSort(e.target.value)}
              className="text-xs font-bold text-gray-500 border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#d4af37] bg-white cursor-pointer"
            >
              <option value="newest">Newest First</option>
              <option value="highest">Highest Rated</option>
              <option value="lowest">Lowest Rated</option>
            </select>

            {/* Write Review */}
            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-[#d4af37] text-[#2d3e23] px-5 py-2 rounded-xl text-xs font-black hover:bg-[#f1d38a] transition-all shadow-md"
            >
              + Write a Review
            </button>
          </div>
        </div>

        {/* Write Review Form */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 mb-10 overflow-hidden"
            >
              {submitted ? (
                <div className="text-center py-8">
                  <div className="text-5xl mb-3">🎉</div>
                  <h3 className="text-xl font-black text-[#2d3e23] mb-2">Thank you for your review!</h3>
                  <p className="text-gray-400">Your experience helps other travelers discover Ethiopia.</p>
                </div>
              ) : (
                <>
                  <h3 className="text-xl font-black text-[#2d3e23] mb-6">Share Your Experience</h3>
                  <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Your Name *</label>
                      <input required value={form.name} onChange={e => setForm(f => ({...f, name: e.target.value}))}
                        placeholder="Full name" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#d4af37] text-sm" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Location</label>
                      <input value={form.location} onChange={e => setForm(f => ({...f, location: e.target.value}))}
                        placeholder="City, Country" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#d4af37] text-sm" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Rating *</label>
                      <div className="flex items-center gap-2">
                        {[1,2,3,4,5].map(n => (
                          <button key={n} type="button" onClick={() => setForm(f => ({...f, rating: n}))}
                            className={`w-10 h-10 rounded-xl font-black text-sm transition-all ${form.rating >= n ? 'bg-amber-400 text-white' : 'bg-gray-100 text-gray-400'}`}>
                            {n}★
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Tour Type</label>
                      <select value={form.tag} onChange={e => setForm(f => ({...f, tag: e.target.value}))}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#d4af37] text-sm bg-white">
                        <option value="">Select type</option>
                        {['Adventure','Cultural Tour','Nature & Trekking','Coastal & Marine','City & Heritage','Corporate Travel','Wildlife & Safari'].map(t => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Your Review *</label>
                      <textarea required value={form.text} onChange={e => setForm(f => ({...f, text: e.target.value}))}
                        rows={4} placeholder="Tell us about your experience..."
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#d4af37] text-sm resize-none" />
                    </div>
                    <div className="sm:col-span-2 flex gap-3">
                      <button type="submit" disabled={submitting}
                        className="bg-[#2d3e23] text-white px-8 py-3 rounded-2xl font-black hover:bg-[#3d4a35] transition-all disabled:opacity-60">
                        {submitting ? 'Submitting...' : 'Submit Review'}
                      </button>
                      <button type="button" onClick={() => setShowForm(false)}
                        className="border border-gray-200 text-gray-500 px-6 py-3 rounded-2xl font-bold hover:bg-gray-50 transition-all">
                        Cancel
                      </button>
                    </div>
                  </form>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results count */}
        <p className="text-sm text-gray-400 mb-6">
          Showing <span className="font-black text-[#2d3e23]">{filtered.length}</span> reviews
          {filter !== 'All' && <span> in <span className="font-bold">{filter}</span></span>}
        </p>

        {/* Reviews Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[...Array(6)].map(i => <div key={i} className="bg-white rounded-3xl h-48 animate-pulse border border-gray-100" />)}
          </div>
        ) : (
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AnimatePresence>
              {filtered.map((review, idx) => (
                <motion.div
                  key={review._id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: Math.min(idx * 0.04, 0.3) }}
                  className="bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 p-7 flex flex-col"
                >
                  {/* Header */}
                  <div className="flex items-start gap-4 mb-4">
                    <img
                      src={review.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(review.name)}&background=2d3e23&color=d4af37&size=150`}
                      alt={review.name}
                      className="w-14 h-14 rounded-2xl object-cover shrink-0 border-2 border-[#f8f7f4]"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 flex-wrap">
                        <div>
                          <h3 className="font-black text-[#2d3e23] text-base">{review.name}</h3>
                          <p className="text-gray-400 text-xs mt-0.5 flex items-center gap-1">
                            <svg className="w-3 h-3 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                            </svg>
                            {review.location}
                          </p>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          <Stars rating={review.rating} />
                          <span className="text-[10px] text-gray-300 font-medium">{review.date}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Review Text */}
                  <p className="text-gray-600 leading-relaxed text-sm font-light flex-1 italic">
                    "{review.text}"
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between mt-5 pt-4 border-t border-gray-50">
                    <div className="flex items-center gap-2">
                      {review.tag && (
                        <span className={`text-xs font-bold px-3 py-1 rounded-full ${tagColors[review.tag] || 'bg-gray-100 text-gray-600'}`}>
                          {review.tag}
                        </span>
                      )}
                      {review.verified && (
                        <span className="flex items-center gap-1 text-[10px] text-green-600 font-bold">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                          </svg>
                          Verified
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {!loading && filtered.length === 0 && (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🔍</div>
            <p className="text-gray-400 text-lg">No reviews in this category yet.</p>
          </div>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 bg-[#2d3e23] rounded-3xl p-10 md:p-14 text-center text-white"
        >
          <h2 className="text-3xl md:text-4xl font-black mb-4">Ready to Write Your Own Story?</h2>
          <p className="text-white/60 text-lg font-light mb-8 max-w-2xl mx-auto">
            Join hundreds of international travelers who have discovered the magic of the Horn of Africa. Your adventure starts here.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
            <button
              onClick={() => setCurrentPage('explorer')}
              className="bg-[#d4af37] text-[#2d3e23] px-10 py-4 rounded-2xl font-black hover:bg-[#f1d38a] transition-all shadow-xl"
            >
              Browse Destinations
            </button>
            <button
              onClick={() => setCurrentPage('recommendations')}
              className="border border-white/20 text-white px-10 py-4 rounded-2xl font-bold hover:bg-white/10 transition-all"
            >
              Get Recommendations
            </button>
          </div>

          {/* Contact */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto">
            <a href="tel:+251935756054" className="bg-white/10 border border-white/20 rounded-2xl p-5 hover:bg-white/20 transition-all text-left">
              <p className="text-[#d4af37] text-xs font-black uppercase tracking-wider mb-1">📞 Call Us</p>
              <p className="font-black text-lg">+251 935 756 054</p>
              <p className="text-white/50 text-xs">Available 24/7</p>
            </a>
            <a href="mailto:sisay3575@gmail.com" className="bg-white/10 border border-white/20 rounded-2xl p-5 hover:bg-white/20 transition-all text-left">
              <p className="text-[#d4af37] text-xs font-black uppercase tracking-wider mb-1">✉️ Email Us</p>
              <p className="font-black text-lg">sisay3575@gmail.com</p>
              <p className="text-white/50 text-xs">Reply within 2 hours</p>
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default ReviewsPage
