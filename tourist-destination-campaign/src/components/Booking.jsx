import { useState } from 'react'
import { motion } from 'framer-motion'
import axios from 'axios'

const currencyRates = { USD: 1, EUR: 0.92, GBP: 0.79, ETB: 55 }
const currencySymbols = { USD: '$', EUR: '€', GBP: '£', ETB: 'Br' }

const paymentMethods = [
  { id: 'telebirr', name: 'Telebirr', icon: '📱', desc: 'Mobile money transfer', account: '+251 935 756 054', holder: 'Sisay Temesgen' },
  { id: 'chapa', name: 'Chapa', icon: '💳', desc: 'Secure online payment', account: 'Redirected after submit', holder: 'Ethiopian Tourist Destination' },
  { id: 'cbebirr', name: 'CBE Birr', icon: '🏦', desc: 'Commercial Bank of Ethiopia', account: 'Merchant: 847560', holder: 'Ethiopian Tourist Dest.' },
  { id: 'bank', name: 'Bank Transfer', icon: '🌍', desc: 'International wire transfer', account: 'CBE: 1000345678912', holder: 'Ethiopian Tourist Dest.' },
]

const Booking = ({ destination, service, selectedDuration, setCurrentPage, currency, apiBase, userId }) => {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({
    name: '', email: '', phone: '', nationality: '',
    travelers: 1, date: '', specialRequests: '',
    paymentMethod: '', paymentProof: '', paymentProofData: '', paymentProofType: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [bookingRef, setBookingRef] = useState('')

  const fmt = (price) => {
    const rate = currencyRates[currency] || 1
    const sym = currencySymbols[currency] || '$'
    return `${sym}${Math.round(price * rate).toLocaleString()}`
  }

  const set = (field, val) => setForm(p => ({ ...p, [field]: val }))

  // Use duration-adjusted price if traveler chose a duration, else fall back to destination base price
  const tourPrice = selectedDuration?.price ?? destination?.price ?? 0
  const chosenDays = selectedDuration?.days ?? null
  const transportPrice = service?.pricePerDay || 0
  const subtotal = (tourPrice + transportPrice) * Number(form.travelers)
  const tax = Math.round(subtotal * 0.05)
  const total = subtotal + tax

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      const { data } = await axios.post(`${apiBase}/bookings`, {
        userId: userId || '507f1f77bcf86cd799439011',
        destinationId: destination._id,
        date: form.date,
        travelers: Number(form.travelers),
        name: form.name,
        email: form.email,
        phone: form.phone,
        nationality: form.nationality,
        specialRequests: form.specialRequests,
        paymentMethod: form.paymentMethod,
        paymentProof: form.paymentProof,
        paymentProofData: form.paymentProofData,
        paymentProofType: form.paymentProofType,
        totalAmount: total,
        destinationPreview: {
          name: destination.name,
          location: destination.location,
          image: destination.image,
          price: tourPrice,
          country: destination.country,
          category: destination.category,
          duration: chosenDays ? `${chosenDays} days (${selectedDuration?.label})` : destination.duration,
        },
        servicePreview: service ? {
          name: service.name,
          icon: service.icon,
          pricePerDay: service.pricePerDay,
          terrainLabel: service.terrainLabel,
          image: service.image,
        } : null,
      })
      setBookingRef(data._id || data.id || 'ETH-' + Date.now())
      setSuccess(true)
    } catch (err) {
      alert(err.response?.data?.message || 'Booking failed. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (!destination) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fcfbf7]">
        <div className="text-center">
          <div className="text-6xl mb-4">🗺️</div>
          <h2 className="text-2xl font-bold text-[#2d3e23] mb-4">No destination selected</h2>
          <button onClick={() => setCurrentPage('explorer')} className="bg-[#2d3e23] text-white px-8 py-3 rounded-2xl font-bold hover:bg-[#3d4a35] transition-all">
            Browse Destinations
          </button>
        </div>
      </div>
    )
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fcfbf7] px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-3xl shadow-2xl p-12 max-w-lg w-full text-center"
        >
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"/>
            </svg>
          </div>
          <h2 className="text-3xl font-black text-[#2d3e23] mb-3">Booking Confirmed!</h2>
          <p className="text-gray-500 mb-6">Your adventure to <strong>{destination.name}</strong> has been booked successfully.</p>
          <div className="bg-[#f8f7f4] rounded-2xl p-4 mb-8">
            <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Booking Reference</p>
            <p className="font-mono font-black text-[#2d3e23] text-lg">{bookingRef}</p>
          </div>
          <p className="text-sm text-gray-400 mb-8">A confirmation will be sent to <strong>{form.email}</strong>. Our team will contact you within 24 hours.</p>
          <div className="flex gap-3">
            <button onClick={() => setCurrentPage('dashboard')} className="flex-1 bg-[#2d3e23] text-white py-3 rounded-2xl font-bold hover:bg-[#3d4a35] transition-all">
              View My Trips
            </button>
            <button onClick={() => setCurrentPage('home')} className="flex-1 border border-gray-200 text-gray-600 py-3 rounded-2xl font-bold hover:bg-gray-50 transition-all">
              Back to Home
            </button>
          </div>
        </motion.div>
      </div>
    )
  }

  const selectedPayment = paymentMethods.find(p => p.id === form.paymentMethod)

  return (
    <div className="min-h-screen bg-[#fcfbf7] pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-10">
          <button onClick={() => setCurrentPage('details')} className="flex items-center gap-2 text-gray-400 hover:text-[#2d3e23] transition-colors mb-4 text-sm font-medium">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/></svg>
            Back to Details
          </button>
          <h1 className="text-4xl font-black text-[#2d3e23]">Complete Your Booking</h1>
          <p className="text-gray-500 mt-2">Secure your journey to <span className="font-bold text-[#2d3e23]">{destination.name}</span></p>
        </div>

        {/* Steps */}
        <div className="flex items-center gap-2 mb-10">
          {['Traveler Info', 'Payment', 'Confirm'].map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-black transition-all ${
                step > i + 1 ? 'bg-green-500 text-white' : step === i + 1 ? 'bg-[#2d3e23] text-white' : 'bg-gray-100 text-gray-400'
              }`}>
                {step > i + 1 ? '✓' : i + 1}
              </div>
              <span className={`text-sm font-bold hidden sm:block ${step === i + 1 ? 'text-[#2d3e23]' : 'text-gray-400'}`}>{s}</span>
              {i < 2 && <div className={`flex-1 h-px w-8 sm:w-16 ${step > i + 1 ? 'bg-green-500' : 'bg-gray-200'}`} />}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit}>

              {/* Step 1: Traveler Info */}
              {step === 1 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
                  <h2 className="text-xl font-black text-[#2d3e23] mb-6">Traveler Information</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {[
                      { label: 'Full Name', field: 'name', type: 'text', placeholder: 'As on passport', required: true },
                      { label: 'Email Address', field: 'email', type: 'email', placeholder: 'your@email.com', required: true },
                      { label: 'Phone / WhatsApp', field: 'phone', type: 'tel', placeholder: '+1 234 567 8900', required: true },
                      { label: 'Nationality', field: 'nationality', type: 'text', placeholder: 'e.g. American', required: false },
                    ].map(f => (
                      <div key={f.field}>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">{f.label}</label>
                        <input
                          type={f.type}
                          required={f.required}
                          placeholder={f.placeholder}
                          value={form[f.field]}
                          onChange={e => set(f.field, e.target.value)}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#d4af37] text-sm transition-all"
                        />
                      </div>
                    ))}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Number of Travelers</label>
                      <select value={form.travelers} onChange={e => set('travelers', e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#d4af37] text-sm">
                        {[1,2,3,4,5,6,7,8,9,10].map(n => <option key={n} value={n}>{n} {n === 1 ? 'Traveler' : 'Travelers'}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Preferred Start Date</label>
                      <input
                        type="date"
                        required
                        value={form.date}
                        min={new Date().toISOString().split('T')[0]}
                        onChange={e => set('date', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#d4af37] text-sm"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Special Requests (Optional)</label>
                      <textarea
                        value={form.specialRequests}
                        onChange={e => set('specialRequests', e.target.value)}
                        rows={3}
                        placeholder="Dietary requirements, accessibility needs, special occasions..."
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#d4af37] text-sm resize-none"
                      />
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      if (!form.name || !form.email || !form.phone || !form.date) {
                        alert('Please fill in all required fields.')
                        return
                      }
                      setStep(2)
                    }}
                    className="mt-8 w-full bg-[#2d3e23] text-white py-4 rounded-2xl font-black hover:bg-[#3d4a35] transition-all shadow-lg"
                  >
                    Continue to Payment →
                  </button>
                </motion.div>
              )}

              {/* Step 2: Payment */}
              {step === 2 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
                  <h2 className="text-xl font-black text-[#2d3e23] mb-6">Select Payment Method</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                    {paymentMethods.map(m => (
                      <div
                        key={m.id}
                        onClick={() => set('paymentMethod', m.id)}
                        className={`cursor-pointer p-5 rounded-2xl border-2 transition-all ${
                          form.paymentMethod === m.id
                            ? 'border-[#2d3e23] bg-[#2d3e23]/5 shadow-md'
                            : 'border-gray-100 hover:border-gray-200'
                        }`}
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-2xl">{m.icon}</span>
                          <div>
                            <p className="font-black text-[#2d3e23]">{m.name}</p>
                            <p className="text-xs text-gray-400">{m.desc}</p>
                          </div>
                          {form.paymentMethod === m.id && (
                            <div className="ml-auto w-5 h-5 bg-[#2d3e23] rounded-full flex items-center justify-center">
                              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/></svg>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Payment Details */}
                  {selectedPayment && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-[#2d3e23] rounded-2xl p-6 mb-6 text-white">
                      <p className="text-xs text-[#d4af37] uppercase tracking-widest font-bold mb-3">Transfer Details</p>
                      <div className="flex justify-between items-center bg-white/10 rounded-xl p-4 mb-3">
                        <div>
                          <p className="text-xs text-white/50 mb-1">{selectedPayment.name} Account</p>
                          <p className="font-mono font-black text-lg">{selectedPayment.account}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-white/50 mb-1">Account Name</p>
                          <p className="font-bold text-sm">{selectedPayment.holder}</p>
                        </div>
                      </div>
                      <div className="bg-white/10 rounded-xl p-4">
                        <p className="text-xs text-white/50 mb-1">Amount to Transfer</p>
                        <p className="font-black text-2xl text-[#d4af37]">{fmt(total)}</p>
                      </div>
                    </motion.div>
                  )}

                  {/* Upload Proof */}
                  {selectedPayment && (
                    <div className="border-2 border-dashed border-gray-200 rounded-2xl p-6 text-center mb-6 hover:border-[#d4af37] transition-all relative">
                      <input
                        type="file"
                        accept="image/*"
                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                        onChange={e => {
                          const file = e.target.files?.[0]
                          if (!file) return
                          set('paymentProof', file.name)
                          // Read as base64 so admin can view the image
                          const reader = new FileReader()
                          reader.onload = (ev) => {
                            set('paymentProofData', ev.target.result)
                            set('paymentProofType', file.type)
                          }
                          reader.readAsDataURL(file)
                        }}
                      />
                      <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                        <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/>
                        </svg>
                      </div>
                      {form.paymentProof
                        ? (
                          <div>
                            <p className="text-green-600 font-bold text-sm mb-2">✅ {form.paymentProof}</p>
                            {form.paymentProofData && (
                              <img src={form.paymentProofData} alt="Payment proof" className="max-h-40 mx-auto rounded-xl border border-gray-200 object-contain" />
                            )}
                          </div>
                        )
                        : <>
                            <p className="font-bold text-gray-700 text-sm mb-1">Upload Payment Screenshot</p>
                            <p className="text-xs text-gray-400">Click to upload proof of transfer (JPG, PNG)</p>
                          </>
                      }
                    </div>
                  )}

                  <div className="flex gap-3">
                    <button type="button" onClick={() => setStep(1)} className="flex-1 border border-gray-200 text-gray-600 py-4 rounded-2xl font-bold hover:bg-gray-50 transition-all">
                      ← Back
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (!form.paymentMethod) { alert('Please select a payment method.'); return }
                        setStep(3)
                      }}
                      className="flex-1 bg-[#2d3e23] text-white py-4 rounded-2xl font-black hover:bg-[#3d4a35] transition-all shadow-lg"
                    >
                      Review Booking →
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Confirm */}
              {step === 3 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
                  <h2 className="text-xl font-black text-[#2d3e23] mb-6">Review & Confirm</h2>

                  <div className="space-y-4 mb-8">
                    {[
                      { label: 'Name', value: form.name },
                      { label: 'Email', value: form.email },
                      { label: 'Phone', value: form.phone },
                      { label: 'Nationality', value: form.nationality || '—' },
                      { label: 'Travelers', value: `${form.travelers} person(s)` },
                      { label: 'Start Date', value: form.date },
                      { label: 'Payment', value: selectedPayment?.name },
                    ].map(row => (
                      <div key={row.label} className="flex justify-between items-center py-3 border-b border-gray-50">
                        <span className="text-sm text-gray-400 font-medium">{row.label}</span>
                        <span className="text-sm font-bold text-[#2d3e23]">{row.value}</span>
                      </div>
                    ))}
                  </div>

                  <div className="bg-[#f8f7f4] rounded-2xl p-5 mb-8">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-500">
                        Tour{chosenDays ? ` (${chosenDays} days)` : ''} × {form.travelers}
                      </span>
                      <span className="font-bold">{fmt(tourPrice * Number(form.travelers))}</span>
                    </div>
                    {service && (
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-500">Transport ({service.name})</span>
                        <span className="font-bold">{fmt(transportPrice * Number(form.travelers))}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm mb-3">
                      <span className="text-gray-500">Service Fee (5%)</span>
                      <span className="font-bold">{fmt(tax)}</span>
                    </div>
                    <div className="flex justify-between pt-3 border-t border-gray-200">
                      <span className="font-black text-[#2d3e23]">Total</span>
                      <span className="font-black text-xl text-[#2d3e23]">{fmt(total)}</span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button type="button" onClick={() => setStep(2)} className="flex-1 border border-gray-200 text-gray-600 py-4 rounded-2xl font-bold hover:bg-gray-50 transition-all">
                      ← Back
                    </button>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="flex-1 bg-[#d4af37] text-[#2d3e23] py-4 rounded-2xl font-black hover:bg-[#f1d38a] transition-all shadow-xl disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {submitting ? 'Processing...' : '✓ Confirm Booking'}
                    </button>
                  </div>
                </motion.div>
              )}
            </form>
          </div>

          {/* Sidebar Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 sticky top-28">
              <img src={destination.image} alt={destination.name} className="w-full h-40 object-cover rounded-2xl mb-5" onError={(e) => { e.target.src = '/destinations/lalibela.jpg' }} />
              <h3 className="font-black text-[#2d3e23] text-lg mb-1">{destination.name}</h3>
              <p className="text-gray-400 text-sm mb-1 flex items-center gap-1">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/></svg>
                {destination.location}
              </p>
              {selectedDuration ? (
                <div className="flex items-center gap-2 mb-5">
                  <span className="text-xs bg-[#2d3e23] text-[#d4af37] font-black px-3 py-1 rounded-full">
                    {selectedDuration.label} · {selectedDuration.days} days
                  </span>
                </div>
              ) : (
                <p className="text-gray-400 text-sm mb-5">{destination.duration}</p>
              )}

              <div className="space-y-2 text-sm border-t border-gray-100 pt-4">
                <div className="flex justify-between">
                  <span className="text-gray-400">
                    Tour{chosenDays ? ` (${chosenDays} days)` : ''} × {form.travelers}
                  </span>
                  <span className="font-bold">{fmt(tourPrice * Number(form.travelers))}</span>
                </div>
                {service && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">Transport</span>
                    <span className="font-bold">{fmt(transportPrice * Number(form.travelers))}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-400">Service Fee</span>
                  <span className="font-bold">{fmt(tax)}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-gray-100">
                  <span className="font-black text-[#2d3e23]">Total</span>
                  <span className="font-black text-[#2d3e23]">{fmt(total)}</span>
                </div>
              </div>

              <div className="mt-6 space-y-2">
                {['Free cancellation 24h before', 'Instant booking confirmation', '24/7 traveler support', 'Secure payment processing'].map(item => (
                  <div key={item} className="flex items-center gap-2 text-xs text-gray-500">
                    <svg className="w-4 h-4 text-green-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"/></svg>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Booking
