import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import axios from 'axios'

const ADMIN_USERNAME = 'sisay'
const ADMIN_PASSWORD = 'Sis3575@'

const statusStyles = {
  pending:   'bg-yellow-100 text-yellow-800 border-yellow-200',
  confirmed: 'bg-green-100 text-green-800 border-green-200',
  completed: 'bg-blue-100 text-blue-800 border-blue-200',
  cancelled: 'bg-red-100 text-red-800 border-red-200',
}

const msgStatusStyles = {
  unread:  'bg-red-100 text-red-700',
  read:    'bg-yellow-100 text-yellow-700',
  replied: 'bg-green-100 text-green-700',
}

const AdminPanel = ({ apiBase, setCurrentPage, refreshGlobalData }) => {
  const [authed, setAuthed]       = useState(false)
  const [username, setUsername]   = useState('')
  const [password, setPassword]   = useState('')
  const [pwError, setPwError]     = useState('')
  const [tab, setTab]             = useState('bookings')
  const [toast, setToast]         = useState('')

  // Bookings state
  const [bookings, setBookings]   = useState([])
  const [bLoading, setBLoading]   = useState(true)
  const [bFilter, setBFilter]     = useState('all')
  const [expandedB, setExpandedB] = useState(null)
  const [reviewForm, setReviewForm] = useState({})  // { [id]: { action, adminNote, rejectionReason } }

  // Messages state
  const [messages, setMessages]   = useState([])
  const [mLoading, setMLoading]   = useState(true)
  const [expandedM, setExpandedM] = useState(null)
  const [replyText, setReplyText] = useState({})   // { [id]: string }

  // Destinations state
  const [destinations, setDestinations] = useState([])
  const [dLoading, setDLoading] = useState(false)
  const [editingDest, setEditingDest] = useState(null)
  const [destForm, setDestForm] = useState({
    name: '', location: '', country: '', description: '', price: '', bestSeason: '',
    category: '', image: '', activities: '', duration: '', distanceFromAddis: ''
  })

  // Fleet state
  const [fleet, setFleet] = useState([])
  const [fLoading, setFLoading] = useState(false)
  const [editingFleet, setEditingFleet] = useState(null)
  const [fleetForm, setFleetForm] = useState({
    name: '', description: '', image: '', pricePerDay: '', rating: '4.5',
    reviews: 'Verified', icon: '🚗', capacity: '4', features: '', category: 'Standard'
  })

  const [saving, setSaving] = useState({})

  // Load data
  useEffect(() => {
    if (!authed) return
    loadBookingsAndMessages()
    loadDestinations()
    loadFleet()
  }, [authed, apiBase])

  const loadBookingsAndMessages = () => {
    setBLoading(true); setMLoading(true)
    axios.get(`${apiBase}/bookings`).then(r => { setBookings(r.data); setBLoading(false) }).catch(() => setBLoading(false))
    axios.get(`${apiBase}/messages`).then(r => { setMessages(r.data); setMLoading(false) }).catch(() => setMLoading(false))
  }

  const loadDestinations = () => {
    setDLoading(true)
    axios.get(`${apiBase}/destinations`).then(r => { setDestinations(r.data); setDLoading(false) }).catch(() => setDLoading(false))
  }

  const loadFleet = () => {
    setFLoading(true)
    axios.get(`${apiBase}/fleet`).then(r => { setFleet(r.data); setFLoading(false) }).catch(() => setFLoading(false))
  }

  const showToast = (msg) => {
    setToast(msg)
    setTimeout(() => setToast(''), 3000)
  }

  const handleLogin = (e) => {
    e.preventDefault()
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setAuthed(true); setPwError('')
    } else {
      setPwError('Incorrect username or password')
    }
  }

  // Booking review
  const handleReview = async (bookingId, action) => {
    const form = reviewForm[bookingId] || {}
    setSaving(s => ({ ...s, [bookingId]: true }))
    try {
      const { data } = await axios.patch(`${apiBase}/bookings/${bookingId}/review`, {
        action,
        adminNote:       form.adminNote || '',
        rejectionReason: form.rejectionReason || '',
        reviewedBy:      'Admin',
      })
      setBookings(prev => prev.map(b => b._id === bookingId ? data : b))
      setExpandedB(null)
      showToast(action === 'approve' ? '✅ Booking confirmed successfully!' : '❌ Booking rejected.')
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update booking')
    } finally {
      setSaving(s => ({ ...s, [bookingId]: false }))
    }
  }

  // Message reply
  const handleReply = async (msgId) => {
    const reply = replyText[msgId]
    if (!reply?.trim()) return alert('Please enter a reply')
    setSaving(s => ({ ...s, [msgId]: true }))
    try {
      const { data } = await axios.patch(`${apiBase}/messages/${msgId}/reply`, { adminReply: reply })
      setMessages(prev => prev.map(m => m._id === msgId ? data : m))
      setExpandedM(null)
      showToast('✅ Reply sent to traveler!')
    } catch {
      alert('Failed to send reply')
    } finally {
      setSaving(s => ({ ...s, [msgId]: false }))
    }
  }

  const handleMarkRead = async (msgId) => {
    try {
      const { data } = await axios.patch(`${apiBase}/messages/${msgId}/read`)
      setMessages(prev => prev.map(m => m._id === msgId ? data : m))
    } catch {}
  }

  // Destination handlers
  const handleDestInputChange = (e) => {
    const { name, value } = e.target
    setDestForm(f => ({ ...f, [name]: value }))
  }

  const handleCreateOrUpdateDest = async (e) => {
    e.preventDefault()
    const payload = {
      ...destForm,
      price: Number(destForm.price),
      distanceFromAddis: Number(destForm.distanceFromAddis),
      activities: destForm.activities.split(',').map(a => a.trim()).filter(Boolean)
    }

    try {
      if (editingDest) {
        const { data } = await axios.put(`${apiBase}/destinations/${editingDest._id}`, payload)
        setDestinations(prev => prev.map(d => d._id === editingDest._id ? data : d))
        showToast('✅ Destination updated!')
        if (refreshGlobalData) refreshGlobalData()
      } else {
        const { data } = await axios.post(`${apiBase}/destinations`, payload)
        setDestinations(prev => [...prev, data])
        showToast('✅ Destination added!')
        if (refreshGlobalData) refreshGlobalData()
      }
      resetDestForm()
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to save destination')
    }
  }

  const handleEditDest = (dest) => {
    setEditingDest(dest)
    setDestForm({
      name: dest.name || '',
      location: dest.location || '',
      country: dest.country || '',
      description: dest.description || '',
      price: dest.price || '',
      bestSeason: dest.bestSeason || '',
      category: dest.category || '',
      image: dest.image || '',
      activities: (dest.activities || []).join(', '),
      duration: dest.duration || '',
      distanceFromAddis: dest.distanceFromAddis || ''
    })
  }

  const handleDeleteDest = async (id) => {
    if (!confirm('Are you sure you want to delete this destination?')) return
    try {
      await axios.delete(`${apiBase}/destinations/${id}`)
      setDestinations(prev => prev.filter(d => d._id !== id))
      showToast('🗑️ Destination deleted!')
      if (refreshGlobalData) refreshGlobalData()
    } catch (err) {
      alert('Failed to delete destination')
    }
  }

  const resetDestForm = () => {
    setEditingDest(null)
    setDestForm({ name: '', location: '', country: '', description: '', price: '', bestSeason: '',
      category: '', image: '', activities: '', duration: '', distanceFromAddis: '' })
  }

  // Fleet handlers
  const handleFleetInputChange = (e) => {
    const { name, value } = e.target
    setFleetForm(f => ({ ...f, [name]: value }))
  }

  const handleCreateOrUpdateFleet = async (e) => {
    e.preventDefault()
    const payload = {
      ...fleetForm,
      pricePerDay: Number(fleetForm.pricePerDay),
      rating: Number(fleetForm.rating),
      capacity: Number(fleetForm.capacity),
      features: fleetForm.features.split(',').map(f => f.trim()).filter(Boolean)
    }

    try {
      if (editingFleet) {
        const { data } = await axios.put(`${apiBase}/fleet/${editingFleet._id}`, payload)
        setFleet(prev => prev.map(f => f._id === editingFleet._id ? data : f))
        showToast('✅ Service updated!')
        if (refreshGlobalData) refreshGlobalData()
      } else {
        const { data } = await axios.post(`${apiBase}/fleet`, payload)
        setFleet(prev => [...prev, data])
        showToast('✅ Service added!')
        if (refreshGlobalData) refreshGlobalData()
      }
      resetFleetForm()
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to save service')
    }
  }

  const handleEditFleet = (item) => {
    setEditingFleet(item)
    setFleetForm({
      name: item.name || '',
      description: item.description || '',
      image: item.image || '',
      pricePerDay: item.pricePerDay || '',
      rating: item.rating || '4.5',
      reviews: item.reviews || 'Verified',
      icon: item.icon || '🚗',
      capacity: item.capacity || '4',
      features: (item.features || []).join(', '),
      category: item.category || 'Standard'
    })
  }

  const handleDeleteFleet = async (id) => {
    if (!confirm('Are you sure you want to delete this service?')) return
    try {
      await axios.delete(`${apiBase}/fleet/${id}`)
      setFleet(prev => prev.filter(f => f._id !== id))
      showToast('🗑️ Service deleted!')
      if (refreshGlobalData) refreshGlobalData()
    } catch (err) {
      alert('Failed to delete service')
    }
  }

  const resetFleetForm = () => {
    setEditingFleet(null)
    setFleetForm({ name: '', description: '', image: '', pricePerDay: '', rating: '4.5',
      reviews: 'Verified', icon: '🚗', capacity: '4', features: '', category: 'Standard' })
  }

  const fmt = (n) => n ? `$${Number(n).toLocaleString()}` : '—'
  const fmtDate = (d) => d ? new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : '—'

  const filteredBookings = bFilter === 'all' ? bookings : bookings.filter(b => b.status === bFilter)
  const unreadCount = messages.filter(m => m.status === 'unread').length
  const pendingCount = bookings.filter(b => b.status === 'pending').length

  // ── Login Screen ──────────────────────────────────────
  if (!authed) {
    return (
      <div className="min-h-screen bg-[#2d3e23] flex items-center justify-center px-4">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-3xl p-10 w-full max-w-md shadow-2xl">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-[#2d3e23] rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-[#d4af37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
              </svg>
            </div>
            <h1 className="text-2xl font-black text-[#2d3e23]">Admin Panel</h1>
            <p className="text-gray-400 text-sm mt-1">EthioTour Management</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Username</label>
              <input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="Enter username"
                className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#d4af37] text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#d4af37] text-sm"
              />
              {pwError && <p className="text-red-500 text-xs mt-1">{pwError}</p>}
            </div>
            <button type="submit" className="w-full bg-[#2d3e23] text-white py-3 rounded-2xl font-black hover:bg-[#3d4a35] transition-all">
              Sign In
            </button>
            <button type="button" onClick={() => setCurrentPage('home')}
              className="w-full text-gray-400 text-sm hover:text-gray-600 transition-colors">
              ← Back to Site
            </button>
          </form>
        </motion.div>
      </div>
    )
  }

  // ── Admin Dashboard ───────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#f8f7f4] pt-6 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Toast */}
        <AnimatePresence>
          {toast && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-[#2d3e23] text-white px-8 py-4 rounded-2xl shadow-2xl font-bold text-sm"
            >
              {toast}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-black text-[#2d3e23]">Admin Panel</h1>
            <p className="text-gray-400 text-sm">EthioTour Management Dashboard</p>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => { loadBookingsAndMessages(); loadDestinations(); loadFleet() }}
              className="text-sm text-[#2d3e23] border border-gray-200 bg-white px-4 py-2 rounded-xl transition-all hover:bg-gray-50 flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
              </svg>
              Refresh
            </button>
            <button onClick={() => setCurrentPage('home')}
              className="text-sm text-gray-400 hover:text-[#2d3e23] border border-gray-200 px-4 py-2 rounded-xl transition-all">
              ← Back to Site
            </button>
            <button onClick={() => setAuthed(false)}
              className="text-sm text-red-400 hover:text-red-600 border border-red-100 px-4 py-2 rounded-xl transition-all">
              Sign Out
            </button>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Bookings', value: bookings.length, color: 'text-[#2d3e23]' },
            { label: 'Pending Review', value: pendingCount, color: 'text-yellow-600' },
            { label: 'Confirmed', value: bookings.filter(b => b.status === 'confirmed').length, color: 'text-green-600' },
            { label: 'Unread Messages', value: unreadCount, color: 'text-red-500' },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm text-center">
              <p className={`text-3xl font-black ${s.color}`}>{s.value}</p>
              <p className="text-xs text-gray-400 mt-1 font-medium">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {[
            { id: 'bookings', label: 'Bookings', badge: pendingCount },
            { id: 'messages', label: 'Messages', badge: unreadCount },
            { id: 'destinations', label: 'Destinations', badge: destinations.length },
            { id: 'fleet', label: 'Services', badge: fleet.length },
          ].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-black text-sm transition-all ${
                tab === t.id ? 'bg-[#2d3e23] text-white shadow-lg' : 'bg-white text-gray-500 border border-gray-100 hover:border-[#2d3e23]'
              }`}>
              {t.label}
              <span className={`text-xs px-2 py-0.5 rounded-full font-black ${tab === t.id ? 'bg-[#d4af37] text-[#2d3e23]' : 'bg-gray-100 text-gray-600'}`}>
                {t.badge}
              </span>
            </button>
          ))}
        </div>

        {/* ── BOOKINGS TAB ── */}
        {tab === 'bookings' && (
          <div>
            {/* Filter */}
            <div className="flex flex-wrap gap-2 mb-6">
              {['all','pending','confirmed','cancelled','completed'].map(f => (
                <button key={f} onClick={() => setBFilter(f)}
                  className={`text-xs font-bold px-4 py-2 rounded-full border transition-all capitalize ${
                    bFilter === f ? 'bg-[#2d3e23] text-white border-[#2d3e23]' : 'bg-white text-gray-500 border-gray-200 hover:border-[#2d3e23]'
                  }`}>
                  {f} ({f === 'all' ? bookings.length : bookings.filter(b => b.status === f).length})
                </button>
              ))}
            </div>

            {bLoading ? (
              <div className="space-y-3">{[1,2,3].map(i => <div key={i} className="bg-white rounded-2xl h-20 animate-pulse border border-gray-100"/>)}</div>
            ) : (
              <div className="space-y-3">
                {filteredBookings.map((booking) => {
                  const dest = booking.destinationPreview || {}
                  const svc  = booking.servicePreview || {}
                  const isOpen = expandedB === booking._id
                  const rf = reviewForm[booking._id] || {}

                  return (
                    <motion.div key={booking._id} layout className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                      {/* Summary Row */}
                      <div className="flex items-center gap-4 p-5 cursor-pointer hover:bg-gray-50 transition-colors"
                        onClick={() => {
                          setExpandedB(isOpen ? null : booking._id)
                          if (!isOpen) handleMarkRead(booking._id).catch(() => {})
                        }}>
                          <img src={dest.image} alt={dest.name} className="w-14 h-14 rounded-xl object-cover shrink-0" onError={(e) => { e.target.style.display = 'none' }}/>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <p className="font-black text-[#2d3e23] truncate">{dest.name || 'Tour'}</p>
                            <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${statusStyles[booking.status]}`}>
                              {booking.status}
                            </span>
                          </div>
                          <p className="text-gray-400 text-xs mt-0.5">
                            {booking.name} · {booking.email} · {fmtDate(booking.date)}
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
                          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                            className="border-t border-gray-100 overflow-hidden">
                            <div className="p-6">
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">

                                {/* Destination */}
                                <div>
                                  <p className="text-xs font-black uppercase tracking-widest text-[#d4af37] mb-3">Destination</p>
                                  <div className="space-y-1.5 text-sm">
                                    <Row label="Name" value={dest.name} />
                                    <Row label="Location" value={dest.location} />
                                    <Row label="Category" value={dest.category} />
                                    <Row label="Duration" value={dest.duration} />
                                    <Row label="Tour Price" value={fmt(dest.price)} />
                                  </div>
                                </div>

                                {/* Traveler */}
                                <div>
                                  <p className="text-xs font-black uppercase tracking-widest text-[#d4af37] mb-3">Traveler</p>
                                  <div className="space-y-1.5 text-sm">
                                    <Row label="Name" value={booking.name} />
                                    <Row label="Email" value={booking.email} />
                                    <Row label="Phone" value={booking.phone} />
                                    <Row label="Nationality" value={booking.nationality || '—'} />
                                    <Row label="Travelers" value={booking.travelers} />
                                    <Row label="Travel Date" value={fmtDate(booking.date)} />
                                    {booking.specialRequests && <Row label="Requests" value={booking.specialRequests} />}
                                  </div>
                                </div>

                                {/* Payment */}
                                <div>
                                  <p className="text-xs font-black uppercase tracking-widest text-[#d4af37] mb-3">Payment & Service</p>
                                  <div className="space-y-1.5 text-sm">
                                    <Row label="Method" value={booking.paymentMethod} />
                                    <Row label="Total Paid" value={fmt(booking.totalAmount)} />
                                    <Row label="Proof" value={booking.paymentProof || '—'} />
                                    {svc.name && <Row label="Vehicle" value={`${svc.icon || ''} ${svc.name}`} />}
                                    {svc.pricePerDay && <Row label="Transport/day" value={fmt(svc.pricePerDay)} />}
                                    <Row label="Booked On" value={fmtDate(booking.createdAt)} />
                                  </div>
                                </div>
                              </div>

                              {/* Admin Review Section */}
                              {booking.status === 'pending' ? (
                                <div className="bg-[#f8f7f4] rounded-2xl p-5">
                                  {/* Payment Proof Image */}
                                  <div className="mb-5">
                                    <p className="text-xs font-black uppercase tracking-wider text-[#d4af37] mb-3">
                                      💳 Payment Proof — {booking.paymentMethod} — Expected: ${booking.totalAmount?.toLocaleString()}
                                    </p>
                                    {booking.paymentProofData ? (
                                      <div className="bg-white rounded-2xl p-3 border border-gray-200">
                                        <img
                                          src={booking.paymentProofData}
                                          alt="Payment screenshot"
                                          className="max-h-64 mx-auto rounded-xl object-contain cursor-pointer hover:opacity-90 transition-opacity"
                                          onClick={() => window.open(booking.paymentProofData, '_blank')}
                                        />
                                        <p className="text-xs text-center text-gray-400 mt-2">Click to open full size</p>
                                      </div>
                                    ) : booking.paymentProof ? (
                                      <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4 text-center">
                                        <p className="text-yellow-700 text-sm font-bold">📎 {booking.paymentProof}</p>
                                        <p className="text-yellow-600 text-xs mt-1">Image uploaded before preview was enabled — filename only</p>
                                      </div>
                                    ) : (
                                      <div className="bg-red-50 border border-red-200 rounded-2xl p-4 text-center">
                                        <p className="text-red-600 text-sm font-bold">⚠️ No payment proof uploaded</p>
                                      </div>
                                    )}
                                  </div>

                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                                    <div>
                                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Admin Note (optional)</label>
                                      <input
                                        value={rf.adminNote || ''}
                                        onChange={e => setReviewForm(f => ({ ...f, [booking._id]: { ...rf, adminNote: e.target.value } }))}
                                        placeholder="e.g. Payment verified via Telebirr"
                                        className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
                                      />
                                    </div>
                                    <div>
                                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Rejection Reason (if rejecting)</label>
                                      <input
                                        value={rf.rejectionReason || ''}
                                        onChange={e => setReviewForm(f => ({ ...f, [booking._id]: { ...rf, rejectionReason: e.target.value } }))}
                                        placeholder="e.g. Payment amount incorrect"
                                        className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
                                      />
                                    </div>
                                  </div>
                                  <div className="flex gap-3">
                                    <button
                                      onClick={() => handleReview(booking._id, 'approve')}
                                      disabled={saving[booking._id]}
                                      className="flex-1 bg-green-600 text-white py-3 rounded-2xl font-black hover:bg-green-700 transition-all disabled:opacity-60 flex items-center justify-center gap-2"
                                    >
                                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"/>
                                      </svg>
                                      {saving[booking._id] ? 'Processing...' : 'Approve & Confirm'}
                                    </button>
                                    <button
                                      onClick={() => handleReview(booking._id, 'reject')}
                                      disabled={saving[booking._id]}
                                      className="flex-1 bg-red-500 text-white py-3 rounded-2xl font-black hover:bg-red-600 transition-all disabled:opacity-60 flex items-center justify-center gap-2"
                                    >
                                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"/>
                                      </svg>
                                      {saving[booking._id] ? 'Processing...' : 'Reject Booking'}
                                    </button>
                                  </div>
                                </div>
                              ) : (
                                <div className={`rounded-2xl p-4 border ${statusStyles[booking.status]}`}>
                                  <p className="text-sm font-bold capitalize">Status: {booking.status}</p>
                                  {booking.adminNote && <p className="text-xs mt-1">Note: {booking.adminNote}</p>}
                                  {booking.rejectionReason && <p className="text-xs mt-1 text-red-600">Reason: {booking.rejectionReason}</p>}
                                  {booking.reviewedAt && <p className="text-xs mt-1 opacity-60">Reviewed: {fmtDate(booking.reviewedAt)}</p>}
                                </div>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  )
                })}
                {filteredBookings.length === 0 && (
                  <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
                    <p className="text-gray-400">No bookings in this category.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ── MESSAGES TAB ── */}
        {tab === 'messages' && (
          <div>
            {mLoading ? (
              <div className="space-y-3">{[1,2,3].map(i => <div key={i} className="bg-white rounded-2xl h-20 animate-pulse border border-gray-100"/>)}</div>
            ) : (
              <div className="space-y-3">
                {messages.map((msg) => {
                  const isOpen = expandedM === msg._id
                  return (
                    <motion.div key={msg._id} layout className={`bg-white rounded-2xl border shadow-sm overflow-hidden ${msg.status === 'unread' ? 'border-red-200' : 'border-gray-100'}`}>
                      <div className="flex items-center gap-4 p-5 cursor-pointer hover:bg-gray-50 transition-colors"
                        onClick={() => {
                          setExpandedM(isOpen ? null : msg._id)
                          if (msg.status === 'unread') handleMarkRead(msg._id)
                        }}>
                        <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${msg.status === 'unread' ? 'bg-red-500' : msg.status === 'replied' ? 'bg-green-500' : 'bg-yellow-400'}`} />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <p className="font-black text-[#2d3e23] text-sm">{msg.name}</p>
                            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${msgStatusStyles[msg.status]}`}>{msg.status}</span>
                          </div>
                          <p className="text-gray-400 text-xs mt-0.5 truncate">{msg.subject} · {msg.email}</p>
                        </div>
                        <p className="text-xs text-gray-300 shrink-0">{new Date(msg.createdAt).toLocaleDateString()}</p>
                        <svg className={`w-5 h-5 text-gray-300 transition-transform shrink-0 ${isOpen ? 'rotate-180' : ''}`}
                          fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                        </svg>
                      </div>

                      <AnimatePresence>
                        {isOpen && (
                          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                            className="border-t border-gray-100 overflow-hidden">
                            <div className="p-6">
                              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4 text-sm">
                                <Row label="From" value={msg.name} />
                                <Row label="Email" value={msg.email} />
                                <Row label="Phone" value={msg.phone || '—'} />
                              </div>
                              <div className="bg-[#f8f7f4] rounded-2xl p-4 mb-5">
                                <p className="text-xs font-black uppercase tracking-wider text-gray-400 mb-2">Message</p>
                                <p className="text-gray-700 text-sm leading-relaxed">{msg.message}</p>
                              </div>

                              {msg.adminReply && (
                                <div className="bg-green-50 border border-green-100 rounded-2xl p-4 mb-5">
                                  <p className="text-xs font-black uppercase tracking-wider text-green-600 mb-2">Your Reply</p>
                                  <p className="text-gray-700 text-sm">{msg.adminReply}</p>
                                  <p className="text-xs text-gray-400 mt-1">{fmtDate(msg.repliedAt)}</p>
                                </div>
                              )}

                              {msg.status !== 'replied' && (
                                <div>
                                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Reply to Traveler</label>
                                  <textarea
                                    value={replyText[msg._id] || ''}
                                    onChange={e => setReplyText(r => ({ ...r, [msg._id]: e.target.value }))}
                                    rows={3}
                                    placeholder="Type your response..."
                                    className="w-full px-4 py-3 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#d4af37] resize-none mb-3"
                                  />
                                  <button
                                    onClick={() => handleReply(msg._id)}
                                    disabled={saving[msg._id]}
                                    className="bg-[#2d3e23] text-white px-8 py-3 rounded-2xl font-black hover:bg-[#3d4a35] transition-all disabled:opacity-60"
                                  >
                                    {saving[msg._id] ? 'Sending...' : 'Send Reply'}
                                  </button>
                                </div>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  )
                })}
                {messages.length === 0 && (
                  <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
                    <p className="text-gray-400">No messages yet.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ── DESTINATIONS TAB ── */}
        {tab === 'destinations' && (
          <div>
            {/* Add/Edit Form */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
              <h3 className="font-black text-[#2d3e23] mb-4">{editingDest ? 'Edit Destination' : 'Add New Destination'}</h3>
              <form onSubmit={handleCreateOrUpdateDest} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input name="name" value={destForm.name} onChange={handleDestInputChange} placeholder="Name*" required className="px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#d4af37]" />
                <input name="location" value={destForm.location} onChange={handleDestInputChange} placeholder="Location*" required className="px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#d4af37]" />
                <select name="country" value={destForm.country} onChange={handleDestInputChange} required className="px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#d4af37]">
                  <option value="">Select Country*</option>
                  {['Ethiopia','Somalia','Djibouti','Eritrea','Tanzania','Kenya','Uganda','Rwanda','Burundi','South Sudan','Comoros','Madagascar','Seychelles','Mauritius'].map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <input name="price" value={destForm.price} onChange={handleDestInputChange} placeholder="Price*" type="number" required className="px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#d4af37]" />
                <input name="bestSeason" value={destForm.bestSeason} onChange={handleDestInputChange} placeholder="Best Season*" required className="px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#d4af37]" />
                <select name="category" value={destForm.category} onChange={handleDestInputChange} required className="px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#d4af37]">
                  <option value="">Select Category*</option>
                  {['Camping Tours','Cultural Tours','Adventure Trips','Nature Tours','Coastal & Marine','City & Heritage'].map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <input name="image" value={destForm.image} onChange={handleDestInputChange} placeholder="Image URL*" required className="px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#d4af37]" />
                <input name="duration" value={destForm.duration} onChange={handleDestInputChange} placeholder="Duration*" required className="px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#d4af37]" />
                <input name="distanceFromAddis" value={destForm.distanceFromAddis} onChange={handleDestInputChange} placeholder="Distance from Addis*" type="number" required className="px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#d4af37]" />
                <textarea name="activities" value={destForm.activities} onChange={handleDestInputChange} placeholder="Activities (comma-separated)" className="px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#d4af37] md:col-span-3" rows={2} />
                <textarea name="description" value={destForm.description} onChange={handleDestInputChange} placeholder="Description*" required className="px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#d4af37] md:col-span-3" rows={3} />
                <div className="md:col-span-3 flex gap-3">
                  <button type="submit" className="bg-[#2d3e23] text-white px-6 py-2 rounded-xl font-black text-sm hover:bg-[#3d4a35] transition-all">
                    {editingDest ? 'Update Destination' : 'Add Destination'}
                  </button>
                  {editingDest && (
                    <button type="button" onClick={resetDestForm} className="bg-gray-200 text-gray-700 px-6 py-2 rounded-xl font-black text-sm hover:bg-gray-300 transition-all">
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* Destinations List */}
            {dLoading ? (
              <div className="space-y-3">{[1,2,3].map(i => <div key={i} className="bg-white rounded-2xl h-20 animate-pulse border border-gray-100"/>)}</div>
            ) : (
              <div className="space-y-3">
                {destinations.map(dest => (
                  <div key={dest._id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex items-center gap-4">
                    <img src={dest.image} alt={dest.name} className="w-16 h-16 rounded-xl object-cover shrink-0" onError={(e) => { e.target.style.display = 'none' }} />
                    <div className="flex-1 min-w-0">
                      <p className="font-black text-[#2d3e23] text-sm truncate">{dest.name}</p>
                      <p className="text-xs text-gray-400">{dest.location} · {dest.country} · {fmt(dest.price)}</p>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => handleEditDest(dest)} className="text-xs bg-blue-50 text-blue-600 px-3 py-1.5 rounded-lg font-bold hover:bg-blue-100 transition-all">
                        Edit
                      </button>
                      <button onClick={() => handleDeleteDest(dest._id)} className="text-xs bg-red-50 text-red-600 px-3 py-1.5 rounded-lg font-bold hover:bg-red-100 transition-all">
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
                {destinations.length === 0 && (
                  <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
                    <p className="text-gray-400">No destinations yet. Add one above!</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ── FLEET/SERVICES TAB ── */}
        {tab === 'fleet' && (
          <div>
            {/* Add/Edit Form */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
              <h3 className="font-black text-[#2d3e23] mb-4">{editingFleet ? 'Edit Service' : 'Add New Service'}</h3>
              <form onSubmit={handleCreateOrUpdateFleet} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input name="name" value={fleetForm.name} onChange={handleFleetInputChange} placeholder="Name*" required className="px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#d4af37]" />
                <input name="icon" value={fleetForm.icon} onChange={handleFleetInputChange} placeholder="Icon (emoji)" className="px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#d4af37]" />
                <input name="pricePerDay" value={fleetForm.pricePerDay} onChange={handleFleetInputChange} placeholder="Price Per Day*" type="number" required className="px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#d4af37]" />
                <input name="rating" value={fleetForm.rating} onChange={handleFleetInputChange} placeholder="Rating" type="number" step="0.1" className="px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#d4af37]" />
                <input name="reviews" value={fleetForm.reviews} onChange={handleFleetInputChange} placeholder="Reviews" className="px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#d4af37]" />
                <input name="capacity" value={fleetForm.capacity} onChange={handleFleetInputChange} placeholder="Capacity" type="number" className="px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#d4af37]" />
                <input name="image" value={fleetForm.image} onChange={handleFleetInputChange} placeholder="Image URL*" required className="px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#d4af37]" />
                <input name="category" value={fleetForm.category} onChange={handleFleetInputChange} placeholder="Category" className="px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#d4af37]" />
                <textarea name="features" value={fleetForm.features} onChange={handleFleetInputChange} placeholder="Features (comma-separated)" className="px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#d4af37] md:col-span-3" rows={2} />
                <textarea name="description" value={fleetForm.description} onChange={handleFleetInputChange} placeholder="Description*" required className="px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#d4af37] md:col-span-3" rows={3} />
                <div className="md:col-span-3 flex gap-3">
                  <button type="submit" className="bg-[#2d3e23] text-white px-6 py-2 rounded-xl font-black text-sm hover:bg-[#3d4a35] transition-all">
                    {editingFleet ? 'Update Service' : 'Add Service'}
                  </button>
                  {editingFleet && (
                    <button type="button" onClick={resetFleetForm} className="bg-gray-200 text-gray-700 px-6 py-2 rounded-xl font-black text-sm hover:bg-gray-300 transition-all">
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* Fleet List */}
            {fLoading ? (
              <div className="space-y-3">{[1,2,3].map(i => <div key={i} className="bg-white rounded-2xl h-20 animate-pulse border border-gray-100"/>)}</div>
            ) : (
              <div className="space-y-3">
                {fleet.map(item => (
                  <div key={item._id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex items-center gap-4">
                    <img src={item.image} alt={item.name} className="w-16 h-16 rounded-xl object-cover shrink-0" onError={(e) => { e.target.style.display = 'none' }} />
                    <div className="flex-1 min-w-0">
                      <p className="font-black text-[#2d3e23] text-sm truncate">{item.icon} {item.name}</p>
                      <p className="text-xs text-gray-400">{fmt(item.pricePerDay)}/day · {item.category}</p>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => handleEditFleet(item)} className="text-xs bg-blue-50 text-blue-600 px-3 py-1.5 rounded-lg font-bold hover:bg-blue-100 transition-all">
                        Edit
                      </button>
                      <button onClick={() => handleDeleteFleet(item._id)} className="text-xs bg-red-50 text-red-600 px-3 py-1.5 rounded-lg font-bold hover:bg-red-100 transition-all">
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
                {fleet.length === 0 && (
                  <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
                    <p className="text-gray-400">No services yet. Add one above!</p>
                  </div>
                )}
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

export default AdminPanel
