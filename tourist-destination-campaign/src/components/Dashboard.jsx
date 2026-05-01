import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import axios from 'axios'

const statusStyles = {
  pending:   'bg-yellow-100 text-yellow-800 border-yellow-200',
  confirmed: 'bg-green-100 text-green-800 border-green-200',
  completed: 'bg-blue-100 text-blue-800 border-blue-200',
  cancelled: 'bg-red-100 text-red-800 border-red-200',
}

const Dashboard = ({ destinations = [], setCurrentPage, apiBase, userId }) => {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [expanded, setExpanded] = useState(null)

  useEffect(() => {
    if (!userId) { setLoading(false); return }
    axios.get(`${apiBase}/bookings/user/${userId}`)
      .then(({ data }) => setBookings(Array.isArray(data) ? data : []))
      .catch(e => setError(e.message || 'Could not load bookings'))
      .finally(() => setLoading(false))
  }, [apiBase, userId])

  const resolveDest = (b) => {
    if (b.destinationPreview?.name) return b.destinationPreview
    if (typeof b.destinationId === 'object' && b.destinationId?.name) return b.destinationId
    const d = destinations.find(x => String(x._id) === String(b.destinationId))
    return d || { name: 'Tour', location: '', image: '', price: 0 }
  }

  const fmt = (n) => n ? `$${Number(n).toLocaleString()}` : '—'
  const fmtDate = (d) => d ? new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : '—'

  return (
    <div className="min-h-screen bg-[#fcfbf7] pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-black text-[#2d3e23] mb-2">My Trips</h1>
          <p className="text-gray-500">All your bookings, traveler details, and order history in one place.</p>
        </div>

        {/* Stats */}
        {bookings.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
            {[
              { label: 'Total Bookings', value: bookings.length },
              { label: 'Pending', value: bookings.filter(b => b.status === 'pending').length },
              { label: 'Confirmed', value: bookings.filter(b => b.status === 'confirmed').length },
              { label: 'Completed', value: bookings.filter(b => b.status === 'completed').length },
            ].map(s => (
              <div key={s.label} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm text-center">
                <p className="text-3xl font-black text-[#2d3e23]">{s.value}</p>
                <p className="text-xs text-gray-400 mt-1 font-medium">{s.label}</p>
              </div>
            ))}
          </div>
        )}

        {/* Loading / Error */}
        {loading && (
          <div className="space-y-4">
            {[1,2,3].map(i => <div key={i} className="bg-white rounded-3xl h-28 animate-pulse border border-gray-100" />)}
          </div>
        )}
        {error && <p className="text-red-500 text-sm mb-4">⚠️ {error}</p>}

        {/* Bookings List */}
        {!loading && bookings.length > 0 && (
          <div className="space-y-4">
            {bookings.map((booking, idx) => {
              const dest = resolveDest(booking)
              const svc = booking.servicePreview
              const isOpen = expanded === booking._id

              return (
                <motion.div
                  key={booking._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden"
                >
                  {/* Summary Row */}
                  <div
                    className="flex items-center gap-4 p-5 cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => setExpanded(isOpen ? null : booking._id)}
                  >
                    {/* Destination Image */}
                    <div className="w-16 h-16 rounded-2xl overflow-hidden shrink-0 bg-gray-100">
                      {dest.image && (
                        <img src={dest.image} alt={dest.name} className="w-full h-full object-cover" />
                      )}
                    </div>

                    {/* Main Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-black text-[#2d3e23] text-base truncate">{dest.name}</h3>
                        <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${statusStyles[booking.status] || statusStyles.pending}`}>
                          {booking.status}
                        </span>
                      </div>
                      <p className="text-gray-400 text-sm mt-0.5">
                        {dest.location} · {fmtDate(booking.date)} · {booking.travelers} traveler{booking.travelers > 1 ? 's' : ''}
                      </p>
                      {svc?.name && (
                        <p className="text-gray-400 text-xs mt-0.5">{svc.icon} {svc.name}</p>
                      )}
                    </div>

                    {/* Price + Toggle */}
                    <div className="text-right shrink-0">
                      <p className="font-black text-[#2d3e23]">{fmt(booking.totalAmount)}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{booking.paymentMethod || 'N/A'}</p>
                    </div>
                    <svg
                      className={`w-5 h-5 text-gray-300 transition-transform shrink-0 ${isOpen ? 'rotate-180' : ''}`}
                      fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                    </svg>
                  </div>

                  {/* Expanded Details */}
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="border-t border-gray-100 p-6"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                        {/* Destination */}
                        <div>
                          <p className="text-xs font-black uppercase tracking-widest text-[#d4af37] mb-3">Destination</p>
                          <div className="space-y-2 text-sm">
                            <Row label="Name" value={dest.name} />
                            <Row label="Location" value={dest.location} />
                            <Row label="Country" value={dest.country} />
                            <Row label="Category" value={dest.category} />
                            <Row label="Duration" value={dest.duration} />
                            <Row label="Tour Price" value={fmt(dest.price)} />
                          </div>
                        </div>

                        {/* Traveler */}
                        <div>
                          <p className="text-xs font-black uppercase tracking-widest text-[#d4af37] mb-3">Traveler Info</p>
                          <div className="space-y-2 text-sm">
                            <Row label="Name" value={booking.name} />
                            <Row label="Email" value={booking.email} />
                            <Row label="Phone" value={booking.phone} />
                            <Row label="Nationality" value={booking.nationality || '—'} />
                            <Row label="Travelers" value={booking.travelers} />
                            <Row label="Travel Date" value={fmtDate(booking.date)} />
                            {booking.specialRequests && <Row label="Requests" value={booking.specialRequests} />}
                          </div>
                        </div>

                        {/* Service & Payment */}
                        <div>
                          <p className="text-xs font-black uppercase tracking-widest text-[#d4af37] mb-3">Transport & Payment</p>
                          <div className="space-y-2 text-sm">
                            {svc?.name ? (
                              <>
                                <Row label="Vehicle" value={`${svc.icon || ''} ${svc.name}`} />
                                <Row label="Transport/day" value={fmt(svc.pricePerDay)} />
                                {svc.terrainLabel && <Row label="Terrain" value={svc.terrainLabel} />}
                              </>
                            ) : (
                              <Row label="Transport" value="Not selected" />
                            )}
                            <Row label="Payment" value={booking.paymentMethod || '—'} />
                            <Row label="Total Paid" value={fmt(booking.totalAmount)} />
                            <Row label="Booking Ref" value={booking._id?.slice(-8).toUpperCase()} />
                            <Row label="Booked On" value={fmtDate(booking.createdAt)} />
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-3 mt-6 pt-5 border-t border-gray-100">
                        <span className={`text-xs font-bold px-3 py-1.5 rounded-full border ${statusStyles[booking.status] || statusStyles.pending}`}>
                          Status: {booking.status}
                        </span>
                        {booking.status === 'pending' && (
                          <button
                            onClick={async () => {
                              try {
                                await axios.patch(`${apiBase}/bookings/${booking._id}`, { status: 'cancelled' })
                                setBookings(prev => prev.map(b => b._id === booking._id ? { ...b, status: 'cancelled' } : b))
                              } catch { alert('Failed to cancel booking') }
                            }}
                            className="text-xs text-red-500 border border-red-200 px-3 py-1.5 rounded-full hover:bg-red-50 transition-colors font-bold"
                          >
                            Cancel Booking
                          </button>
                        )}
                        <button
                          onClick={() => setCurrentPage('explorer')}
                          className="text-xs text-[#2d3e23] border border-gray-200 px-3 py-1.5 rounded-full hover:bg-gray-50 transition-colors font-bold ml-auto"
                        >
                          Book Another Trip →
                        </button>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              )
            })}
          </div>
        )}

        {/* Empty State */}
        {!loading && bookings.length === 0 && (
          <div className="text-center py-24 bg-white rounded-3xl border border-gray-100">
            <div className="text-6xl mb-4">🗺️</div>
            <h3 className="text-2xl font-black text-[#2d3e23] mb-3">No trips yet</h3>
            <p className="text-gray-400 mb-8">Start exploring and book your first adventure.</p>
            <button
              onClick={() => setCurrentPage('explorer')}
              className="bg-[#2d3e23] text-white px-8 py-4 rounded-2xl font-black hover:bg-[#3d4a35] transition-all shadow-lg"
            >
              Explore Destinations
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

const Row = ({ label, value }) => (
  <div className="flex justify-between gap-2">
    <span className="text-gray-400 shrink-0">{label}</span>
    <span className="font-bold text-[#2d3e23] text-right truncate">{value || '—'}</span>
  </div>
)

export default Dashboard
