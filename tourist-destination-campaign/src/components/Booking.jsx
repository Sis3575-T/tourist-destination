import { useState } from 'react'
import axios from 'axios'

const Booking = ({ destination, service, setCurrentPage, currency, apiBase, userId }) => {
  const [bookingData, setBookingData] = useState({
    travelers: 1,
    date: '',
    specialRequests: '',
    name: '',
    email: '',
    phone: '',
    paymentMethod: 'telebirr'
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (field, value) => {
    setBookingData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!bookingData.paymentMethod) {
      alert('Please select a payment method')
      return
    }

    setIsSubmitting(true)

    const travelersNum = Number(bookingData.travelers)

    try {
      const payload = {
        userId: userId || 'user1',
        destinationId: destination._id,
        date: bookingData.date,
        travelers: travelersNum,
        destinationPreview: {
          name: destination.name,
          location: destination.location,
          image: destination.image,
          price: destination.price,
        },
        specialRequests: bookingData.specialRequests,
        name: bookingData.name,
        email: bookingData.email,
        phone: bookingData.phone,
        paymentProof: bookingData.paymentProof,
      }

      const { data } = await axios.post(`${apiBase}/bookings`, payload)

      // Simulate specific payment method processing
      const paymentMessages = {
        telebirr: 'Please check your phone for the Telebirr push notification.',
        chapa: 'Redirecting to Chapa secure payment gateway...',
        cbebirr: 'Dial *847# to complete your CBE Birr payment.',
        card: 'Processing secure card transaction...'
      }

      alert(
        `Booking Initiated for ${destination.name}!\n\n${paymentMessages[bookingData.paymentMethod]}\n\nReference: ${data._id || data.id || 'OK'}`
      )
      setCurrentPage('dashboard')
    } catch (err) {
      console.error(err)
      const errorMsg = err.response?.data?.message || err.message || 'Booking failed';
      const detailMsg = err.response?.data?.error || '';
      alert(`${errorMsg}\n${detailMsg}`);
    } finally {
      setIsSubmitting(false)
    }
  }

  const currencyRates = { USD: 1, EUR: 0.92, GBP: 0.79, ETB: 55 }
  const currencySymbols = { USD: '$', EUR: '€', GBP: '£', ETB: 'Br' }
  const formatPrice = (price) => {
    const rate = currencyRates[currency] || 1
    const symbol = currencySymbols[currency] || '$'
    return `${symbol}${Math.round(price * rate).toLocaleString()}`
  }

  const travelersNum = Number(bookingData.travelers)
  const servicePrice = service?.pricePerDay || 0
  const totalPrice = (destination.price + servicePrice) * travelersNum

  if (!destination) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">No Destination Selected</h1>
          <button
            onClick={() => setCurrentPage('explorer')}
            className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors"
          >
            Browse Destinations
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Book Your Adventure</h1>
          <p className="text-lg text-gray-600">Complete your booking for {destination.name}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Booking Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-6">Traveler Information</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    required
                    value={bookingData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    required
                    value={bookingData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <input
                    type="tel"
                    required
                    value={bookingData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Enter your phone number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Number of Travelers</label>
                  <select
                    value={bookingData.travelers}
                    onChange={(e) => handleInputChange('travelers', Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value={1}>1 Traveler</option>
                    <option value={2}>2 Travelers</option>
                    <option value={3}>3 Travelers</option>
                    <option value={4}>4 Travelers</option>
                    <option value={5}>5+ Travelers</option>
                  </select>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Start Date</label>
                <input
                  type="date"
                  required
                  value={bookingData.date}
                  onChange={(e) => handleInputChange('date', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-6">Payment Method</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  {[
                    { id: 'telebirr', name: 'Telebirr', icon: '📱' },
                    { id: 'chapa', name: 'Chapa', icon: '💳' },
                    { id: 'cbebirr', name: 'CBE Birr', icon: '🏦' },
                    { id: 'card', name: 'Bank Transfer (CBE)', icon: '🌍' }
                  ].map((method) => (
                    <div
                      key={method.id}
                      onClick={() => handleInputChange('paymentMethod', method.id)}
                      className={`cursor-pointer p-4 border-2 rounded-xl transition-all flex items-center gap-4 ${
                        bookingData.paymentMethod === method.id
                          ? 'border-green-600 bg-green-50 shadow-sm'
                          : 'border-gray-100 hover:border-gray-200 bg-white'
                      }`}
                    >
                      <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center text-2xl shadow-sm border border-gray-100">
                        {method.icon}
                      </div>
                      <div>
                        <p className="font-bold text-slate-800">{method.name}</p>
                        <p className="text-xs text-slate-500">Instant Payment</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Account Details Display */}
                {bookingData.paymentMethod && (
                  <div className="space-y-6 animate-in fade-in slide-in-from-top-4 duration-300">
                    <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-xl border-l-4 border-green-500">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <h3 className="text-lg font-bold">Company Account Details</h3>
                      </div>
                      
                      <div className="space-y-4">
                        {bookingData.paymentMethod === 'telebirr' && (
                          <div className="flex justify-between items-center bg-white/10 p-3 rounded-xl">
                            <div>
                              <p className="text-xs text-green-400 uppercase font-bold tracking-wider">Telebirr Number</p>
                              <p className="text-xl font-mono">+251 935 756 054</p>
                            </div>
                            <p className="text-sm font-bold opacity-80">Account: Sisay Temesgen</p>
                          </div>
                        )}
                        {bookingData.paymentMethod === 'cbebirr' && (
                          <div className="flex justify-between items-center bg-white/10 p-3 rounded-xl">
                            <div>
                              <p className="text-xs text-green-400 uppercase font-bold tracking-wider">CBE Birr Merchant Code</p>
                              <p className="text-xl font-mono">847560</p>
                            </div>
                            <p className="text-sm font-bold opacity-80">Ethiopian Tourist Dest.</p>
                          </div>
                        )}
                        {bookingData.paymentMethod === 'card' && (
                          <div className="flex justify-between items-center bg-white/10 p-3 rounded-xl">
                            <div>
                              <p className="text-xs text-green-400 uppercase font-bold tracking-wider">CBE Account Number</p>
                              <p className="text-xl font-mono">1000345678912</p>
                            </div>
                            <p className="text-sm font-bold opacity-80">Ethiopian Tourist Dest.</p>
                          </div>
                        )}
                        {bookingData.paymentMethod === 'chapa' && (
                          <div className="bg-white/10 p-3 rounded-xl">
                            <p className="text-xs text-green-400 uppercase font-bold tracking-wider mb-1">Chapa Payment Link</p>
                            <p className="text-sm">Redirecting to secure portal after clicking "Complete Booking"</p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Upload Section */}
                    <div className="bg-green-50 border-2 border-dashed border-green-200 p-8 rounded-2xl text-center">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                        </svg>
                      </div>
                      <h4 className="text-lg font-bold text-slate-800 mb-1">Upload Payment Screenshot</h4>
                      <p className="text-sm text-slate-500 mb-6">Please upload the confirmation screenshot of your transfer</p>
                      
                      <div className="relative">
                        <input 
                          type="file" 
                          accept="image/*"
                          required
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          onChange={(e) => {
                            if (e.target.files?.[0]) {
                              handleInputChange('paymentProof', e.target.files[0].name)
                              alert(`File selected: ${e.target.files[0].name}`)
                            }
                          }}
                        />
                        <div className="bg-white px-6 py-3 border border-gray-200 rounded-xl font-bold text-slate-700 shadow-sm inline-block">
                          {bookingData.paymentProof ? `✅ ${bookingData.paymentProof}` : 'Choose Screenshot Image'}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Special Requests</label>
                <textarea
                  value={bookingData.specialRequests}
                  onChange={(e) => handleInputChange('specialRequests', e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Any special requirements or requests..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Processing...' : 'Complete Booking'}
              </button>
            </form>
          </div>

          {/* Booking Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
              <h2 className="text-xl font-semibold mb-6">Booking Summary</h2>

              <div className="mb-6">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-32 object-cover rounded-md mb-4"
                />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{destination.name}</h3>
                <p className="text-gray-600 text-sm mb-2">{destination.location}</p>
                <p className="text-gray-500 text-sm">{destination.duration}</p>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Base Price (Tour)</span>
                  <span className="font-semibold">{formatPrice(destination.price)}</span>
                </div>
                {service && (
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Transport ({service.name})</span>
                    <span className="font-semibold">+{formatPrice(service.pricePerDay)}</span>
                  </div>
                )}
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Travelers</span>
                  <span className="font-semibold">{bookingData.travelers}</span>
                </div>
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold">Grand Total</span>
                    <span className="text-lg font-bold text-green-600">{formatPrice(totalPrice)}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 text-sm text-gray-500">
                <p>• Free cancellation up to 24 hours</p>
                <p>• Instant confirmation</p>
                <p>• 24/7 support</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Booking