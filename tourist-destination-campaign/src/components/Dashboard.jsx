import { useEffect, useState, useMemo } from 'react'
import axios from 'axios'

const Dashboard = ({ user, destinations = [], setCurrentPage, apiBase, userId }) => {
  const [activeTab, setActiveTab] = useState('trips')
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const destById = useMemo(() => {
    const m = new Map()
    destinations.forEach((d) => m.set(String(d._id), d))
    return m
  }, [destinations])

  const mockFavorites = [
    {
      id: '1',
      name: 'Danakil Depression',
      location: 'Afar, Ethiopia',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
    },
    {
      id: '2',
      name: 'Lalibela',
      location: 'Lalibela, Ethiopia',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
    },
  ]

  const resolveMeta = (b) => {
    if (b.destinationPreview && b.destinationPreview.name) {
      return b.destinationPreview
    }
    if (typeof b.destinationId === 'object' && b.destinationId?.name) {
      return {
        name: b.destinationId.name,
        location: b.destinationId.location,
        image: b.destinationId.image,
        price: b.destinationId.price,
      }
    }
    const d = destById.get(String(b.destinationId))
    if (d) {
      return { name: d.name, location: d.location, image: d.image, price: d.price }
    }
    return {
      name: 'Tour',
      location: '',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
      price: null,
    }
  }

  useEffect(() => {
    const loadBookings = async () => {
      if (!userId) return;
      try {
        setLoading(true)
        setError('')
        const { data } = await axios.get(`${apiBase}/bookings/user/${userId}`)
        setBookings(Array.isArray(data) ? data : [])
      } catch (e) {
        setError(e.message || 'Could not load bookings')
        setBookings([])
      } finally {
        setLoading(false)
      }
    }
    loadBookings()
  }, [apiBase, userId])

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'completed':
        return 'bg-blue-100 text-blue-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Dashboard</h1>
          <p className="text-gray-600">
            {user?.name ? `Welcome back, ${user.name}!` : 'Welcome!'} View and manage your upcoming adventures and travel history.
          </p>
        </div>

        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                type="button"
                onClick={() => setActiveTab('trips')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'trips'
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                My Trips
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('favorites')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'favorites'
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Favorites
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('profile')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'profile'
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Profile
              </button>
            </nav>
          </div>
        </div>

        {activeTab === 'trips' && (
          <div>
            <h2 className="text-2xl font-semibold mb-6">My Bookings</h2>
            {loading ? <p className="text-gray-600">Loading…</p> : null}
            {error ? <p className="text-red-600 text-sm mb-4">{error}</p> : null}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {bookings.map((booking) => {
                const meta = resolveMeta(booking)
                return (
                  <div key={booking._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="flex">
                      <img
                        src={meta.image}
                        alt={meta.name}
                        className="w-32 h-32 object-cover"
                      />
                      <div className="flex-1 p-6">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{meta.name}</h3>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(booking.status)}`}
                          >
                            {booking.status}
                          </span>
                        </div>
                        {meta.location ? (
                          <p className="text-gray-500 text-sm mb-1">{meta.location}</p>
                        ) : null}
                        <p className="text-gray-600 mb-2">Booking ID: {booking._id}</p>
                        <p className="text-gray-600 mb-2">
                          Date: {booking.date ? new Date(booking.date).toISOString().slice(0, 10) : '—'}
                        </p>
                        {meta.price != null ? (
                          <p className="text-lg font-bold text-green-600">${meta.price}</p>
                        ) : null}
                        
                        {booking.status === 'pending' && (
                          <button
                            onClick={async () => {
                              try {
                                await axios.patch(`${apiBase}/bookings/${booking._id}`, { status: 'confirmed' })
                                window.location.reload() // Quick refresh to see change
                              } catch (e) {
                                alert('Failed to update status')
                              }
                            }}
                            className="mt-4 text-xs bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition-colors"
                          >
                            Approve Booking
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {!loading && bookings.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg mb-4">
                  No bookings yet. Open Destinations and use Book Now to create one.
                </p>
                <button
                  type="button"
                  onClick={() => setCurrentPage('explorer')}
                  className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors"
                >
                  Explore Destinations
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'favorites' && (
          <div>
            <h2 className="text-2xl font-semibold mb-6">Favorite Destinations</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockFavorites.map((favorite) => (
                <div key={favorite.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <img
                    src={favorite.image}
                    alt={favorite.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{favorite.name}</h3>
                    <p className="text-gray-600 mb-4">{favorite.location}</p>
                    <button
                      type="button"
                      onClick={() => setCurrentPage('explorer')}
                      className="w-full bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors font-semibold"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'profile' && (
          <div>
            <h2 className="text-2xl font-semibold mb-6">Profile Settings</h2>
            <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    defaultValue={user?.name || 'Demo Traveler'}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    defaultValue={user?.email || 'demo@example.com'}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>
              <div className="mt-6">
                <button
                  type="button"
                  className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors font-semibold"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard
