import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import axios from 'axios'

const statusStyles = {
  pending:   { pill: 'bg-yellow-100 text-yellow-800 border-yellow-200', icon: '⏳', label: 'Awaiting Review' },
  confirmed: { pill: 'bg-green-100 text-green-800 border-green-200',   icon: '✅', label: 'Confirmed' },
  completed: { pill: 'bg-blue-100 text-blue-800 border-blue-200',      icon: '🏁', label: 'Completed' },
  cancelled: { pill: 'bg-red-100 text-red-800 border-red-200',         icon: '❌', label: 'Cancelled' },
}

// Distinguish admin-rejected vs traveler-cancelled
const getStatusStyle = (booking) => {
  if (booking.status === 'cancelled' && booking.reviewedBy === 'Admin') {
    return { pill: 'bg-red-100 text-red-800 border-red-200', icon: '❌', label: 'Rejected by Admin' }
  }
  return statusStyles[booking.status] || statusStyles.pending
}

const Dashboard = ({ destinations = [], setCurrentPage, apiBase, userId, user, onLogout }) => {
  const [tab, setTab]           = useState('bookings')
  const [bookings, setBookings] = useState([])
  const [messages, setMessages] = useState([])
  const [bLoading, setBLoading] = useState(true)
  const [mLoading, setMLoading] = useState(true)
  const [expanded, setExpanded] = useState(null)
  const [expandedM, setExpandedM] = useState(null)
  const [error, setError]       = useState('')

  // Email for message lookup — use logged-in user's email, or auto-fill from first booking
  const [travelerEmail, setTravelerEmail] = useState(user?.email || '')

  const loadBookings = () => {
    if (!userId) { setBLoading(false); return }
    axios.get(`${apiBase}/bookings/user/${userId}`)
      .then(({ data }) => {
        const list = Array.isArray(data) ? data : []
        setBookings(list)
        // Auto-fill email from first booking only if not already set
        if (!travelerEmail && list.length > 0 && list[0].email) {
          setTravelerEmail(list[0].email)
        }
      })
      .catch(e => setError(e.message))
      .finally(() => setBLoading(false))
  }

  const loadMessages = (email) => {
    if (!email) { setMLoading(false); return }
    axios.get(`${apiBase}/messages/email/${encodeURIComponent(email)}`)
      .then(({ data }) => setMessages(Array.isArray(data) ? data : []))
      .catch(() => setMessages([]))
      .finally(() => setMLoading(false))
  }

  useEffect(() => { loadBookings() }, [apiBase, userId])

  // Load messages once we have the email
  useEffect(() => {
    if (travelerEmail) loadMessages(travelerEmail)
  }, [travelerEmail])

  const refresh = () => {
    setBLoading(true); setMLoading(true)
    loadBookings()
    if (travelerEmail) loadMessages(travelerEmail)
  }

  const resolveDest = (b) => {
    if (b.destinationPreview?.name) return b.destinationPreview
    if (typeof b.destinationId === 'object' && b.destinationId?.name) return b.destinationId
    const d = destinations.find(x => String(x._id) === String(b.destinationId))
    return d || { name: 'Tour', location: '', image: '', price: 0 }
  }

  const fmt     = (n) => n ? `$${Number(n).toLocaleString()}` : '—'
  const fmtDate = (d) => d ? new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : '—'

  // Notifications: bookings with admin response
  const notifications = bookings.filter(b => b.adminNote || b.rejectionReason)
  // Unread messages (replied by admin but not yet seen)
  const unreadReplies = messages.filter(m => m.status === 'replied')

  return (
    <div className="min-h-screen bg-[#fcfbf7] pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-black text-[#2d3e23]">
              {user?.name ? `Welcome, ${user.name.split(' ')[0]}` : 'My Dashboard'}
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              {user?.email || 'Your bookings, admin responses, and messages — all in one place.'}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={refresh}
              className="flex items-center gap-2 text-sm text-[#2d3e23] border border-gray-200 bg-white px-4 py-2 rounded-xl hover:bg-gray-50 transition-all">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
              </svg>
              Refresh
            </button>
            {onLogout && (
              <button onClick={onLogout}
                className="text-sm text-red-400 border border-red-200 px-4 py-2 rounded-xl hover:bg-red-50 transition-all font-bold">
                Logout
              </button>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Bookings', value: bookings.length, color: 'text-[#2d3e23]' },
            { label: 'Pending', value: bookings.filter(b => b.status === 'pending').length, color: 'text-yellow-600' },
            { label: 'Confirmed', value: bookings.filter(b => b.status === 'confirmed').length, color: 'text-green-600' },
            { label: 'Admin Replies', value: unreadReplies.length, color: 'text-blue-600' },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm text-center">
              <p className={`text-3xl font-black ${s.color}`}>{s.value}</p>
              <p className="text-xs text-gray-400 mt-1 font-medium">{s.label}</p>
            </div>
          ))}
        </div>

        {/* ── ADMIN RESPONSE BANNERS — only show when admin has reviewed ── */}
        <AnimatePresence>
          {bookings.filter(b => b.reviewedBy === 'Admin' && (b.adminNote || b.rejectionReason || b.status === 'confirmed')).map(b => {
            const dest = resolveDest(b)
            const isConfirmed = b.status === 'confirmed'
            return (
              <motion.div key={b._id + '-notif'}
                initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className={`flex items-start gap-4 p-5 rounded-2xl border mb-3 ${isConfirmed ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-white font-black ${isConfirmed ? 'bg-green-500' : 'bg-red-500'}`}>
                  {isConfirmed ? '✓' : '✕'}
                </div>
                <div className="flex-1">
                  <p className={`font-black text-sm ${isConfirmed ? 'text-green-800' : 'text-red-800'}`}>
                    {isConfirmed ? '✅ Your booking has been CONFIRMED' : '❌ Your booking was REJECTED'}
                    {' — '}<span className="font-black">{dest.name}</span>
                  </p>
                  {b.adminNote && (
                    <p className="text-sm text-gray-700 mt-1 bg-white/60 rounded-xl px-3 py-2 mt-2">
                      <span className="font-bold">Admin note:</span> {b.adminNote}
                    </p>
                  )}
                  {b.rejectionReason && (
                    <p className="text-sm text-red-700 mt-1 bg-white/60 rounded-xl px-3 py-2 mt-2">
                      <span className="font-bold">Reason:</span> {b.rejectionReason}
                    </p>
                  )}
                  <p className="text-xs text-gray-400 mt-2">
                    Ref: <span className="font-mono font-bold">{b._id?.slice(-8).toUpperCase()}</span>
                    {b.reviewedAt && ` · Reviewed ${fmtDate(b.reviewedAt)}`}
                  </p>
                </div>
                {isConfirmed ? (
                  <button onClick={() => setCurrentPage('explorer')}
                    className="shrink-0 bg-green-600 text-white text-xs font-black px-4 py-2 rounded-xl hover:bg-green-700 transition-all">
                    Book Again
                  </button>
                ) : (
                  <button onClick={() => setCurrentPage('contact')}
                    className="shrink-0 bg-red-500 text-white text-xs font-black px-4 py-2 rounded-xl hover:bg-red-600 transition-all">
                    Contact Us
                  </button>
                )}
              </motion.div>
            )
          })}
        </AnimatePresence>

        {/* ── TABS ── */}
        <div className="flex gap-2 mb-6">
          {[
            { id: 'bookings', label: 'My Bookings', badge: bookings.filter(b => b.status === 'pending').length },
            { id: 'messages', label: 'My Messages', badge: unreadReplies.length },
          ].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-black text-sm transition-all ${
                tab === t.id ? 'bg-[#2d3e23] text-white shadow-lg' : 'bg-white text-gray-500 border border-gray-100 hover:border-[#2d3e23]'
              }`}>
              {t.label}
              {t.badge > 0 && (
                <span className={`text-xs px-2 py-0.5 rounded-full font-black ${tab === t.id ? 'bg-[#d4af37] text-[#2d3e23]' : 'bg-red-100 text-red-600'}`}>
                  {t.badge}
                </span>
              )}
            </button>
          ))}
          <button onClick={() => setCurrentPage('contact')}
            className="ml-auto flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-sm bg-[#d4af37] text-[#2d3e23] hover:bg-[#f1d38a] transition-all shadow-md">
            + New Message
          </button>
        </div>

        {/* ── BOOKINGS TAB ── */}
        {tab === 'bookings' && (
          <div>
    {bLoading && <div className="space-y-3">{[1,2,3].map(i => <div key={i} className="bg-white rounded-2xl h-24 animate-pulse border border-gray-100"/>)}</div>}
            {error && <p className="text-red-500 text-sm mb-4">⚠️ {error}</p>}

            {!bLoading && !userId && (
              <div className="text-center py-20 bg-white rounded-3xl border border-gray-100">
                <div className="text-5xl mb-4">🔐</div>
                <h3 className="text-xl font-black text-[#2d3e23] mb-2">Sign in to see your bookings</h3>
                <p className="text-gray-400 mb-6">Create an account or log in to track your trips and messages.</p>
                <button onClick={() => setCurrentPage('login')}
                  className="bg-[#2d3e23] text-white px-8 py-3 rounded-2xl font-black hover:bg-[#3d4a35] transition-all">
                  Sign In / Register
                </button>
              </div>
            )}

            {!bLoading && bookings.length > 0 && (
              <div className="space-y-3">
                {bookings.map((booking, idx) => {
                  const dest = resolveDest(booking)
                  const svc  = booking.servicePreview
                  const st   = getStatusStyle(booking)
                  const isOpen = expanded === booking._id

                  return (
                    <motion.div key={booking._id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.04 }}
                      className={`bg-white rounded-3xl border shadow-sm overflow-hidden ${
                        booking.status === 'confirmed' ? 'border-green-200' :
                        booking.status === 'cancelled' ? 'border-red-200' : 'border-gray-100'
                      }`}>

                      {/* Summary */}
                      <div className="flex items-center gap-4 p-5 cursor-pointer hover:bg-gray-50 transition-colors"
                        onClick={() => setExpanded(isOpen ? null : booking._id)}>
                        <div className="w-14 h-14 rounded-2xl overflow-hidden shrink-0 bg-gray-100">
                          {dest.image && <img src={dest.image} alt={dest.name} className="w-full h-full object-cover"/>}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="font-black text-[#2d3e23] truncate">{dest.name}</h3>
                            <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${st.pill}`}>
                              {st.icon} {st.label}
                            </span>
                          </div>
                          <p className="text-gray-400 text-xs mt-0.5">
                            {dest.location} · {fmtDate(booking.date)} · {booking.travelers} traveler{booking.travelers > 1 ? 's' : ''}
                            {svc?.name && ` · ${svc.icon} ${svc.name}`}
                          </p>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="font-black text-[#2d3e23]">{fmt(booking.totalAmount)}</p>
                          <p className="text-xs text-gray-400">{booking.paymentMethod}</p>
                        </div>
                        <svg className={`w-5 h-5 text-gray-300 transition-transform shrink-0 ${isOpen ? 'rotate-180' : ''}`}
                          fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                        </svg>
                      </div>

                      {/* Expanded */}
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }} className="border-t border-gray-100 overflow-hidden">
                            <div className="p-6">
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-5">
                                <div>
                                  <p className="text-xs font-black uppercase tracking-widest text-[#d4af37] mb-3">Destination</p>
                                  <div className="space-y-1.5 text-sm">
                                    <Row label="Name" value={dest.name} />
                                    <Row label="Location" value={dest.location} />
                                    <Row label="Duration" value={dest.duration} />
                                    <Row label="Tour Price" value={fmt(dest.price)} />
                                  </div>
                                </div>
                                <div>
                                  <p className="text-xs font-black uppercase tracking-widest text-[#d4af37] mb-3">Traveler</p>
                                  <div className="space-y-1.5 text-sm">
                                    <Row label="Name" value={booking.name} />
                                    <Row label="Email" value={booking.email} />
                                    <Row label="Phone" value={booking.phone} />
                                    <Row label="Travelers" value={booking.travelers} />
                                    <Row label="Date" value={fmtDate(booking.date)} />
                                  </div>
                                </div>
                                <div>
                                  <p className="text-xs font-black uppercase tracking-widest text-[#d4af37] mb-3">Payment</p>
                                  <div className="space-y-1.5 text-sm">
                                    <Row label="Method" value={booking.paymentMethod} />
                                    <Row label="Total" value={fmt(booking.totalAmount)} />
                                    <Row label="Ref" value={booking._id?.slice(-8).toUpperCase()} />
                                    <Row label="Booked" value={fmtDate(booking.createdAt)} />
                                  </div>
                                </div>
                              </div>

                              {/* Admin Response Box */}
                              {(booking.adminNote || booking.rejectionReason || booking.status !== 'pending') && (
                                <div className={`rounded-2xl p-5 mb-5 border ${
                                  booking.status === 'confirmed' ? 'bg-green-50 border-green-200' :
                                  booking.status === 'cancelled' ? 'bg-red-50 border-red-200' :
                                  'bg-yellow-50 border-yellow-200'
                                }`}>
                                  <p className={`text-xs font-black uppercase tracking-wider mb-2 ${
                                    booking.status === 'confirmed' ? 'text-green-700' :
                                    booking.status === 'cancelled' && booking.reviewedBy === 'Admin' ? 'text-red-700' :
                                    booking.status === 'cancelled' ? 'text-gray-500' : 'text-yellow-700'
                                  }`}>
                                    {booking.status === 'pending' ? '⏳ Awaiting Admin Review' :
                                     booking.status === 'confirmed' ? '✅ Admin Confirmed Your Booking' :
                                     booking.status === 'cancelled' && booking.reviewedBy === 'Admin' ? '❌ Admin Rejected Your Booking' :
                                     booking.status === 'cancelled' ? '🚫 You Cancelled This Booking' :
                                     '🏁 Completed'}
                                  </p>
                                  {booking.status === 'pending' && (
                                    <p className="text-sm text-yellow-700 font-light">
                                      Your booking is being reviewed. Admin will verify your payment and confirm or reject within 24 hours.
                                    </p>
                                  )}
                                  {booking.adminNote && (
                                    <p className="text-sm text-gray-700 mt-1">
                                      <span className="font-bold">Message from admin:</span> {booking.adminNote}
                                    </p>
                                  )}
                                  {booking.rejectionReason && (
                                    <p className="text-sm text-red-700 mt-1">
                                      <span className="font-bold">Reason:</span> {booking.rejectionReason}
                                    </p>
                                  )}
                                </div>
                              )}

                              {/* Actions */}
                              <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-100">
                                {booking.status === 'pending' && (
                                  <button onClick={async () => {
                                    if (!window.confirm('Cancel this booking?')) return
                                    try {
                                      await axios.patch(`${apiBase}/bookings/${booking._id}`, { status: 'cancelled' })
                                      setBookings(prev => prev.map(b => b._id === booking._id ? { ...b, status: 'cancelled' } : b))
                                    } catch { alert('Failed to cancel') }
                                  }} className="text-xs text-red-500 border border-red-200 px-4 py-2 rounded-full hover:bg-red-50 transition-colors font-bold">
                                    Cancel Booking
                                  </button>
                                )}
                                <button onClick={() => setCurrentPage('contact')}
                                  className="text-xs text-[#2d3e23] border border-gray-200 px-4 py-2 rounded-full hover:bg-gray-50 transition-colors font-bold">
                                  💬 Contact Support
                                </button>
                                <button onClick={() => setCurrentPage('explorer')}
                                  className="text-xs text-[#2d3e23] border border-gray-200 px-4 py-2 rounded-full hover:bg-gray-50 transition-colors font-bold ml-auto">
                                  Book Another →
                                </button>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  )
                })}
              </div>
            )}

            {!bLoading && bookings.length === 0 && (
              <div className="text-center py-24 bg-white rounded-3xl border border-gray-100">
                <div className="text-6xl mb-4">🗺️</div>
                <h3 className="text-2xl font-black text-[#2d3e23] mb-3">No trips yet</h3>
                <p className="text-gray-400 mb-8">Start exploring and book your first adventure.</p>
                <button onClick={() => setCurrentPage('explorer')}
                  className="bg-[#2d3e23] text-white px-8 py-4 rounded-2xl font-black hover:bg-[#3d4a35] transition-all shadow-lg">
                  Explore Destinations
                </button>
              </div>
            )}
          </div>
        )}

        {/* ── MESSAGES TAB ── */}
        {tab === 'messages' && (
          <div>
            {mLoading && <div className="space-y-3">{[1,2].map(i => <div key={i} className="bg-white rounded-2xl h-20 animate-pulse border border-gray-100"/>)}</div>}

            {!mLoading && messages.length === 0 && (
              <div className="text-center py-20 bg-white rounded-3xl border border-gray-100">
                <div className="text-5xl mb-4">💬</div>
                <h3 className="text-xl font-black text-[#2d3e23] mb-2">No messages yet</h3>
                <p className="text-gray-400 mb-6">Send us a message and we'll respond within 2 hours.</p>
                <button onClick={() => setCurrentPage('contact')}
                  className="bg-[#2d3e23] text-white px-8 py-3 rounded-2xl font-black hover:bg-[#3d4a35] transition-all">
                  Send a Message
                </button>
              </div>
            )}

            {!mLoading && messages.length > 0 && (
              <div className="space-y-3">
                {messages.map((msg, idx) => {
                  const isOpen = expandedM === msg._id
                  const hasReply = msg.status === 'replied' && msg.adminReply
                  return (
                    <motion.div key={msg._id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.04 }}
                      className={`bg-white rounded-2xl border shadow-sm overflow-hidden ${hasReply ? 'border-green-200' : 'border-gray-100'}`}>

                      <div className="flex items-center gap-4 p-5 cursor-pointer hover:bg-gray-50 transition-colors"
                        onClick={() => setExpandedM(isOpen ? null : msg._id)}>
                        <div className={`w-3 h-3 rounded-full shrink-0 ${
                          hasReply ? 'bg-green-500' : msg.status === 'read' ? 'bg-yellow-400' : 'bg-gray-300'
                        }`} />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <p className="font-black text-[#2d3e23] text-sm">{msg.subject}</p>
                            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                              hasReply ? 'bg-green-100 text-green-700' :
                              msg.status === 'read' ? 'bg-yellow-100 text-yellow-700' :
                              'bg-gray-100 text-gray-500'
                            }`}>
                              {hasReply ? '✅ Replied' : msg.status === 'read' ? '👁 Read' : '⏳ Pending'}
                            </span>
                          </div>
                          <p className="text-gray-400 text-xs mt-0.5 truncate">{msg.message}</p>
                        </div>
                        <p className="text-xs text-gray-300 shrink-0">{fmtDate(msg.createdAt)}</p>
                        <svg className={`w-5 h-5 text-gray-300 transition-transform shrink-0 ${isOpen ? 'rotate-180' : ''}`}
                          fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                        </svg>
                      </div>

                      <AnimatePresence>
                        {isOpen && (
                          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }} className="border-t border-gray-100 overflow-hidden">
                            <div className="p-6">
                              {/* Your message */}
                              <div className="bg-[#f8f7f4] rounded-2xl p-4 mb-4">
                                <p className="text-xs font-black uppercase tracking-wider text-gray-400 mb-2">Your Message</p>
                                <p className="text-gray-700 text-sm leading-relaxed">{msg.message}</p>
                                <p className="text-xs text-gray-400 mt-2">{fmtDate(msg.createdAt)}</p>
                              </div>

                              {/* Admin reply */}
                              {hasReply ? (
                                <div className="bg-green-50 border border-green-200 rounded-2xl p-4">
                                  <div className="flex items-center gap-2 mb-2">
                                    <div className="w-7 h-7 bg-[#2d3e23] rounded-xl flex items-center justify-center">
                                      <svg className="w-4 h-4 text-[#d4af37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                                      </svg>
                                    </div>
                                    <p className="text-xs font-black text-green-700 uppercase tracking-wider">Ethiopian Tourist Destination Reply</p>
                                  </div>
                                  <p className="text-gray-800 text-sm leading-relaxed font-medium">{msg.adminReply}</p>
                                  <p className="text-xs text-gray-400 mt-2">{fmtDate(msg.repliedAt)}</p>
                                </div>
                              ) : (
                                <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4 text-center">
                                  <p className="text-yellow-700 text-sm font-medium">⏳ Waiting for admin response — usually within 2 hours.</p>
                                </div>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  )
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

const Row = ({ label, value }) => (
  <div className="flex justify-between gap-2">
    <span className="text-gray-400 shrink-0 text-xs">{label}</span>
    <span className="font-bold text-[#2d3e23] text-xs text-right truncate">{value || '—'}</span>
  </div>
)

export default Dashboard
